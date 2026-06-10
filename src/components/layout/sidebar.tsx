"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquarePlus,
  Users,
  Filter,
  Send,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { clearToken, type AuthUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/compose", label: "Compose", icon: MessageSquarePlus },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/segments", label: "Segments", icon: Filter },
  { href: "/dashboard/campaigns", label: "Campaigns", icon: Send },
];

export function Sidebar({ user }: { user: AuthUser | null }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <aside className="w-60 shrink-0 border-r bg-muted/30 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <span className="font-semibold text-lg">Xeno CRM</span>
      </div>
      <nav className="flex-1 p-3 space-y-1">
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
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t space-y-2">
        {user && (
          <div className="px-2 text-sm">
            <div className="font-medium truncate">
              {user.name ?? user.email}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {user.email}
            </div>
          </div>
        )}
        <Button variant="outline" size="sm" className="w-full" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" /> Log out
        </Button>
      </div>
    </aside>
  );
}
