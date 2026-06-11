"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Filter, Users } from "lucide-react";
import type { Rule } from "@/types";

interface Segment {
  id: string;
  name: string;
  rules: Rule;
  createdAt: string;
  matchCount?: number;
}

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

export default function SegmentsPage() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Segment[]>("/segments")
      .then(setSegments)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Segments
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Saved audiences. Create new ones in Compose.
        </p>
      </div>

      {loading ? (
        <div className="text-slate-400">Loading…</div>
      ) : segments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
            <Filter className="h-6 w-6 text-blue-600" />
          </div>
          <p className="font-medium text-slate-700">No segments yet</p>
          <p className="text-sm text-slate-400 mt-1">
            Describe an audience in Compose and launch a campaign to save one.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {segments.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-md hover:shadow-slate-200/60 transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 px-5 pt-5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Filter className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 truncate">
                    {s.name}
                  </h3>
                </div>
                <span className="shrink-0 text-xs text-slate-400">
                  {new Date(s.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="px-5 pb-5 pt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                  Rule
                </div>
                <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5 font-mono text-xs text-slate-600 leading-relaxed">
                  {describeRule(s.rules)}
                </div>
                {typeof s.matchCount === "number" && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    <Users className="h-3 w-3" /> {s.matchCount} customers match
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
