export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="relative max-w-[80%] rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
        </div>
        <span
          className="absolute -left-1.5 bottom-0 h-3 w-3 bg-slate-100"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
      </div>
    </div>
  );
}
