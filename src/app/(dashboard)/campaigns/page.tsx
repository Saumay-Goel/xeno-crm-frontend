"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

interface Campaign {
  id: string;
  name: string;
  channel: string;
  status: string;
  createdAt: string;
  segment: { name: string };
  _count: { communications: number };
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Campaign[]>("/campaigns")
      .then(setCampaigns)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Campaigns</h1>
        <p className="text-muted-foreground text-sm">
          {campaigns.length} campaigns run
        </p>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : campaigns.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No campaigns yet. Build one in Compose.
        </Card>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead className="text-right">Audience</TableHead>
                <TableHead>Sent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c) => (
                <TableRow key={c.id} className="cursor-pointer">
                  <TableCell className="font-medium">
                    <Link
                      href={`/campaigns/${c.id}`}
                      className="hover:underline"
                    >
                      {c.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {c.segment.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {c.channel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {c._count.communications}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(c.createdAt).toLocaleDateString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
