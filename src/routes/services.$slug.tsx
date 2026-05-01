import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clock, Activity } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/site/FinalCta";
import yogaImg from "@/assets/service-yoga.jpg";
import groupImg from "@/assets/group-yoga.jpg";
import studioImg from "@/assets/studio-interior.jpg";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Movara` },
      {
        name: "description",
        content: "Detailed look at this Movara practice — what to expect, who it's for, and how to begin.",
      },
    ],
  }),
  component: ServiceDetailPage,
});

// Placeholder structure — would be loaded by slug from backend.
const HIGHLIGHTS = [
  { title: "Live & on-demand", desc: "Join real classes or practice on your own time — same coaching, same care." },
  { title: "Modifications for every body", desc: "Every pose, every move, made just for you." },
  { title: "Small-batch attention", desc: "Capped class sizes so the instructor sees you, hears you, and adjusts you." },
];

const OUTCOMES = [
  "Feel stronger and more flexible within 30 days",
  "Build a sustainable, joyful daily practice",
  "Reduce stress and sleep more deeply",
  "Reconnect with the way your body wants to move",
];

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--coral)]" />
            Practice
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight text-balance md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foreground/70 text-pretty">
            A signature Movara practice designed to build strength, mobility, and confidence — without ever feeling rushed or harsh.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2 text-sm">
              <Clock className="h-4 w-4 text-[var(--coral)]" /> 45–60 min
            </div>
            <div className="flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2 text-sm">
              <Activity className="h-4 w-4 text-[var(--coral)]" /> Balanced intensity
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="coral" size="xl" className="group">
              <Link to="/contact">Book a Discovery Call <ArrowUpRight className="transition-transform group-hover:rotate-45" /></Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/batches">View live schedule</Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-[2rem] shadow-elegant">
            <img src={yogaImg} alt={title} className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container-x py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="rounded-3xl bg-card p-7 shadow-soft">
              <h3 className="font-display text-xl tracking-tight">{h.title}</h3>
              <p className="mt-2 text-foreground/65">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes + sticky CTA */}
      <section className="container-x grid gap-12 py-16 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">What you'll feel.</h2>
          <ul className="mt-8 space-y-4">
            {OUTCOMES.map((o) => (
              <li key={o} className="flex items-start gap-3 text-lg">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--mint)]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-foreground/80">{o}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <img src={groupImg} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
            <img src={studioImg} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-gradient-ocean p-8 text-ivory shadow-elegant">
            <p className="text-sm uppercase tracking-[0.18em] text-ivory/65">Not sure yet?</p>
            <p className="mt-3 font-display text-3xl leading-tight">Talk to a coach for 20 minutes.</p>
            <p className="mt-3 text-ivory/80">We'll help you choose the right format and instructor — free, no pressure.</p>
            <Button asChild variant="coral" size="lg" className="mt-6 w-full group">
              <Link to="/contact">Book a Discovery Call <ArrowUpRight className="transition-transform group-hover:rotate-45" /></Link>
            </Button>
          </div>
        </aside>
      </section>

      <FinalCta />
    </SiteLayout>
  );
}
