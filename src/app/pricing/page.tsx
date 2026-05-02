import { FaqList } from "@/components/site/FaqList";
import { FinalCta } from "@/components/site/FinalCta";
import { PricingCard } from "@/components/site/PricingCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getFaqs, getPricing, getSiteSettings } from "@/lib/api";
import { mapPricingPlan } from "@/lib/media";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const [pricingState, faqState, settingsState] = await Promise.all([
    getPricing(),
    getFaqs(),
    getSiteSettings(),
  ]);

  const pricing = pricingState.data.map(mapPricingPlan);
  const faqs = faqState.data;
  const settings = settingsState.data;

  return (
    <SiteLayout settings={settings}>
      <section className="container-x py-12 md:py-20">
        <SectionHeading
          eyebrow={settings.pricing_preview_title ?? "Plans"}
          align="center"
          title={
            <>
              Choose the depth of <em className="italic text-[var(--coral)]">support you need</em>.
            </>
          }
          description={
            settings.pricing_preview_subtitle ??
            "Simple, transparent plans built around how much guidance and structure you want."
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricing.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      <section className="container-x py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading eyebrow="Pricing FAQ" title="Honest answers." />
          <FaqList
            items={faqs.map((item) => ({
              id: item.id,
              question: item.question,
              answer: item.answer,
            }))}
          />
        </div>
      </section>

      <FinalCta
        eyebrow="Still unsure?"
        title="Let’s talk before you commit to a plan."
        description="A discovery call is the best way to choose the right level of structure, coaching, and class style."
      />
    </SiteLayout>
  );
}
