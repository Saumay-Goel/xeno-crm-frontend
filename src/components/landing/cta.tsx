import Link from "next/link";
import { Logo } from "./logo";

export function CTA() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-16 sm:px-12 sm:py-20 text-center shadow-2xl shadow-blue-900/20">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/50 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-700/50 blur-3xl" />

          <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Ready to reach your shoppers?
          </h2>
          <p className="relative mt-4 text-base sm:text-lg text-blue-100 max-w-lg mx-auto">
            Sign in and launch your first AI-built campaign in under a minute.
          </p>
          <Link
            href="/login"
            className="relative mt-8 sm:mt-10 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-blue-700 hover:bg-blue-50 hover:scale-105 transition-all shadow-xl shadow-blue-900/20 w-full sm:w-auto"
          >
            Get started free
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
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo />
          <div className="text-center sm:text-right flex flex-col gap-1 sm:gap-1.5">
            <p className="text-sm text-slate-400 font-medium">
              Built as an engineering take-home · {new Date().getFullYear()}
            </p>
            <p className="text-xs text-slate-400/70 font-medium flex items-center justify-center sm:justify-end gap-1.5">
              Made by Saumay
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400/80 inline-block" />
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
