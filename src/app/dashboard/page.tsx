"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, IndianRupee, Send, MailOpen } from "lucide-react";

interface DashboardStats {
  customers: number;
  totalRevenue: number;
  campaigns: number;
  messaging: {
    sent: number;
    delivered: number;
    opened: number;
    converted: number;
    deliveryRate: number;
    openRate: number;
  };
  recentCampaigns: Array<{
    id: string;
    name: string;
    channel: string;
    segmentName: string;
    audience: number;
    createdAt: string;
  }>;
}

export default function OverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<DashboardStats>("/insights/dashboard")
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton className="h-96 w-full" />;
  if (!stats)
    return <p className="text-muted-foreground">Could not load stats.</p>;

  const cards = [
    {
      label: "Customers",
      value: stats.customers.toLocaleString("en-IN"),
      icon: Users,
    },
    {
      label: "Total revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
    { label: "Campaigns", value: stats.campaigns, icon: Send },
    {
      label: "Messages sent",
      value: stats.messaging.sent.toLocaleString("en-IN"),
      icon: MailOpen,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-muted-foreground text-sm">
          Your engagement at a glance.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{label}</span>
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-semibold mt-2">{value}</div>
          </Card>
        ))}
      </div>

      {/* Engagement rates */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-xs text-muted-foreground">Delivery rate</div>
          <div className="text-2xl font-semibold mt-1">
            {stats.messaging.deliveryRate}%
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-xs text-muted-foreground">Open rate</div>
          <div className="text-2xl font-semibold mt-1">
            {stats.messaging.openRate}%
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-xs text-muted-foreground">Conversions</div>
          <div className="text-2xl font-semibold mt-1">
            {stats.messaging.converted}
          </div>
        </Card>
      </div>

      {/* Recent campaigns */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Recent campaigns</h2>
          <Link
            href="/campaigns"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        {stats.recentCampaigns.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground text-sm">
            No campaigns yet.{" "}
            <Link href="/compose" className="text-primary hover:underline">
              Build one
            </Link>
            .
          </Card>
        ) : (
          <div className="space-y-2">
            {stats.recentCampaigns.map((c) => (
              <Link key={c.id} href={`/campaigns/${c.id}`}>
                <Card className="p-4 flex items-center justify-between hover:border-primary/40 transition-colors">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {c.segmentName}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="capitalize">
                      {c.channel}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {c.audience} sent
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
