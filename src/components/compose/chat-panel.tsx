"use client";

import { useRef, useEffect } from "react";
import type { ChatMessage } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-12 space-y-2">
            <Sparkles className="h-8 w-8 mx-auto text-primary" />
            <p className="font-medium">Describe a campaign in plain English</p>
            <p className="text-sm">
              e.g. “win back customers who spent over ₹5000 but haven’t ordered
              in 2 months with 20% off”
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user" ? "flex justify-end" : "flex justify-start"
            }
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground">
              Thinking…
            </div>
          </div>
        )}

        {clarificationOptions.length > 0 && !loading && (
          <div className="flex flex-wrap gap-2">
            {clarificationOptions.map((opt) => (
              <Button
                key={opt}
                variant="outline"
                size="sm"
                onClick={() => onPickOption(opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        )}

        <div ref={endRef} />
      </div>

      <div className="pt-3 border-t mt-3 flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Describe your campaign…"
          rows={2}
          className="resize-none"
        />
        <Button onClick={onSend} disabled={loading || !input.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
}
