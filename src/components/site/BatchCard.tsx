import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Users } from "lucide-react";
import type { BatchSession } from "./types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function toSrc(asset: BatchSession["imageUrl"]) {
  return typeof asset === "string" ? asset : asset.src;
}

const ACCENT: Record<NonNullable<BatchSession["accent"]>, string> = {
  coral: "from-[var(--coral)]/20 to-[var(--peach)]/30",
  mint: "from-[var(--mint)]/40 to-[var(--sky)]/30",
  gold: "from-[var(--gold)]/30 to-[var(--peach)]/30",
  sky: "from-[var(--sky)]/40 to-[var(--mint)]/30",
  peach: "from-[var(--peach)]/40 to-[var(--coral)]/20",
};

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function BatchCard({ b }: { b: BatchSession }) {
  const seatsLeft = Math.max(0, b.seatsTotal - b.seatsTaken);
  const pct = Math.round((b.seatsTaken / Math.max(1, b.seatsTotal)) * 100);
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={toSrc(b.imageUrl)}
          alt={b.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-tr opacity-60 mix-blend-multiply",
            ACCENT[b.accent ?? "coral"],
          )}
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-background/95 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            {b.category}
          </span>
          <span className="rounded-full bg-foreground/90 px-3 py-1 text-xs font-medium text-background backdrop-blur">
            {b.level}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <h3 className="font-display text-[1.6rem] tracking-tight md:text-[1.75rem]">{b.title}</h3>
          <p className="mt-1 text-sm text-foreground/65">with {b.instructor}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-foreground/70">
            <Calendar className="h-4 w-4 text-[var(--coral)]" />
            <span>{formatTime(b.startsAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70">
            <Clock className="h-4 w-4 text-[var(--coral)]" />
            <span>{b.durationMin} min</span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-foreground/60">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> {seatsLeft} seats left
            </span>
            <span>{pct}% full</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
            <div className="h-full rounded-full bg-gradient-warm" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <Button asChild variant="default" size="lg" className="mt-2 w-full group/btn">
          <Link href={`/enroll/${b.id}`}>
            Reserve seat
            <ArrowUpRight className="transition-transform group-hover/btn:rotate-45" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
