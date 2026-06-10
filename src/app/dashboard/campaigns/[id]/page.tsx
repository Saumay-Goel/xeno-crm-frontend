"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface FunnelData {
  campaign: {
    id: string;
    name: string;
    channel: string;
    status: string;
    segmentName: string;
    createdAt: string;
  };
  funnel: {
    total: number;
    sent: number;
    delivered: number;
    opened: number;
    read: number;
    clicked: number;
    converted: number;
    failed: number;
  };
  pending: number;
}

const STAGES: Array<{ key: keyof FunnelData["funnel"]; label: string }> = [
  { key: "sent", label: "Sent" },
  { key: "delivered", label: "Delivered" },
  { key: "opened", label: "Opened" },
  { key: "read", label: "Read" },
  { key: "clicked", label: "Clicked" },
  { key: "converted", label: "Converted" },
];

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await api.get<FunnelData>(`/insights/campaigns/${id}/funnel`);
      setData(res);
      return res;
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
    // Poll while messages are still in flight.
    const interval = setInterval(async () => {
      const res = await load();
      if (res && res.pending === 0) clearInterval(interval);
    }, 2000);
    return () => clearInterval(interval);
  }, [load]);

  if (loading) return <Skeleton className="h-96 w-full" />;
  if (!data)
    return <p className="text-muted-foreground">Campaign not found.</p>;

  const { campaign, funnel, pending } = data;
  const convRate =
    funnel.sent > 0 ? ((funnel.converted / funnel.sent) * 100).toFixed(1) : "0";
  const maxBar = funnel.sent || funnel.total || 1;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{campaign.name}</h1>
          <p className="text-muted-foreground text-sm">
            {campaign.segmentName} ·{" "}
            <span className="capitalize">{campaign.channel}</span>
          </p>
        </div>
        {pending > 0 && (
          <Badge variant="secondary">Sending… {pending} pending</Badge>
        )}
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-semibold">{funnel.total}</div>
          <div className="text-xs text-muted-foreground">Audience</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-semibold">{funnel.delivered}</div>
          <div className="text-xs text-muted-foreground">Delivered</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-semibold">{funnel.converted}</div>
          <div className="text-xs text-muted-foreground">Converted</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-semibold">{convRate}%</div>
          <div className="text-xs text-muted-foreground">Conversion rate</div>
        </Card>
      </div>

      {/* Funnel bars */}
      <Card className="p-6 space-y-3">
        <h2 className="font-medium mb-2">Funnel</h2>
        {STAGES.map((stage) => {
          const val = funnel[stage.key];
          const pct = Math.round((val / maxBar) * 100);
          return (
            <div key={stage.key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{stage.label}</span>
                <span className="text-muted-foreground">{val}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
        {funnel.failed > 0 && (
          <div className="pt-2 text-sm text-muted-foreground">
            {funnel.failed} failed to deliver
          </div>
        )}
      </Card>
    </div>
  );
}
