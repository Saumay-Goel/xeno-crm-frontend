"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/60 via-white to-white" />
      <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[500px] sm:h-[500px] sm:w-[800px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-[80px] sm:blur-[120px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 mb-6 sm:mb-8 transition-transform hover:scale-105 cursor-default animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          AI-native shopper engagement
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight leading-[1.1] text-slate-900 animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          Reach the right shoppers,
          <br className="hidden sm:block" />
          <span className="text-blue-600"> without the manual work.</span>
        </h1>

        <p
          className="mt-6 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed px-2 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          Describe who to reach in plain English. XenoTask builds the audience,
          drafts the message, picks the channel, and tracks every campaign — end
          to end.
        </p>

        <div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0 animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 inline-flex items-center justify-center gap-2"
          >
            Start free
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 20 20"
            >
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
            className="w-full sm:w-auto px-6 py-3.5 text-base font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all flex items-center justify-center"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Faux product preview */}
      <div
        className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 animate-fade-up"
        style={{ animationDelay: "500ms" }}
      >
        <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/50 overflow-hidden ring-1 ring-slate-900/5">
          {/* window chrome */}
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 backdrop-blur px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-slate-400 font-medium hidden sm:block">
              app.xenotask.com/compose
            </span>
          </div>
          {/* mock compose UI */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="p-4 sm:p-6 space-y-4 text-left bg-white">
              <div className="text-xs font-semibold tracking-wider text-slate-400">
                CHAT
              </div>
              <div className="flex justify-end">
                <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-2.5 text-sm text-white shadow-sm">
                  Win back high spenders who haven&apos;t ordered in 2 months,
                  20% off
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-2.5 text-sm text-slate-700 shadow-sm border border-slate-200/50">
                  Proposed “Dormant High Spenders” — 56 customers, via WhatsApp.
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 text-left bg-slate-50/30">
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
                <span className="text-sm font-semibold text-slate-900">
                  Dormant High Spenders
                </span>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
                  56 customers
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-600 font-mono shadow-sm overflow-x-auto whitespace-nowrap">
                <span className="text-blue-600">total_spend</span> &gt; 5000 AND{" "}
                <span className="text-blue-600">days_since_last_order</span>{" "}
                &gt; 60
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
                Hi{" "}
                <span className="font-semibold text-blue-600">
                  {"{{name}}"}
                </span>
                , we miss you! Enjoy 20% off your next order.
              </div>
              <button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 text-sm font-semibold text-white transition-colors shadow-sm shadow-blue-600/20 active:scale-[0.98]">
                Launch to 56 customers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
