"use client";

import { useState } from "react";
import type { CampaignProposal, AudiencePreview, Channel, Rule } from "@/types";
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
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="bg-blue-600 px-5 py-4 text-white">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
            <Sparkles className="h-3 w-3" /> AI proposal
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
            <Users className="h-4 w-4" /> {audience.count} customers
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold">{proposal.segmentName}</h3>
      </div>

      <div className="p-5 space-y-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
            Audience rule
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5 font-mono text-xs text-slate-600 leading-relaxed">
            {describeRule(proposal.rules)}
          </div>
          {audience.preview.length > 0 && (
            <p className="mt-2 text-xs text-slate-400">
              e.g.{" "}
              {audience.preview
                .slice(0, 3)
                .map((c) => c.name)
                .join(", ")}
              {audience.count > 3 && ` and ${audience.count - 3} more`}
            </p>
          )}
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
            Message
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <p className="mt-1.5 text-xs text-slate-400">
            {"{{name}}"} and {"{{city}}"} are replaced per customer.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
            Channel
          </div>
          <div className="flex gap-2">
            {CHANNELS.map((c) => (
              <button
                key={c}
                onClick={() => setChannel(c)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition ${
                  channel === c
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-3 space-y-2">
          <div className="flex gap-2 text-xs text-slate-600">
            <Sparkles className="h-3.5 w-3.5 mt-0.5 shrink-0 text-blue-600" />
            <span className="leading-relaxed">{proposal.reasoning}</span>
          </div>
          {proposal.assumptions.length > 0 && (
            <ul className="list-disc list-inside text-xs text-slate-500 space-y-0.5 pl-1">
              {proposal.assumptions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          )}
        </div>

        <button
          disabled={launching || audience.count === 0}
          onClick={() => onLaunch(message, channel)}
          className="w-full h-11 rounded-xl bg-blue-600 text-sm font-semibold text-white inline-flex items-center justify-center gap-2 transition hover:bg-blue-700 disabled:opacity-50 shadow-sm shadow-blue-600/20"
        >
          <Send className="h-4 w-4" />
          {launching ? "Launching…" : `Launch to ${audience.count} customers`}
        </button>
      </div>
    </div>
  );
}
