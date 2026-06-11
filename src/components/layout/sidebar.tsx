"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquarePlus,
  Users,
  Filter,
  Send,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/landing/logo";

interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/compose", label: "Compose", icon: MessageSquarePlus },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/segments", label: "Segments", icon: Filter },
  { href: "/dashboard/campaigns", label: "Campaigns", icon: Send },
];

export function Sidebar({ user }: { user: AuthUser | null }) {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  const initials = (user?.name ?? user?.email ?? "?")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-slate-50/60 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <Logo />
      </div>

      <nav className="flex-1 px-3 py-4">
        <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </div>
        <div className="space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/25"
                    : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm",
                )}
              >
                <Icon
                  className={cn(
                    "h-[18px] w-[18px]",
                    active
                      ? "text-white"
                      : "text-slate-400 group-hover:text-blue-600",
                  )}
                />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-3 border-t border-slate-200">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
          <div className="h-9 w-9 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-slate-900">
              {user?.name ?? "Account"}
            </div>
            <div className="truncate text-xs text-slate-400">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-white hover:text-red-600 transition-colors cursor-pointer"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Log out
        </button>
      </div>
    </aside>
  );
}
