import { ArrowUpRight, Star, ArrowDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
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

      <div className="container-x relative grid gap-12 pb-16 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        {/* Left: copy */}
        <div className="lg:col-span-7 lg:pt-6">
          {/* Editorial eyebrow with date marker */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
            <span className="h-px w-10 bg-foreground/30" />
            <span>{badge}</span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(3rem,8.5vw,6.75rem)] font-light leading-[0.95] tracking-tight text-balance">
            {title}
            <br />
            <HighlightHeadline text={highlight} />
          </h1>

          <p className="mt-7 max-w-xl text-lg text-foreground/70 text-pretty md:text-xl">
            {subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild variant="coral" size="xl" className="group">
              <Link to={primaryCta.to as "/"}>
                {primaryCta.label}
                <ArrowUpRight className="transition-transform group-hover:rotate-45" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to={secondaryCta.to as "/"}>{secondaryCta.label}</Link>
            </Button>
          </div>

          {/* Stats — editorial number row */}
          <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-foreground/10 pt-8">
            {stats.map((s, i) => (
              <div key={s.label} className={i > 0 ? "border-l border-foreground/10 pl-4" : ""}>
                <dt className="font-display text-3xl tracking-tight text-foreground md:text-5xl">
                  {s.value}
                </dt>
                <dd className="mt-2 text-[0.7rem] uppercase tracking-[0.18em] text-foreground/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: image collage */}
        <div className="relative lg:col-span-5 lg:pl-4">
          {/* Main hero image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-elegant">
            <img
              src={heroImg}
              alt="Woman in flowing movement bathed in golden studio light"
              className="h-full w-full object-cover"
              width={1080}
              height={1350}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ocean)]/30 via-transparent to-transparent" />

            {/* Live now chip */}
            <div className="absolute inset-x-4 bottom-4">
              <div className="flex items-center gap-3 rounded-2xl bg-background/95 p-3 shadow-soft backdrop-blur-md">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--coral)]">
                  <Star className="h-4 w-4 fill-[var(--coral-foreground)] text-[var(--coral-foreground)]" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--coral)] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--coral)] ring-2 ring-background" />
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Live now · Morning Flow</p>
                  <p className="text-xs text-foreground/60">42 practicing together</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rotated sticker badge */}
          <div className="sticker absolute -left-4 -top-4 z-10 hidden h-28 w-28 items-center justify-center rounded-full bg-[var(--coral)] text-center text-[var(--coral-foreground)] shadow-glow md:flex lg:-left-10">
            <div>
              <p className="font-display text-2xl leading-none">Free</p>
              <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.15em]">
                Discovery
                <br />
                Call
              </p>
            </div>
          </div>

          {/* Floating secondary card */}
          <div className="absolute -bottom-10 -left-8 hidden w-56 overflow-hidden rounded-3xl border-[6px] border-background shadow-elegant md:block lg:-left-14">
            <img
              src={groupImg}
              alt="Group practicing in a sunlit studio"
              loading="lazy"
              width={400}
              height={300}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          {/* Floating quote card */}
          <div className="absolute -right-3 top-10 hidden max-w-[230px] rounded-2xl bg-ivory p-5 shadow-elegant md:block">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[var(--coral)] text-[var(--coral)]" />
              ))}
            </div>
            <p className="mt-2 font-display text-base italic leading-snug">
              “I finally feel at home in my body.”
            </p>
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.18em] text-foreground/55">
              — Aanya, Member
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="container-x relative hidden items-center justify-between pb-6 lg:flex">
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
