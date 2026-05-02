import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceSummary } from "./types";
import { cn } from "@/lib/utils";

function toSrc(asset: ServiceSummary["imageUrl"]) {
  return typeof asset === "string" ? asset : asset.src;
}

const ACCENT_BG: Record<NonNullable<ServiceSummary["accent"]>, string> = {
  coral: "bg-[var(--coral)] text-[var(--coral-foreground)]",
  mint: "bg-[var(--mint)] text-foreground",
  gold: "bg-[var(--gold)] text-foreground",
  sky: "bg-[var(--sky)] text-foreground",
  peach: "bg-[var(--peach)] text-foreground",
};

export function ServiceCard({
  service,
  index,
  size = "md",
}: {
  service: ServiceSummary;
  index?: number;
  size?: "md" | "lg";
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elegant",
        size === "lg" ? "min-h-[25.5rem]" : "min-h-[24rem]",
      )}
    >
      <div className="relative flex-1 overflow-hidden">
        <img
          src={toSrc(service.imageUrl)}
          alt={service.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean)]/70 via-[var(--ocean)]/10 to-transparent" />

        {/* Editorial number */}
        {typeof index === "number" && (
          <span className="absolute right-5 top-5 font-display text-3xl italic text-ivory/90 mix-blend-screen">
            № {String(index + 1).padStart(2, "0")}
          </span>
        )}

        {/* Tags */}
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
            <span className="rounded-full bg-background/95 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
              {service.intensity}
            </span>
          )}
        </div>

        {/* Title overlay */}
        <div className="absolute inset-x-5 bottom-5">
          <h3 className="font-display text-[1.7rem] leading-tight tracking-tight text-ivory drop-shadow-md md:text-[1.9rem]">
            {service.title}
          </h3>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 bg-card p-5">
        <div className="min-w-0">
          <p className="text-sm text-foreground/70 line-clamp-2">{service.tagline}</p>
          {service.durationLabel && (
            <p className="mt-2 text-[0.7rem] uppercase tracking-[0.18em] text-foreground/45">
              {service.durationLabel}
            </p>
          )}
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-45 group-hover:bg-[var(--coral)] group-hover:text-[var(--coral-foreground)]">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
