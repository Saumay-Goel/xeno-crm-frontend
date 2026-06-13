"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Logo } from "@/components/landing/logo";

const BACKEND_ORIGIN =
  process.env.NEXT_PUBLIC_BACKEND_ORIGIN ?? "http://localhost:4000/api";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      const endpoint = mode === "signup" ? "/auth/register" : "/auth/login";
      const res = await fetch(`/api${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "signup" ? { email, password, name } : { email, password },
        ),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Authentication failed");

      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data.token }),
      });

      window.location.href = "/dashboard";
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-white text-slate-900">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-blue-600">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-500/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Logo light />
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight font-sans">
              Reach the right shoppers, without the manual work.
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed max-w-md">
              Describe who to reach in plain English. XenoTask builds the
              audience, drafts the message, and tracks every campaign end to
              end.
            </p>
            <div className="space-y-3 pt-4">
              {[
                "AI-built audience segments",
                "Human-in-the-loop approval",
                "Live engagement funnel",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 text-blue-50">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M5 10l3 3 7-7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-blue-200 text-sm">AI-native shopper engagement</p>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:hidden flex justify-center">
            <Logo />
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-2xl font-bold tracking-tight">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-sm text-slate-500">
              {mode === "signup"
                ? "Start launching AI-built campaigns."
                : "Sign in to your XenoTask dashboard."}
            </p>
          </div>

          {mode === "login" && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-blue-900">
                    Evaluating this assignment?
                  </p>
                  <p className="text-xs text-blue-700/80 leading-relaxed">
                    Use the demo credentials below, or feel free to sign up /
                    use Google.
                  </p>
                  <div className="pt-2 font-mono text-[11px] text-blue-800 space-y-0.5">
                    <div>Email: demo@gmail.com</div>
                    <div>Password: 1048576s</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setEmail("demo@gmail.com");
                    setPassword("1048576s");
                  }}
                  className="shrink-0 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-200 transition-colors shadow-sm"
                >
                  Auto-fill
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {mode === "signup" && (
              <input
                className="w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              className="w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-11 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 shadow-sm shadow-blue-600/20"
            >
              {loading
                ? "Please wait…"
                : mode === "signup"
                  ? "Create account"
                  : "Log in"}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400">or</span>
            </div>
          </div>

          <button
            onClick={() => {
              window.location.href = `${BACKEND_ORIGIN}/auth/google`;
            }}
            className="w-full h-11 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 transition hover:bg-slate-50 inline-flex items-center justify-center gap-2.5"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 002.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-slate-500">
            {mode === "login" ? (
              <>
                No account?{" "}
                <button
                  className="font-medium text-blue-600 hover:underline"
                  onClick={() => {
                    setMode("signup");
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Have an account?{" "}
                <button
                  className="font-medium text-blue-600 hover:underline"
                  onClick={() => setMode("login")}
                >
                  Log in
                </button>
              </>
            )}
          </p>

          <p className="text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
