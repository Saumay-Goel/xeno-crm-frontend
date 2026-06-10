"use client";

import { useState } from "react";
import type { CampaignProposal, AudiencePreview, Channel, Rule } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, Sparkles, Send } from "lucide-react";

const FIELD_LABELS: Record<string, string> = {
  total_spend: "total spend",
  order_count: "order count",
  days_since_last_order: "days since last order",
  city: "city",
  signup_source: "signup source",
};
const OP_LABELS: Record<string, string> = {
  eq: "=",
  neq: "≠",
  gt: ">",
  gte: "≥",
  lt: "<",
  lte: "≤",
  in: "in",
};
function describeRule(rule: Rule): string {
  if ("combinator" in rule) {
    const j = ` ${rule.combinator.toUpperCase()} `;
    return rule.rules
      .map((r) =>
        "combinator" in r ? `(${describeRule(r)})` : describeRule(r),
      )
      .join(j);
  }
  const f = FIELD_LABELS[rule.field] ?? rule.field;
  const o = OP_LABELS[rule.op] ?? rule.op;
  const v = Array.isArray(rule.value) ? rule.value.join(", ") : rule.value;
  return `${f} ${o} ${v}`;
}

const CHANNELS: Channel[] = ["whatsapp", "sms", "email", "rcs"];

interface Props {
  proposal: CampaignProposal;
  audience: AudiencePreview;
  onLaunch: (finalMessage: string, finalChannel: Channel) => void;
  launching: boolean;
}

export function ProposalCard({
  proposal,
  audience,
  onLaunch,
  launching,
}: Props) {
  const [message, setMessage] = useState(proposal.message);
  const [channel, setChannel] = useState<Channel>(proposal.channel);

  return (
    <Card className="p-5 space-y-4 border-primary/30">
      {/* Audience */}
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-primary" />
        <span className="font-medium">{proposal.segmentName}</span>
        <Badge variant="secondary" className="ml-auto">
          {audience.count} customers
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground font-mono">
        {describeRule(proposal.rules)}
      </p>

      {/* Audience preview */}
      {audience.preview.length > 0 && (
        <div className="text-xs text-muted-foreground">
          e.g.{" "}
          {audience.preview
            .slice(0, 3)
            .map((c) => c.name)
            .join(", ")}
          {audience.count > 3 && ` and ${audience.count - 3} more`}
        </div>
      )}

      {/* Editable message */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Message</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          {"{{name}}"} and {"{{city}}"} are replaced per customer.
        </p>
      </div>

      {/* Channel */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Channel</label>
        <div className="flex gap-2">
          {CHANNELS.map((c) => (
            <Button
              key={c}
              type="button"
              size="sm"
              variant={channel === c ? "default" : "outline"}
              onClick={() => setChannel(c)}
              className="capitalize"
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      {/* AI reasoning + assumptions */}
      <div className="rounded-md bg-muted/50 p-3 space-y-2 text-xs">
        <div className="flex gap-1.5 text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary" />
          <span>{proposal.reasoning}</span>
        </div>
        {proposal.assumptions.length > 0 && (
          <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
            {proposal.assumptions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        )}
      </div>

      <Button
        className="w-full"
        disabled={launching || audience.count === 0}
        onClick={() => onLaunch(message, channel)}
      >
        <Send className="h-4 w-4 mr-2" />
        {launching ? "Launching…" : `Launch to ${audience.count} customers`}
      </Button>
    </Card>
  );
}
