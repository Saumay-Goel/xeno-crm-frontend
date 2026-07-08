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
      } else if (res.kind === "query") {
        setMessages([
          ...nextMessages,
          {
            role: "assistant",
            content: `${res.intent} — ${res.rowCount} result${res.rowCount === 1 ? "" : "s"}`,
            queryResult: { rows: res.rows, rowCount: res.rowCount },
          },
        ]);
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
      setMessages(nextMessages);
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
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Compose
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Describe who to reach and what to say, or ask to see customers. The AI
          proposes; you review and launch.
        </p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:h-[calc(100vh-220px)] min-h-0">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col h-[500px] lg:h-full shadow-sm min-h-0">
          <ChatPanel
            messages={messages}
            input={input}
            setInput={setInput}
            onSend={handleSend}
            loading={loading}
            clarificationOptions={options}
            onPickOption={(opt) => sendTurn(opt)}
          />
        </div>

        <div className="flex-1 lg:overflow-y-auto min-h-0">
          {proposal && audience ? (
            <div className="h-full pb-6 lg:pb-0">
              <ProposalCard
                key={proposal.segmentName + proposal.message + proposal.channel}
                proposal={proposal}
                audience={audience}
                onLaunch={handleLaunch}
                launching={launching}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center text-slate-500 text-sm h-full min-h-[250px] lg:min-h-0 flex items-center justify-center shadow-sm">
              <span className="max-w-xs">
                Your campaign proposal will appear here once the AI has enough
                to go on.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
