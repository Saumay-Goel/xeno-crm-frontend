"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type {
  ChatMessage,
  ProposeResponse,
  CampaignProposal,
  AudiencePreview,
  Channel,
} from "@/types";
import { ChatPanel } from "@/components/compose/chat-panel";
import { ProposalCard } from "@/components/compose/proposal-card";
import { Card } from "@/components/ui/card";

export default function ComposePage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<CampaignProposal | null>(null);
  const [audience, setAudience] = useState<AudiencePreview | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [launching, setLaunching] = useState(false);

  async function sendTurn(content: string) {
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content },
    ];
    setMessages(nextMessages);
    setInput("");
    setOptions([]);
    setLoading(true);

    try {
      const res = await api.post<ProposeResponse>("/ai/propose", {
        messages: nextMessages,
      });

      if (res.kind === "clarification") {
        setMessages([
          ...nextMessages,
          { role: "assistant", content: res.question },
        ]);
        setOptions(res.options);
        setProposal(null);
        setAudience(null);
      } else {
        const summary = `Proposed “${res.proposal.segmentName}” — ${res.audience.count} customers, via ${res.proposal.channel}.`;
        setMessages([...nextMessages, { role: "assistant", content: summary }]);
        setProposal(res.proposal);
        setAudience(res.audience);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
      setMessages(nextMessages); // keep user msg, drop the failed turn
    } finally {
      setLoading(false);
    }
  }

  function handleSend() {
    if (!input.trim()) return;
    sendTurn(input.trim());
  }

  async function handleLaunch(finalMessage: string, finalChannel: Channel) {
    if (!proposal || !audience) return;
    setLaunching(true);
    try {
      const res = await api.post<{ campaignId: string; audienceSize: number }>(
        "/campaigns/launch",
        {
          name: proposal.segmentName,
          channel: finalChannel,
          messageTemplate: finalMessage,
          inlineSegment: { name: proposal.segmentName, rules: proposal.rules },
        },
      );
      toast.success(`Launched to ${res.audienceSize} customers`);
      router.push(`/dashboard/campaigns/${res.campaignId}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Launch failed");
    } finally {
      setLaunching(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Compose</h1>
        <p className="text-muted-foreground text-sm">
          Describe who to reach and what to say. The AI proposes; you review and
          launch.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-220px)]">
        <Card className="p-4 flex flex-col">
          <ChatPanel
            messages={messages}
            input={input}
            setInput={setInput}
            onSend={handleSend}
            loading={loading}
            clarificationOptions={options}
            onPickOption={(opt) => sendTurn(opt)}
          />
        </Card>

        <div className="overflow-y-auto">
          {proposal && audience ? (
            <ProposalCard
              key={proposal.segmentName + proposal.message + proposal.channel}
              proposal={proposal}
              audience={audience}
              onLaunch={handleLaunch}
              launching={launching}
            />
          ) : (
            <Card className="p-8 text-center text-muted-foreground h-full flex items-center justify-center">
              Your campaign proposal will appear here once the AI has enough to
              go on.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
