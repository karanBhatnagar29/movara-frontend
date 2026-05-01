import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PricingCard } from "@/components/site/PricingCard";
import { FaqList } from "@/components/site/FaqList";
import { FinalCta } from "@/components/site/FinalCta";
import type { PricingPlan, FaqItem } from "@/components/site/types";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Movara" },
      { name: "description", content: "Simple, transparent plans for every stage of your wellness practice." },
      { property: "og:title", content: "Pricing — Movara" },
      { property: "og:description", content: "Three plans, real transformation, cancel any time." },
    ],
  }),
  component: PricingPage,
});

const PRICING: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceLabel: "$29",
    cadenceLabel: "/ month",
    description: "Begin your practice with on-demand access.",
    features: ["Unlimited on-demand library", "Beginner-friendly tracks", "Mobile & TV apps", "Weekly inspiration emails"],
    ctaLabel: "Start Starter",
  },
  {
    id: "live",
    name: "Live Studio",
    priceLabel: "$59",
    cadenceLabel: "/ month",
    description: "Practice live with our instructors, every day.",
    features: ["Everything in Starter", "60+ live classes / week", "Small-group studio batches", "Personalized weekly plan", "Member community"],
    highlighted: true,
    ctaLabel: "Join Live Studio",
  },
  {
    id: "transform",
    name: "Transform",
    priceLabel: "$129",
    cadenceLabel: "/ month",
    description: "1:1 coaching and personal programming.",
    features: ["Everything in Live Studio", "Monthly 1:1 coaching session", "Custom transformation plan", "Direct chat with your instructor", "Quarterly progress review"],
    ctaLabel: "Apply for Transform",
  },
];

const FAQS: FaqItem[] = [
  { id: "1", question: "Can I switch plans later?", answer: "Yes — upgrade, downgrade or pause from your account in two clicks." },
  { id: "2", question: "Do you offer annual pricing?", answer: "Annual plans are available at a 20% discount. Mention it on your discovery call." },
  { id: "3", question: "Is there a free trial?", answer: "Your first live class is free. Most members start there before joining a plan." },
  { id: "4", question: "What's the cancellation policy?", answer: "Cancel anytime, no questions asked. Your access stays active until the end of your billing cycle." },
];

function PricingPage() {
  return (
    <SiteLayout>
      <section className="container-x py-12 md:py-20">
        <SectionHeading
          eyebrow="Plans"
          align="center"
          title={<>Choose the depth of <em className="italic text-[var(--coral)]">support you need</em>.</>}
          description="Three simple plans. Honest pricing. Cancel any time."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PRICING.map((p) => (
            <PricingCard key={p.id} plan={p} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-foreground/55">
          All plans include a free 20-minute discovery call to match you with the right instructor.
        </p>
      </section>

      <section className="container-x py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading eyebrow="Pricing FAQ" title="Honest answers." />
          <FaqList items={FAQS} />
        </div>
      </section>

      <FinalCta />
    </SiteLayout>
  );
}
