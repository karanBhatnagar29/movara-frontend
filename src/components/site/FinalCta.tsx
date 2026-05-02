import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ctaImg from "@/assets/cta-movement.jpg";

export function FinalCta({
  eyebrow = "Your first step",
  title = "A 20-minute call. A clearer body. A braver life.",
  description = "Talk to a Movara coach about your goals, your schedule, and the practice that fits the life you want to build.",
  ctaLabel = "Book a Discovery Call",
  to = "/contact",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  to?: string;
}) {
  return (
    <section className="container-x">
      <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-ocean p-7 text-ivory shadow-elegant md:p-12 lg:p-16">
        <img
          src={ctaImg.src}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--coral)]/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[var(--gold)]/30 blur-3xl" />

        <div className="relative grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ivory backdrop-blur">
              {eyebrow}
            </span>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-[1.08] tracking-tight text-balance md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-ivory/80 text-pretty md:text-base">{description}</p>
          </div>
          <div className="flex lg:justify-end">
            <Button asChild variant="coral" size="lg" className="group">
              <Link href={to}>
                {ctaLabel}
                <ArrowUpRight className="transition-transform group-hover:rotate-45" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
