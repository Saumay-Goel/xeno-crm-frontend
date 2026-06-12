"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquarePlus,
  Users,
  Filter,
  Send,
  LogOut,
  Menu,
  X,
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
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 hover:scale-105 transition-transform"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Persistent Desktop / Slide-out Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] sm:w-64 flex-col border-r border-slate-200 bg-slate-50/95 backdrop-blur-xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:bg-slate-50/60",
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white md:bg-transparent">
          <Logo />
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="px-2 pb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
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
                      "h-5 w-5 transition-colors",
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

        <div className="p-4 border-t border-slate-200 bg-white md:bg-transparent">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2">
            <div className="h-9 w-9 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold text-white shadow-inner">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-slate-900">
                {user?.name ?? "Account"}
              </div>
              <div className="truncate text-xs text-slate-500 font-medium">
                {user?.email}
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
