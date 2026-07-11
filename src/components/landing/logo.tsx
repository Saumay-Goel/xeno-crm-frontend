import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
      <div className="flex flex-col justify-center">
        <span
          className={`text-lg sm:text-xl font-bold tracking-tight leading-none ${
            light ? "text-white" : "text-slate-900"
          }`}
        >
          Brandable
          <span className={light ? "text-blue-200" : "text-blue-600"}>.io</span>
        </span>
        <span
          className={`text-[9px] sm:text-[10px] font-medium tracking-wide mt-0.5 ${
            light ? "text-white/70" : "text-slate-400"
          }`}
        >
          Made by Saumay
        </span>
      </div>
    </Link>
  );
}
