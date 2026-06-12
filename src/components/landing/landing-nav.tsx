import Link from "next/link";
import { Logo } from "./logo";

export function LandingNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl animate-fade-up">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">
            Features
          </a>
          <a href="#how" className="hover:text-blue-600 transition-colors">
            How it works
          </a>
          <a href="#why" className="hover:text-blue-600 transition-colors">
            Why XenoTask
          </a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/login"
            className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-2"
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm shadow-blue-600/20 active:scale-95"
          >
            Get started
            <svg
              className="h-4 w-4 hidden sm:block"
              viewBox="0 0 20 20"
              fill="currentColor"
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
        </div>
      </div>
    </header>
  );
}
