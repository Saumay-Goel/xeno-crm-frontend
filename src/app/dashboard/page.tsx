"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Database, Rows3, Send, Mail, TrendingUp } from "lucide-react";
import { TruckLoader } from "@/components/ui/truck-loader";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";

interface DashboardStats {
  datasets: number;
  totalRows: number;
  campaigns: number;
  messaging: {
    sent: number;
    delivered: number;
    opened: number;
    converted: number;
    deliveryRate: number;
    openRate: number;
  };
  recentCampaigns: {
    id: string;
    name: string;
    channel: string;
    datasetName: string;
    audience: number;
    createdAt: string;
  }[];
}

const CHANNEL_COLORS: Record<string, string> = {
  whatsapp: "#22c55e",
  email: "#3b82f6",
  sms: "#a855f7",
  rcs: "#f59e0b",
};

export default function OverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<DashboardStats>("/insights/dashboard")
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center p-4 sm:p-0 text-slate-400">
        <TruckLoader />
      </div>
    );
  }

  const m = stats.messaging;
  const funnelData = [
    { stage: "Sent", value: m.sent },
    { stage: "Delivered", value: m.delivered },
    { stage: "Opened", value: m.opened },
    { stage: "Converted", value: m.converted },
  ];

  const channelMap = stats.recentCampaigns.reduce<Record<string, number>>(
    (acc, c) => {
      acc[c.channel] = (acc[c.channel] ?? 0) + c.audience;
      return acc;
    },
    {},
  );
  const channelData = Object.entries(channelMap).map(([name, value]) => ({
    name,
    value,
  }));

  const cards = [
    {
      label: "Datasets",
      value: stats.datasets.toLocaleString("en-IN"),
      icon: Database,
    },
    {
      label: "Total rows",
      value: stats.totalRows.toLocaleString("en-IN"),
      icon: Rows3,
    },
    {
      label: "Campaigns",
      value: stats.campaigns,
      icon: Send,
    },
    {
      label: "Messages sent",
      value: m.sent,
      icon: Mail,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8 overflow-hidden min-w-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Your engagement at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                {label}
              </span>
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900">
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <h2 className="font-semibold text-slate-900">Engagement funnel</h2>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            Across all your campaigns
          </p>
          <div className="h-[240px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={funnelData}
                margin={{ top: 8, right: 8, left: -24, bottom: 0 }}
              >
                <XAxis
                  dataKey="stage"
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  stroke="#94a3b8"
                  dy={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  stroke="#94a3b8"
                  tickFormatter={(val) =>
                    val >= 1000 ? `${val / 1000}k` : val
                  }
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 13,
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {funnelData.map((_, i) => (
                    <Cell key={i} fill={`rgba(37, 99, 235, ${1 - i * 0.18})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm min-w-0">
          <h2 className="font-semibold text-slate-900 mb-1">By channel</h2>
          <p className="text-sm text-slate-500 mb-6">Recent audience split</p>
          {channelData.length ? (
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {channelData.map((d, i) => (
                      <Cell
                        key={i}
                        fill={CHANNEL_COLORS[d.name] ?? "#3b82f6"}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      fontSize: 13,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-sm text-slate-400">
              No campaigns yet
            </div>
          )}
          <div className="mt-6 space-y-2">
            {channelData.map((d) => (
              <div
                key={d.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2.5 text-slate-600 capitalize">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: CHANNEL_COLORS[d.name] ?? "#3b82f6" }}
                  />
                  {d.name}
                </span>
                <span className="font-medium text-slate-900">
                  {d.value.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-sm font-medium text-slate-500">
            Delivery rate
          </span>
          <div className="mt-3 flex items-end gap-4">
            <span className="text-2xl font-bold text-slate-900">
              {m.deliveryRate}%
            </span>
            <div className="flex-1 mb-1.5 h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${m.deliveryRate}%` }}
              />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-sm font-medium text-slate-500">Open rate</span>
          <div className="mt-3 flex items-end gap-4">
            <span className="text-2xl font-bold text-slate-900">
              {m.openRate}%
            </span>
            <div className="flex-1 mb-1.5 h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${m.openRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900">Recent campaigns</h2>
          <Link
            href="/dashboard/campaigns"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {stats.recentCampaigns.map((c) => (
            <Link
              key={c.id}
              href={`/dashboard/campaigns/${c.id}`}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 rounded-xl border border-slate-200 bg-white px-5 py-4 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div>
                <div className="font-medium text-slate-900">{c.name}</div>
                <div className="text-sm text-slate-500 mt-0.5">
                  {c.datasetName}
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 capitalize">
                  {c.channel}
                </span>
                <span className="text-sm font-medium text-slate-500">
                  {c.audience.toLocaleString("en-IN")} sent
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
