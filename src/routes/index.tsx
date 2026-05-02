import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, HeartPulse, Globe, Sparkles, ShieldCheck, Quote } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { PricingCard } from "@/components/site/PricingCard";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { FaqList } from "@/components/site/FaqList";
import { FinalCta } from "@/components/site/FinalCta";
import { Button } from "@/components/ui/button";
import type { ServiceSummary, PricingPlan, Testimonial, FaqItem } from "@/components/site/types";
import yogaImg from "@/assets/service-yoga.jpg";
import pilatesImg from "@/assets/service-pilates.jpg";
import danceImg from "@/assets/service-dance.jpg";
import meditationImg from "@/assets/service-meditation.jpg";
import whyImg from "@/assets/why-choose.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Movara — Move with grace. Live with vitality." },
      {
        name: "description",
        content:
          "Movara is a global movement & wellness platform offering live and on-demand classes in yoga, pilates, dance and meditation. Book a discovery call.",
      },
      { property: "og:title", content: "Movara — Move with grace. Live with vitality." },
      {
        property: "og:description",
        content: "Premium global wellness, movement & transformation programs led by world-class instructors.",
      },
    ],
  }),
  component: HomePage,
});

// Backend-ready placeholder content (would be wired to real APIs later).
const SERVICES: ServiceSummary[] = [
  {
    id: "1",
    slug: "vinyasa-yoga",
    title: "Vinyasa Flow",
    tagline: "Breath-led movement that builds grace and stamina.",
    category: "Yoga",
    accent: "mint",
    intensity: "Balanced",
    durationLabel: "45–60 min",
    imageUrl: yogaImg,
  },
  {
    id: "2",
    slug: "reformer-pilates",
    title: "Reformer Pilates",
    tagline: "Sculpt deep core strength with precision and control.",
    category: "Pilates",
    accent: "coral",
    intensity: "Strong",
    durationLabel: "50 min",
    imageUrl: pilatesImg,
  },
  {
    id: "3",
    slug: "movement-dance",
    title: "Movement & Dance",
    tagline: "Express, release, and reclaim your confidence.",
    category: "Dance",
    accent: "peach",
    intensity: "Balanced",
    durationLabel: "45 min",
    imageUrl: danceImg,
  },
  {
    id: "4",
    slug: "meditation",
    title: "Stillness & Meditation",
    tagline: "Train a calmer mind in just twelve minutes a day.",
    category: "Mindfulness",
    accent: "sky",
    intensity: "Gentle",
    durationLabel: "12–20 min",
    imageUrl: meditationImg,
  },
];

const PRICING: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceLabel: "$29",
    cadenceLabel: "/ month",
    description: "Begin your practice with on-demand library access.",
    features: ["Unlimited on-demand classes", "Beginner-friendly tracks", "Mobile & TV apps"],
    ctaLabel: "Start Starter",
  },
  {
    id: "live",
    name: "Live Studio",
    priceLabel: "$59",
    cadenceLabel: "/ month",
    description: "Practice live with our instructors, every day of the week.",
    features: [
      "Everything in Starter",
      "60+ live classes / week",
      "Small-group studio batches",
      "Personalized weekly plan",
    ],
    highlighted: true,
    ctaLabel: "Join Live Studio",
  },
  {
    id: "transform",
    name: "Transform",
    priceLabel: "$129",
    cadenceLabel: "/ month",
    description: "1:1 coaching, accountability, and personal programming.",
    features: [
      "Everything in Live Studio",
      "1:1 coaching session monthly",
      "Custom transformation plan",
      "Direct chat with instructor",
    ],
    ctaLabel: "Apply for Transform",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Aanya Mehta",
    role: "Member · Singapore",
    quote: "Six months in, my back pain is gone and I move with a confidence I didn't know I had.",
    avatarUrl: t1,
    rating: 5,
  },
  {
    id: "2",
    name: "Sofía Reyes",
    role: "Member · Madrid",
    quote: "It feels less like a class and more like a community that genuinely roots for you.",
    avatarUrl: t2,
    rating: 5,
  },
  {
    id: "3",
    name: "Imani Carter",
    role: "Member · Brooklyn",
    quote: "Movara made movement feel joyful again. I actually look forward to my morning practice.",
    avatarUrl: t3,
    rating: 5,
  },
];

