import { Asterisk } from "lucide-react";

export interface MarqueeProps {
  items?: string[];
  variant?: "dark" | "warm";
}

const DEFAULT_ITEMS = [
  "Live in 40+ countries",
  "12,000+ members",
  "World-class instructors",
  "Body-first programming",
  "Yoga · Pilates · Dance · Stillness",
  "Practice from anywhere",
];

/**
 * Edge-to-edge animated marquee strip.
 * Adds a sense of liveness + reinforces brand pillars under the hero.
 */
export function Marquee({ items = DEFAULT_ITEMS, variant = "dark" }: MarqueeProps) {
  const loop = [...items, ...items];
  const isDark = variant === "dark";

  return (
    <div
      className={`relative overflow-hidden border-y ${
        isDark
          ? "border-foreground/15 bg-foreground text-background"
          : "border-foreground/10 bg-[var(--peach)]/40 text-foreground"
      }`}
    >
      <div className="flex w-max animate-marquee items-center gap-10 py-4 will-change-transform md:gap-14 md:py-5">
        {loop.map((label, i) => (
          <div key={i} className="flex shrink-0 items-center gap-10 md:gap-14">
            <span className="font-display text-xl tracking-tight md:text-3xl">
              {label}
            </span>
            <Asterisk
              className={`h-5 w-5 md:h-7 md:w-7 ${
                isDark ? "text-[var(--coral)]" : "text-[var(--coral)]"
              }`}
              strokeWidth={2.5}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
