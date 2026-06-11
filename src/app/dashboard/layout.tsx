"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { api } from "@/lib/api";

interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    api
      .get<AuthUser>("/auth/me")
      .then(setUser)
      .catch(() => {});
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
