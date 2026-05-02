import Link from "next/link";
import { ArrowUpRight, Globe, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { PricingCard } from "@/components/site/PricingCard";
import { FaqList } from "@/components/site/FaqList";
import { FinalCta } from "@/components/site/FinalCta";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { Button } from "@/components/ui/button";
import { getHomepage, getSiteSettings } from "@/lib/api";
import { mapPricingPlan, mapServiceSummary, mapTestimonial } from "@/lib/media";
import whyImg from "@/assets/why-choose.jpg";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [homepageState, siteSettingsState] = await Promise.all([getHomepage(), getSiteSettings()]);

  const homepage = homepageState.data;
  const settings = siteSettingsState.data;
  const services = homepage.featured_services.map(mapServiceSummary);
  const pricing = homepage.pricing_preview.plans.map(mapPricingPlan);
  const testimonials = homepage.testimonials.slice(0, 3).map(mapTestimonial);

  const whyItems = homepage.why_choose_us.items.map((item, index) => ({
    ...item,
    icon: [HeartPulse, Globe, Sparkles, ShieldCheck][index % 4],
  }));

  return (
    <SiteLayout settings={settings}>
      <Hero
        badge={homepage.hero.badge_text}
        title={homepage.hero.title}
        highlight={homepage.hero.secondary_cta_label || "Live with vitality."}
        subtitle={homepage.hero.subtitle}
        primaryCta={{
          label: homepage.hero.secondary_cta_label || "Book a Discovery Call",
          to: homepage.hero.secondary_cta_href || "/contact",
        }}
        secondaryCta={{
          label: homepage.hero.primary_cta_label || "Explore Classes",
          to: homepage.hero.primary_cta_href || "/pricing",
        }}
        stats={homepage.hero.stats}
      />

      <Marquee variant="dark" />

      <section className="container-x py-24 md:py-32">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="The Practice"
            title={
              <>
                A practice for every <em className="italic text-[var(--coral)]">version of you</em>.
              </>
            }
            description="Every featured path comes from the backend and is mapped into a visual experience that helps the right person find the right next step."
          />
          <Button asChild variant="outline" size="lg">
            <Link href="/services">
              All services <ArrowUpRight />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} size="lg" />
          ))}
        </div>
      </section>

      <section className="bg-[var(--peach)]/30 py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5">
            <div className="overflow-hidden rounded-[2rem] shadow-elegant">
              <img
                src={whyImg.src}
                alt="Graceful movement practice in studio light"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-background p-5 shadow-elegant md:block">
              <p className="font-display text-3xl tracking-tight">
                {homepage.hero.stats[0]?.value ?? "Global"}
              </p>
              <p className="text-xs uppercase tracking-wider text-foreground/55">
                {homepage.hero.stats[0]?.label ?? "Movement support"}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-8">
            <SectionHeading
              eyebrow={homepage.why_choose_us.title}
              title={
                <>
                  Premium support,{" "}
                  <em className="italic text-[var(--coral)]">designed for real life</em>.
                </>
              }
              description={homepage.why_choose_us.subtitle}
            />

            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {whyItems.map((item) => (
                <li key={item.title} className="rounded-2xl bg-background p-6 shadow-soft">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-warm text-foreground">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl tracking-tight">{item.title}</h3>
                  <p className="mt-1 text-sm text-foreground/65">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <SectionHeading
          eyebrow={homepage.pricing_preview.title}
          align="center"
          title={
            <>
              Choose the depth of <em className="italic text-[var(--coral)]">support you need</em>.
            </>
          }
          description={homepage.pricing_preview.subtitle}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricing.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <SectionHeading
            eyebrow="Testimonials"
            title="Clients remember how supported they felt."
            description="Real backend testimonials, translated into a richer trust layer so the site feels more human and less like a static brochure."
          />
          <div className="rounded-[1.95rem] border border-foreground/8 bg-background/80 p-6 text-sm leading-7 text-muted-foreground shadow-soft">
            Confidence, consistency, and a sense of being seen are as important as the classes
            themselves.
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              t={testimonial}
              accent={index === 1 ? "peach" : index === 2 ? "mint" : "ivory"}
            />
          ))}
        </div>
      </section>

      <section className="container-x py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading eyebrow="Frequently Asked" title="Honest answers." />
          <FaqList
            items={homepage.faqs.map((item) => ({
              id: item.id,
              question: item.question,
              answer: item.answer,
            }))}
          />
        </div>
      </section>

      <FinalCta
        eyebrow="Your first step"
        title={homepage.final_cta.title}
        description={homepage.final_cta.text}
        ctaLabel={homepage.final_cta.primary_label}
        to={homepage.final_cta.primary_href}
      />
    </SiteLayout>
  );
}
