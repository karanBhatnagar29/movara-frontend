"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Clock, Mail, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteSettings } from "@/lib/api";
import { createLead } from "@/lib/api";
import studioImg from "@/assets/studio-interior.jpg";
import t1 from "@/assets/testimonial-1.jpg";

const REASSURANCES = [
  { icon: Clock, text: "A thoughtful 20-minute conversation" },
  { icon: ShieldCheck, text: "No pressure, just clear guidance" },
  { icon: Sparkles, text: "A personal recommendation for your next step" },
];

export function ContactPageClient({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    source: "website",
    goal: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await createLead({
        full_name: form.fullName,
        phone: form.phone,
        email: form.email || undefined,
        source: form.source || "website",
        goal: form.goal || undefined,
      });
      router.push("/success?type=discovery-call");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We couldn't submit your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SiteLayout settings={settings}>
      <section className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--coral)]" />
            Book a call with {settings.brand_name}
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight text-balance md:text-6xl">
            Tell us where you want support and we’ll guide the next step.
          </h1>
          <p className="mt-6 max-w-md text-lg text-foreground/70 text-pretty">
            Share a little context and we’ll use it to recommend the right class, format, and
            starting point for you.
          </p>

          <ul className="mt-8 space-y-3">
            {REASSURANCES.map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-foreground/80">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mint)]">
                  <item.icon className="h-4 w-4" />
                </span>
                {item.text}
              </li>
            ))}
          </ul>

          <div className="relative mt-10 overflow-hidden rounded-3xl shadow-elegant">
            <img
              src={studioImg.src}
              alt="Movara studio"
              className="aspect-[5/3] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent p-5">
              <img
                src={t1.src}
                alt="Movara coach"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
              />
              <div className="text-ivory">
                <p className="font-display text-lg leading-tight">
                  “We’ll help you choose clearly.”
                </p>
                <p className="text-xs text-ivory/75">— Movara coaching team</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-foreground/60">
            {settings.support_email ? (
              <a
                href={`mailto:${settings.support_email}`}
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Mail className="h-4 w-4" /> {settings.support_email}
              </a>
            ) : null}
            {settings.support_phone ? (
              <a
                href={`tel:${settings.support_phone}`}
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Phone className="h-4 w-4" /> {settings.support_phone}
              </a>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-foreground/10 bg-card p-6 shadow-elegant md:p-10"
          >
            <div className="rounded-[1.75rem] border border-foreground/10 bg-background/60 p-5 text-pretty text-foreground/75">
              Share a little context and we’ll use it to prepare a more thoughtful discovery call
              recommendation.
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="full-name">Full name</Label>
                <Input
                  id="full-name"
                  required
                  value={form.fullName}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, fullName: event.target.value }))
                  }
                  className="mt-2 h-12 rounded-2xl"
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  required
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, phone: event.target.value }))
                  }
                  className="mt-2 h-12 rounded-2xl"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  className="mt-2 h-12 rounded-2xl"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <Label htmlFor="source">How did you hear about us?</Label>
                <Input
                  id="source"
                  value={form.source}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, source: event.target.value }))
                  }
                  className="mt-2 h-12 rounded-2xl"
                  placeholder="website"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="goal">Your goal</Label>
              <Textarea
                id="goal"
                rows={6}
                value={form.goal}
                onChange={(event) =>
                  setForm((current) => ({ ...current, goal: event.target.value }))
                }
                className="mt-2 rounded-2xl"
                placeholder="Tell us what you want support with..."
              />
            </div>

            {error ? (
              <div className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-4 border-t border-foreground/10 pt-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-md text-sm text-foreground/60">
                We only use these details to recommend the right next step and contact you about
                your enquiry.
              </p>
              <Button
                type="submit"
                variant="coral"
                size="xl"
                className="group md:min-w-64"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Book my discovery call"}
                <ArrowUpRight className="transition-transform group-hover:rotate-45" />
              </Button>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
