import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ServiceSummary } from "./types";
import { cn } from "@/lib/utils";

const ACCENT_BG: Record<NonNullable<ServiceSummary["accent"]>, string> = {
  coral: "bg-[var(--coral)] text-[var(--coral-foreground)]",
  mint: "bg-[var(--mint)] text-foreground",
  gold: "bg-[var(--gold)] text-foreground",
  sky: "bg-[var(--sky)] text-foreground",
  peach: "bg-[var(--peach)] text-foreground",
};

export function ServiceCard({
  service,
  size = "md",
}: {
  service: ServiceSummary;
  size?: "md" | "lg";
}) {
  return (
    <Link
      to={"/services/$slug" as "/"}
      params={{ slug: service.slug } as never}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant",
        size === "lg" ? "min-h-[28rem]" : "min-h-[24rem]",
      )}
    >
      <div className="relative flex-1 overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              ACCENT_BG[service.accent ?? "coral"],
            )}
          >
            {service.category}
          </span>
          {service.intensity && (
            <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
              {service.intensity}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 bg-card p-6">
        <div>
          <h3 className="font-display text-2xl tracking-tight">{service.title}</h3>
          <p className="mt-1 text-sm text-foreground/65">{service.tagline}</p>
          {service.durationLabel && (
            <p className="mt-2 text-xs uppercase tracking-wider text-foreground/45">
              {service.durationLabel}
            </p>
          )}
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
