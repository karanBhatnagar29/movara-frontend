import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowUpRight, Calendar, Mail, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import ctaImg from "@/assets/cta-movement.jpg";

export const Route = createFileRoute("/success")({
  head: () => ({
    meta: [
      { title: "You're booked — Movara" },
      { name: "description", content: "Your Movara discovery call is confirmed." },
    ],
  }),
  component: SuccessPage,
});

const NEXT_STEPS = [
  { icon: Mail, title: "Check your inbox", desc: "We've sent a calendar invite and a short pre-call form." },
  { icon: Calendar, title: "Add to your calendar", desc: "20 minutes is all we need. Show up exactly as you are." },
  { icon: Sparkles, title: "Try a free class", desc: "Get a feel for Movara before our call — on us." },
];

function SuccessPage() {
  return (
    <SiteLayout>
      <section className="container-x pb-16 pt-8 md:pt-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-ocean p-8 text-ivory shadow-elegant md:p-16">
          <img src={ctaImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity" />
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--coral)]/40 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[var(--gold)]/30 blur-3xl" />

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur">
              <CheckCircle2 className="h-3.5 w-3.5" /> Confirmed
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-balance md:text-7xl">
              You're in. We can't wait to meet you.
            </h1>
            <p className="mt-6 max-w-xl text-ivory/85 md:text-lg">
              Your discovery call is booked. We'll be ready with curiosity, care, and a plan that's actually for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="ivory" size="xl">
                <Link to="/batches">Browse live classes <ArrowUpRight /></Link>
              </Button>
              <Button asChild variant="soft" size="xl" className="text-ivory">
                <Link to="/services">Explore practices</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {NEXT_STEPS.map((s, i) => (
            <div key={s.title} className="rounded-3xl bg-card p-7 shadow-soft">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/55">
                Step {i + 1}
              </span>
              <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-warm">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl tracking-tight">{s.title}</h3>
              <p className="mt-2 text-foreground/65">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
