import Link from "next/link";
import { ArrowUpRight, Calendar, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getSiteSettings } from "@/lib/api";
import ctaImg from "@/assets/cta-movement.jpg";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const [{ type }, settingsState] = await Promise.all([searchParams, getSiteSettings()]);
  const settings = settingsState.data;
  const isDiscoveryCall = type === "discovery-call";
  const nextSteps = isDiscoveryCall
    ? [
        {
          icon: Mail,
          title: "Watch your inbox",
          desc: "We may follow up by email or WhatsApp to confirm the best next step for you.",
        },
        {
          icon: Calendar,
          title: "Expect a thoughtful response",
          desc: "We review your goals and guide you toward the right class, plan, or live batch.",
        },
        {
          icon: Sparkles,
          title: "You don’t need to decide alone",
          desc: "The whole point of the call is helping you choose clearly and confidently.",
        },
      ]
    : [
        {
          icon: Mail,
          title: "Check your inbox",
          desc: "We’ve received your request and will send the next details shortly.",
        },
        {
          icon: Calendar,
          title: "Hold the space",
          desc: "Keep an eye out for your next instruction so you can move forward easily.",
        },
        {
          icon: Sparkles,
          title: "Stay close",
          desc: "We’ll guide the rest from here and keep the experience simple.",
        },
      ];

  return (
    <SiteLayout settings={settings}>
      <section className="container-x pb-16 pt-8 md:pt-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-ocean p-8 text-ivory shadow-elegant md:p-16">
          <img
            src={ctaImg.src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--coral)]/40 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[var(--gold)]/30 blur-3xl" />

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur">
              <CheckCircle2 className="h-3.5 w-3.5" /> Received
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-balance md:text-7xl">
              {isDiscoveryCall
                ? "Your discovery call request is in."
                : "You’re in. We can’t wait to support you."}
            </h1>
            <p className="mt-6 max-w-xl text-ivory/85 md:text-lg">
              {isDiscoveryCall
                ? "We’ll follow up with the clearest next step, and where relevant, we’ll guide you toward the right class or program."
                : "We have your details and we’ll reach out with the right next steps shortly."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="ivory" size="xl">
                <Link href="/batches">
                  Browse live classes <ArrowUpRight />
                </Link>
              </Button>
              <Button asChild variant="soft" size="xl" className="text-ivory">
                <Link href="/services">Explore practices</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {nextSteps.map((step, index) => (
            <div key={step.title} className="rounded-3xl bg-card p-7 shadow-soft">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/55">
                Step {index + 1}
              </span>
              <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-warm">
                <step.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl tracking-tight">{step.title}</h3>
              <p className="mt-2 text-foreground/65">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
