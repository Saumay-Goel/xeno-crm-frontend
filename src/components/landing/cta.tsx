import Link from "next/link";
import { Logo } from "./logo";

export function CTA() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-8 py-16 text-center">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-500/40 blur-3xl" />
          <h2 className="relative text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Ready to reach your shoppers?
          </h2>
          <p className="relative mt-3 text-blue-100 max-w-md mx-auto">
            Sign in and launch your first AI-built campaign in under a minute.
          </p>
          <Link
            href="/login"
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
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
      <footer className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-sm text-slate-400">
            Built as an engineering take-home · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}
