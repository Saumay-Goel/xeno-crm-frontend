export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-8 w-8 rounded-lg flex items-center justify-center shadow-sm ${
          light ? "bg-white" : "bg-blue-600"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 ${light ? "text-blue-600" : "text-white"}`}
          fill="none"
        >
          <path
            d="M5 5l14 14M19 5L5 19"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span
        className={`text-lg font-bold tracking-tight ${light ? "text-white" : "text-slate-900"}`}
      >
        Xeno
        <span className={light ? "text-blue-200" : "text-blue-600"}>Task</span>
      </span>
    </div>
  );
}
