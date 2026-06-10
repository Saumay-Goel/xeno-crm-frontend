"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6">
      <div className="space-y-3 max-w-xl">
        <h1 className="text-4xl font-semibold tracking-tight">
          Reach your shoppers, intelligently.
        </h1>
        <p className="text-muted-foreground">
          Xeno CRM is an AI-native engagement tool. Describe who to reach in
          plain English — the AI builds the audience, drafts the message, and
          tracks every campaign end to end.
        </p>
      </div>
      <div className="flex gap-3">
        <Link href="/login">
          <Button size="lg">Get started</Button>
        </Link>
        <Link href="/dashboard">
          <Button size="lg" variant="outline">
            Open dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
