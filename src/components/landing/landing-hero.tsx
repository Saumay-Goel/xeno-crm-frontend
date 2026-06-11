"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/60 via-white to-white" />
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-[120px]" />

      <div className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          AI-native shopper engagement
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-slate-900">
          Reach the right shoppers,
          <br />
          <span className="text-blue-600">without the manual work.</span>
        </h1>

        <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Describe who to reach in plain English. XenoTask builds the audience,
          drafts the message, picks the channel, and tracks every campaign — end
          to end.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-600/20 inline-flex items-center gap-2"
          >
            Start free
            <svg className="h-4 w-4" viewBox="0 0 20 20">
              <path
                d="M7 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 text-base font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Faux product preview */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40 overflow-hidden">
          {/* window chrome */}
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-slate-400">
              app.xenotask.com/compose
            </span>
          </div>
          {/* mock compose UI */}
          <div className="grid grid-cols-2 divide-x divide-slate-100">
            <div className="p-5 space-y-3 text-left">
              <div className="text-xs font-medium text-slate-400">CHAT</div>
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-blue-600 px-3 py-2 text-sm text-white">
                  Win back high spenders who haven&apos;t ordered in 2 months,
                  20% off
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-sm text-slate-700">
                  Proposed “Dormant High Spenders” — 56 customers, via WhatsApp.
                </div>
              </div>
            </div>
            <div className="p-5 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900">
                  Dormant High Spenders
                </span>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                  56 customers
                </span>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs text-slate-500 font-mono">
                total_spend &gt; 5000 AND days_since_last_order &gt; 60
              </div>
              <div className="rounded-lg border border-slate-100 p-3 text-sm text-slate-600">
                Hi {"{{name}}"}, we miss you! Enjoy 20% off your next order.
              </div>
              <button className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white">
                Launch to 56 customers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
