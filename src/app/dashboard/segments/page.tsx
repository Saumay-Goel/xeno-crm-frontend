"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Rule } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Segment {
  id: string;
  name: string;
  rules: Rule;
  createdAt: string;
}

// Render a rule tree as readable text, e.g. "total spend > 5000 AND days since last order > 60"
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
    const joiner = ` ${rule.combinator.toUpperCase()} `;
    return rule.rules
      .map((r) =>
        "combinator" in r ? `(${describeRule(r)})` : describeRule(r),
      )
      .join(joiner);
  }
  const field = FIELD_LABELS[rule.field] ?? rule.field;
  const op = OP_LABELS[rule.op] ?? rule.op;
  const val = Array.isArray(rule.value) ? rule.value.join(", ") : rule.value;
  return `${field} ${op} ${val}`;
}

export default function SegmentsPage() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Segment[]>("/segments")
      .then(setSegments)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Segments</h1>
        <p className="text-muted-foreground text-sm">
          Saved audiences. Create new ones in <strong>Compose</strong>.
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : segments.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No segments yet. Head to Compose and describe an audience — the AI
          will create one.
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {segments.map((s) => (
            <Card key={s.id} className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium">{s.name}</h3>
                <Badge variant="secondary">
                  {new Date(s.createdAt).toLocaleDateString("en-IN")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                {describeRule(s.rules)}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
