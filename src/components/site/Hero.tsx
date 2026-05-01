import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-movement.jpg";
import groupImg from "@/assets/group-yoga.jpg";

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
  badge = "Global wellness · Live & on-demand",
  title = "Move with grace.",
  highlight = "Live with vitality.",
  subtitle = "Movara is a global movement studio for women who want to feel strong, supple, and unmistakably themselves — guided by world-class instructors, in real time.",
  primaryCta = { label: "Book a Discovery Call", to: "/contact" },
  secondaryCta = { label: "Explore Classes", to: "/batches" },
  stats = [
    { value: "12k+", label: "Members worldwide" },
    { value: "4.9", label: "Average rating" },
    { value: "60+", label: "Live classes / week" },
  ],
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[var(--peach)] opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-[var(--mint)] opacity-50 blur-3xl" />

      <div className="container-x relative grid gap-10 pb-12 pt-6 lg:grid-cols-12 lg:gap-12 lg:pb-20">
        {/* Left: copy */}
        <div className="lg:col-span-6 lg:pt-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[var(--coral)]" />
            {badge}
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] tracking-tight text-balance">
            {title}
            <br />
            <span className="italic text-[var(--coral)]">{highlight}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-foreground/70 text-pretty md:text-xl">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
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

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-foreground/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-foreground/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: image collage */}
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-elegant">
            <img
              src={heroImg}
              alt="Woman in flowing movement bathed in golden studio light"
              className="h-full w-full object-cover"
              width={1080}
              height={1350}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-6">
              <div className="flex items-center gap-3 rounded-2xl bg-background/90 p-3 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-warm">
                  <Star className="h-4 w-4 fill-foreground text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Live now · Morning Flow</p>
                  <p className="text-xs text-foreground/60">42 practicing together</p>
                </div>
                <span className="flex h-2 w-2 rounded-full bg-[var(--coral)]">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-[var(--coral)]" />
                </span>
              </div>
            </div>
          </div>

          {/* Floating secondary card */}
          <div className="absolute -bottom-8 -left-6 hidden w-64 overflow-hidden rounded-3xl border-4 border-background shadow-elegant md:block lg:-left-10">
            <img
              src={groupImg}
              alt="Group practicing in a sunlit studio"
              loading="lazy"
              width={400}
              height={300}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          {/* Floating quote */}
          <div className="absolute -right-2 top-6 hidden max-w-[240px] rounded-2xl bg-ivory p-5 shadow-elegant md:block">
            <p className="font-display text-lg italic leading-snug">
              “I finally feel at home in my body.”
            </p>
            <p className="mt-2 text-xs uppercase tracking-wider text-foreground/55">
              — Aanya, Member
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
