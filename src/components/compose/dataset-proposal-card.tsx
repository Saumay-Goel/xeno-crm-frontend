"use client";

import { useState } from "react";
import type {
  DatasetProposal,
  DatasetAudience,
  ContactCandidate,
  Channel,
} from "@/types";
import { Send, Users, Loader2, ChevronDown } from "lucide-react";

interface Props {
  proposal: DatasetProposal;
  audience: DatasetAudience;
  contactCandidates: ContactCandidate[];
  datasetId: string;
  onLaunch: (payload: {
    datasetId: string;
    name: string;
    channel: Channel;
    contactColumn: string;
    messageTemplate: string;
    audienceSql: string;
  }) => Promise<void>;
  launching: boolean;
}

const channelForContact = (kind: "email" | "phone"): Channel =>
  kind === "email" ? "email" : "whatsapp";

export function DatasetProposalCard({
  proposal,
  audience,
  contactCandidates,
  datasetId,
  onLaunch,
  launching,
}: Props) {
  const [contactColumn, setContactColumn] = useState(proposal.contactColumn);
  const [channel, setChannel] = useState<Channel>(proposal.channel);
  const [message, setMessage] = useState(proposal.message);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const currentContact = contactCandidates.find((c) => c.key === contactColumn);

  // when contact changes, auto-set channel (but user can override after)
  function handleContactChange(key: string) {
    setContactColumn(key);
    const c = contactCandidates.find((x) => x.key === key);
    if (c) setChannel(channelForContact(c.kind));
  }

  // channels valid for the current contact type
  const validChannels: Channel[] =
    currentContact?.kind === "email" ? ["email"] : ["whatsapp", "sms", "rcs"];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="h-1 bg-blue-600" />
      <div className="p-5 space-y-5">
        {/* audience */}
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium uppercase tracking-wide">
            <Users className="h-3.5 w-3.5" /> Audience
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {audience.count}
            </span>
            <span className="text-sm text-slate-500">
              {audience.count === 1 ? "recipient" : "recipients"} ·{" "}
              {proposal.segmentName}
            </span>
          </div>
          {audience.sample.length > 0 && (
            <div className="mt-2 text-xs text-slate-400">
              e.g.{" "}
              {audience.sample
                .slice(0, 3)
                .map((r) =>
                  String(r[contactColumn] ?? Object.values(r)[0] ?? ""),
                )
                .join(", ")}
              {audience.count > 3 && "…"}
            </div>
          )}
        </div>

        {/* contact column */}
        <div>
          <label className="text-slate-500 text-xs font-medium uppercase tracking-wide">
            Send to
          </label>
          <div className="mt-1.5 relative">
            <select
              value={contactColumn}
              onChange={(e) => handleContactChange(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 pr-9 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            >
              {contactCandidates.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.name} ({c.kind})
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* channel */}
        <div>
          <label className="text-slate-500 text-xs font-medium uppercase tracking-wide">
            Channel
          </label>
          <div className="mt-1.5 flex gap-2">
            {validChannels.map((ch) => (
              <button
                key={ch}
                onClick={() => setChannel(ch)}
                className={`rounded-xl border px-3.5 py-2 text-xs font-medium capitalize transition-colors ${
                  channel === ch
                    ? "border-blue-300 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        {/* message */}
        <div>
          <label className="text-slate-500 text-xs font-medium uppercase tracking-wide">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 leading-relaxed focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
          />
          <p className="mt-1 text-[11px] text-slate-400">
            {"{{column}}"} tokens are filled per recipient (e.g.{" "}
            {"{{first_name}}"}).
          </p>
        </div>

        {/* assumptions */}
        {proposal.assumptions.length > 0 && (
          <div className="rounded-xl bg-slate-50 border border-slate-100">
            <button
              onClick={() => setShowAssumptions((s) => !s)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-500"
            >
              <span>AI assumptions ({proposal.assumptions.length})</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${showAssumptions ? "rotate-180" : ""}`}
              />
            </button>
            {showAssumptions && (
              <ul className="px-3 pb-3 space-y-1">
                {proposal.assumptions.map((a, i) => (
                  <li
                    key={i}
                    className="text-[11px] text-slate-500 flex gap-1.5"
                  >
                    <span className="text-slate-300">•</span> {a}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* launch */}
        <button
          onClick={() =>
            onLaunch({
              datasetId,
              name: proposal.segmentName,
              channel,
              contactColumn,
              messageTemplate: message,
              audienceSql: proposal.audienceSql,
            })
          }
          disabled={launching || audience.count === 0}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-3 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
        >
          {launching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {launching
            ? "Launching…"
            : `Launch to ${audience.count} ${audience.count === 1 ? "recipient" : "recipients"}`}
        </button>
      </div>
    </div>
  );
}
