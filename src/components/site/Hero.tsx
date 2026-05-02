import Link from "next/link";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-movement.jpg";
import groupImg from "@/assets/group-yoga.jpg";

/**
 * Render the highlight phrase with the scribble underline applied
 * only to the last word, so it always feels intentional regardless of wrapping.
 */
function HighlightHeadline({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  const last = words.pop() ?? "";
  const lead = words.join(" ");
  return (
    <span className="italic font-normal text-[var(--coral)]">
      {lead && <>{lead} </>}
      <span className="scribble-underline">{last}</span>
    </span>
  );
}

export interface HeroProps {
  badge?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  stats?: { value: string; label: string }[];
}

export function Hero({
  badge = "Est. 2024 · A global movement studio",
  title = "Move with grace.",
  highlight = "Live with vitality.",
  subtitle = "A global movement studio for women who want to feel strong, supple, and unmistakably themselves — guided by world-class instructors, in real time.",
  primaryCta = { label: "Book a Discovery Call", to: "/contact" },
  secondaryCta = { label: "Explore Classes", to: "/batches" },
  stats = [
    { value: "12k+", label: "Members worldwide" },
    { value: "4.9", label: "Average rating" },
    { value: "60+", label: "Live classes / week" },
  ],
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      {/* Ambient warm blobs */}
      <div className="pointer-events-none absolute -left-32 top-32 h-[28rem] w-[28rem] animate-float-slow rounded-full bg-[var(--peach)] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-10 h-[32rem] w-[32rem] animate-float-slow rounded-full bg-[var(--gold)] opacity-50 blur-3xl [animation-delay:-6s]" />
      <div className="pointer-events-none absolute inset-0 paper-noise opacity-60" />

      <div className="container-x relative grid gap-8 pb-8 lg:grid-cols-12 lg:gap-8 lg:pb-12">
        {/* Left: copy */}
        <div className="relative z-10 lg:col-span-7 lg:pt-2">
          {/* Editorial eyebrow with date marker */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
            <span className="h-px w-10 bg-foreground/30" />
            <span>{badge}</span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(2.6rem,5.9vw,4.85rem)] font-light leading-[0.96] tracking-tight text-balance">
            {title}
            <br />
            <HighlightHeadline text={highlight} />
          </h1>

          <p className="mt-4 max-w-xl text-[0.98rem] leading-7 text-foreground/70 text-pretty md:text-[1.05rem]">
            {subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild variant="coral" size="lg" className="group">
              <Link href={primaryCta.to}>
                {primaryCta.label}
                <ArrowUpRight className="transition-transform group-hover:rotate-45" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryCta.to}>{secondaryCta.label}</Link>
            </Button>
          </div>

          {/* Stats — editorial number row */}
          <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-foreground/10 pt-5">
            {stats.map((s, i) => (
              <div key={s.label} className={i > 0 ? "border-l border-foreground/10 pl-4" : ""}>
                <dt className="font-display text-[1.9rem] tracking-tight text-foreground md:text-[3.15rem]">
                  {s.value}
                </dt>
                <dd className="mt-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-foreground/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: image collage */}
        <div className="relative pb-8 lg:col-span-5 lg:pl-3 lg:pb-10">
          {/* Main hero image */}
          <div className="relative aspect-[4/4.25] overflow-hidden rounded-[1.75rem] shadow-elegant">
            <img
              src={heroImg.src}
              alt="Woman in flowing movement bathed in golden studio light"
              className="h-full w-full object-cover"
              width={1080}
              height={1350}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ocean)]/30 via-transparent to-transparent" />
          </div>

          {/* Live now chip */}
          <div className="absolute inset-x-3 -bottom-1 z-20 lg:inset-x-6">
            <div className="relative rounded-2xl bg-background/95 py-2 pl-[8.5rem] pr-4 shadow-soft backdrop-blur-md sm:pl-[9.25rem]">
              <div className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 overflow-hidden rounded-[1.75rem] border-[6px] border-background shadow-elegant">
                <img
                  src={groupImg.src}
                  alt="Group practicing in a sunlit studio"
                  loading="lazy"
                  width={400}
                  height={300}
                  className="h-24 w-24 object-cover sm:h-28 sm:w-28"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--coral)]">
                  <Star className="h-4 w-4 fill-[var(--coral-foreground)] text-[var(--coral-foreground)]" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--coral)] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--coral)] ring-2 ring-background" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground sm:text-base">
                    Live now · Morning Flow
                  </p>
                  <p className="text-xs text-foreground/60 sm:text-sm">42 practicing together</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rotated sticker badge */}
          <div className="sticker absolute -left-3 -top-3 z-10 hidden h-24 w-24 items-center justify-center rounded-full bg-[var(--coral)] text-center text-[var(--coral-foreground)] shadow-glow md:flex lg:-left-8">
            <div>
              <p className="font-display text-xl leading-none">Free</p>
              <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.15em]">
                Discovery
                <br />
                Call
              </p>
            </div>
          </div>

          {/* Floating quote card */}
          <div className="absolute -right-2 top-8 hidden max-w-[210px] rounded-2xl bg-ivory p-4 shadow-elegant xl:block">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[var(--coral)] text-[var(--coral)]" />
              ))}
            </div>
            <p className="mt-2 font-display text-[0.95rem] italic leading-snug">
              “I finally feel at home in my body.”
            </p>
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.18em] text-foreground/55">
              — Aanya, Member
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="container-x relative hidden items-center justify-between pb-4 lg:flex">
        <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-foreground/55">
          <ArrowDown className="h-4 w-4 animate-bounce text-[var(--coral)]" />
          Scroll to explore
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/55">
          № 01 — The Practice
        </span>
      </div>
    </section>
  );
}
