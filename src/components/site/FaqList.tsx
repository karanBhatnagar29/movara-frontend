import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FaqItem } from "./types";
import { cn } from "@/lib/utils";

export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-3xl border transition-all duration-300",
              isOpen
                ? "border-foreground/15 bg-card shadow-soft"
                : "border-foreground/10 bg-background/50 hover:border-foreground/20",
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg tracking-tight md:text-xl">
                {item.question}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
                  isOpen ? "bg-foreground text-background" : "bg-foreground/5 text-foreground",
                )}
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0">
                <p className="px-6 pb-6 text-foreground/70 text-pretty">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