const FAQS: FaqItem[] = [
  {
    id: "1",
    question: "I'm a complete beginner — is Movara still right for me?",
    answer:
      "Absolutely. Many of our members start from zero. Every program has a beginner track, and your discovery call helps us match you with the right instructor and intensity from day one.",
  },
  {
    id: "2",
    question: "How do live classes work across time zones?",
    answer:
      "Our schedule runs 24/7 across global studios, so you can find live sessions that fit your morning, lunch break, or wind-down — wherever you are in the world.",
  },
  {
    id: "3",
    question: "What's a Discovery Call?",
    answer:
      "A free 20-minute conversation with a Movara coach. We learn about your body, your goals, and your schedule, then recommend the right plan and instructor — no pressure to commit.",
  },
  {
    id: "4",
    question: "Can I cancel any time?",
    answer:
      "Yes. All memberships are month-to-month. Pause or cancel from your account in two clicks.",
  },
];

const WHY = [
  { icon: HeartPulse, title: "Body-first programming", desc: "Built around how you actually feel — not how hard you can push." },
  { icon: Globe, title: "Global community", desc: "12,000+ women practicing together across 40+ countries." },
  { icon: Sparkles, title: "World-class instructors", desc: "Trained, certified, and chosen for the way they make you feel." },
  { icon: ShieldCheck, title: "Trusted & safe", desc: "Modifications for every body. Real coaching, not just a video player." },
];

function HomePage() {
  return (
    <SiteLayout>
      <Hero />

      {/* Featured services */}
      <section className="container-x py-24 md:py-32">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="Practices"
            title={<>A practice for every <em className="italic text-[var(--coral)]">version of you</em>.</>}
            description="From deep-strength pilates to slow, restorative breath work — find a way to move that meets your body where it is today."
          />
          <Button asChild variant="outline" size="lg">
            <Link to="/services">
              All services <ArrowUpRight />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Why Movara - asymmetric image+features */}
      <section className="bg-[var(--peach)]/30 py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5">
            <div className="overflow-hidden rounded-[2rem] shadow-elegant">
              <img
                src={whyImg}
                alt="Dancer at the barre"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-background p-5 shadow-elegant md:block">
              <p className="font-display text-3xl tracking-tight">94%</p>
              <p className="text-xs uppercase tracking-wider text-foreground/55">Feel stronger in 30 days</p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-8">
            <SectionHeading
              eyebrow="Why Movara"
              title={<>Premium support, <em className="italic text-[var(--coral)]">designed for real life</em>.</>}
              description="Most fitness platforms hand you a video and walk away. Movara stays — with live classes, real instructors, and a community that knows your name."
            />

            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {WHY.map((w) => (
                <li key={w.title} className="rounded-2xl bg-background p-6 shadow-soft">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-warm text-foreground">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl tracking-tight">{w.title}</h3>
                  <p className="mt-1 text-sm text-foreground/65">{w.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading
          eyebrow="Plans"
          align="center"
          title={<>Simple plans. <em className="italic text-[var(--coral)]">Real transformation.</em></>}
          description="Choose the depth of support you need. Cancel any time."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PRICING.map((p) => (
            <PricingCard key={p.id} plan={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="link" size="lg">
            <Link to="/pricing">
              See full plan comparison <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-foreground/[0.02] py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Voices"
            title={<>Loved by women <em className="italic text-[var(--coral)]">across 40+ countries</em>.</>}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <TestimonialCard t={TESTIMONIALS[0]} accent="ivory" />
            <TestimonialCard t={TESTIMONIALS[1]} accent="peach" />
            <TestimonialCard t={TESTIMONIALS[2]} accent="mint" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="Questions"
            title={<>Good questions, <em className="italic text-[var(--coral)]">answered honestly.</em></>}
            description="Still curious? A 20-minute discovery call clears up everything."
          />
          <FaqList items={FAQS} />
        </div>
      </section>

      <FinalCta />
    </SiteLayout>
  );
}
