"use client";

import { useRef, useEffect } from "react";
import type { ChatMessage } from "@/types";
import { Sparkles } from "lucide-react";

interface Props {
  messages: ChatMessage[];
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  loading: boolean;
  clarificationOptions: string[];
  onPickOption: (option: string) => void;
}

function ResultTable({
  data,
}: {
  data: { rows: Record<string, unknown>[]; rowCount: number };
}) {
  if (data.rows.length === 0) {
    return <div className="mt-2 text-xs text-slate-500">No results.</div>;
  }

  const columns = Object.keys(data.rows[0]);

  const formatCell = (val: unknown): string => {
    if (val === null || val === undefined) return "—";
    if (typeof val === "number") return val.toLocaleString("en-IN");
    if (typeof val === "string" && val !== "" && !isNaN(Number(val))) {
      return Number(val).toLocaleString("en-IN");
    }
    return String(val);
  };

  const prettify = (col: string) =>
    col
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="mt-3 -mx-1 overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
            {columns.map((col) => (
              <th
                key={col}
                className="px-3 py-2 text-left font-medium whitespace-nowrap"
              >
                {prettify(col)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
            >
              {columns.map((col) => (
                <td
                  key={col}
                  className="px-3 py-2 text-slate-700 whitespace-nowrap"
                >
                  {formatCell(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.rowCount > data.rows.length && (
        <div className="px-3 py-2 text-[11px] text-slate-400 bg-slate-50 border-t border-slate-100">
          Showing {data.rows.length} of {data.rowCount} results
        </div>
      )}
    </div>
  );
}

export function ChatPanel({
  messages,
  input,
  setInput,
  onSend,
  loading,
  clarificationOptions,
  onPickOption,
}: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* header */}
      <div className="flex shrink-0 items-center gap-2.5 pb-3 mb-3 border-b border-slate-100">
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none">
            <path
              d="M12 3v18M3 12h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">
            Campaign assistant
          </div>
          <div className="text-xs text-slate-400">
            AI-built audiences, you approve
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center text-slate-400 mt-8 space-y-3 px-4 sm:px-6">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center shadow-inner">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <p className="font-semibold text-slate-700 text-sm sm:text-base">
              Describe a campaign, or ask about your customers
            </p>
            <p className="text-xs sm:text-sm text-slate-400 max-w-[280px] leading-relaxed">
              e.g. “win back customers who spent over ₹5000 but haven’t ordered
              in 2 months” — or “how many customers are in each city?”
            </p>
          </div>
        )}

        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="relative max-w-[85%] rounded-2xl rounded-br-sm bg-blue-600 px-4 py-2.5 text-sm text-white leading-relaxed shadow-sm">
                {m.content}
                <span
                  className="absolute -right-1.5 bottom-0 h-3 w-3 bg-blue-600"
                  style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
                />
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-start">
              <div className="relative max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-2.5 text-sm text-slate-800 leading-relaxed border border-slate-200/50 shadow-sm">
                {m.content}
                {m.queryResult && <ResultTable data={m.queryResult} />}
                <span
                  className="absolute -left-1.5 bottom-0 h-3 w-3 bg-slate-100"
                  style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                />
              </div>
            </div>
          ),
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="relative rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3 shadow-sm border border-slate-200/50">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
              </div>
              <span
                className="absolute -left-1.5 bottom-0 h-3 w-3 bg-slate-100"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
              />
            </div>
          </div>
        )}

        {clarificationOptions.length > 0 && !loading && (
          <div className="flex flex-wrap gap-2 pt-2">
            {clarificationOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => onPickOption(opt)}
                className="rounded-xl border border-blue-200 bg-blue-50/50 px-3.5 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors text-left shadow-sm active:scale-[0.98]"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        <div ref={endRef} className="h-1" />
      </div>

      <div className="shrink-0 pt-3 mt-3 border-t border-slate-100 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Describe a campaign or ask about customers…"
          rows={1}
          className="flex-1 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm min-h-[44px] max-h-32"
        />
        <button
          onClick={onSend}
          disabled={loading || !input.trim()}
          className="shrink-0 h-[44px] w-[44px] rounded-xl bg-blue-600 text-white flex items-center justify-center transition-all hover:bg-blue-700 hover:shadow-md disabled:opacity-40 disabled:hover:shadow-none shadow-sm"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 ml-0.5" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
