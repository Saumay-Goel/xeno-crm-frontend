export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      {/* <div
        className={`h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg flex items-center justify-center shadow-sm transition-transform group-hover:rotate-6 ${
          light ? "bg-white" : "bg-blue-600"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 sm:h-5.5 sm:w-5.5 ${light ? "text-blue-600" : "text-white"}`}
          fill="none"
        >
          <path
            d="M5 5l14 14M19 5L5 19"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div> */}
      <div className="flex flex-col justify-center">
        <span
          className={`text-lg sm:text-xl font-bold tracking-tight leading-none ${
            light ? "text-white" : "text-slate-900"
          }`}
        >
          Xeno
          <span className={light ? "text-blue-200" : "text-blue-600"}>
            Task
          </span>
        </span>
        <span
          className={`text-[9px] sm:text-[10px] font-medium tracking-wide mt-0.5 ${
            light ? "text-white/70" : "text-slate-400"
          }`}
        >
          Made by Saumay
        </span>
      </div>
    </div>
  );
}
