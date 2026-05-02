"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Calendar, Clock, Users, Wallet } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ClassBatch, ServiceDetails, SiteSettings } from "@/lib/api";
import { createEnrollment } from "@/lib/api";
import { mapBatch, mapPricingPlan } from "@/lib/media";
import { cn } from "@/lib/utils";
import groupImg from "@/assets/group-yoga.jpg";

export function EnrollmentClientPage({
  settings,
  batch,
  service,
}: {
  settings: SiteSettings;
  batch: ClassBatch;
  service: ServiceDetails | null;
}) {
  const router = useRouter();
  const visualBatch = mapBatch(batch);
  const availablePlans = (service?.pricing_plans ?? []).map(mapPricingPlan);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    service?.pricing_plans.find((plan) => plan.is_popular)?.id ??
      service?.pricing_plans[0]?.id ??
      null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    goal: "",
    notes: "",
  });

  const selectedPlan = useMemo(
    () => service?.pricing_plans.find((plan) => plan.id === selectedPlanId) ?? null,
    [selectedPlanId, service?.pricing_plans],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await createEnrollment({
        batch_id: batch.id,
        pricing_plan_id: selectedPlanId,
        full_name: form.fullName,
        phone: form.phone,
        email: form.email || undefined,
        goal: form.goal || undefined,
        notes: form.notes || undefined,
        source: "website",
      });

      const enrollment = response.data.enrollment;
      router.push(
        `/enrollments/${enrollment.id}?token=${encodeURIComponent(enrollment.access_token)}`,
      );
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We couldn't reserve your spot right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const seatsLeft = Math.max(0, batch.max_slots - batch.booked_slots);

  return (
    <SiteLayout settings={settings}>
      <section className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
            Reserve your seat
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
            Join {batch.title} with confidence.
          </h1>
          <p className="mt-6 max-w-md text-lg text-foreground/70 text-pretty">
            We’ll create your enrollment, keep your access details organized, and guide you through
            the next step from one secure place.
          </p>

          <div className="mt-10 overflow-hidden rounded-[2rem] bg-card shadow-elegant">
            <div className="relative aspect-[16/10]">
              <img
                src={
                  typeof visualBatch.imageUrl === "string"
                    ? visualBatch.imageUrl
                    : visualBatch.imageUrl.src
                }
                alt={batch.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
                {service?.name ?? "Live class"}
              </div>
              <div className="absolute bottom-5 left-5 text-ivory">
                <h2 className="font-display text-3xl tracking-tight">{batch.title}</h2>
                <p className="mt-1 text-sm text-ivory/80">with {batch.instructor_name}</p>
              </div>
            </div>

            <div className="grid gap-4 p-6 text-sm text-foreground/70">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-[var(--coral)]" />
                {batch.start_date} · {batch.days_of_week.join(", ")}
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-[var(--coral)]" />
                {batch.start_time} · {batch.timezone}
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-[var(--coral)]" />
                {seatsLeft} seats left of {batch.max_slots}
              </div>
              <div className="flex items-center gap-3">
                <Wallet className="h-4 w-4 text-[var(--coral)]" />
                {selectedPlan
                  ? `₹${selectedPlan.price_inr} · ${selectedPlan.title}`
                  : "Free or coach-confirmed pricing"}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-foreground/10 bg-card p-6 shadow-elegant md:p-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl tracking-tight">Complete your enrollment</h2>
                <p className="mt-2 text-sm text-foreground/60">
                  We’ll create your lead, booking, and secure enrollment access in one step.
                </p>
              </div>
            </div>

            {availablePlans.length > 0 ? (
              <div className="mt-8">
                <Label className="text-sm">Choose your plan</Label>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {service?.pricing_plans.map((plan, index) => {
                    const uiPlan = availablePlans[index];
                    const active = selectedPlanId === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={cn(
                          "rounded-3xl border p-5 text-left transition-all",
                          active
                            ? "border-foreground bg-foreground text-background shadow-soft"
                            : "border-foreground/10 bg-background hover:border-foreground/30",
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-display text-2xl tracking-tight">{uiPlan.name}</p>
                            <p
                              className={cn(
                                "mt-1 text-sm",
                                active ? "text-background/75" : "text-foreground/65",
                              )}
                            >
                              {uiPlan.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-display text-3xl tracking-tight">
                              ₹{plan.price_inr}
                            </p>
                            <p
                              className={cn(
                                "text-xs uppercase tracking-wider",
                                active ? "text-background/70" : "text-foreground/45",
                              )}
                            >
                              {plan.duration_label}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="enroll-name">Full name</Label>
                <Input
                  id="enroll-name"
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
                <Label htmlFor="enroll-phone">Phone</Label>
                <Input
                  id="enroll-phone"
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
                <Label htmlFor="enroll-email">Email</Label>
                <Input
                  id="enroll-email"
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
                <Label htmlFor="enroll-goal">Primary goal</Label>
                <Input
                  id="enroll-goal"
                  value={form.goal}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, goal: event.target.value }))
                  }
                  className="mt-2 h-12 rounded-2xl"
                  placeholder="Confidence, flexibility, consistency..."
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="enroll-notes">Anything we should know?</Label>
              <Textarea
                id="enroll-notes"
                rows={5}
                value={form.notes}
                onChange={(event) =>
                  setForm((current) => ({ ...current, notes: event.target.value }))
                }
                className="mt-2 rounded-2xl"
                placeholder="Schedule preferences, health context, or anything helpful before class starts."
              />
            </div>

            {error ? (
              <div className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-4 border-t border-foreground/10 pt-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-md text-sm text-foreground/60">
                After submission, you’ll land on your secure enrollment page where payment status,
                access, and join details live.
              </p>
              <Button
                type="submit"
                variant="coral"
                size="xl"
                className="group md:min-w-64"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating enrollment..." : "Reserve my seat"}
                <ArrowUpRight className="transition-transform group-hover:rotate-45" />
              </Button>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
