import { FinalCta } from "@/components/site/FinalCta";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getServices, getSiteSettings } from "@/lib/api";
import { mapServiceSummary } from "@/lib/media";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [servicesState, settingsState] = await Promise.all([getServices(), getSiteSettings()]);
  const services = servicesState.data.map(mapServiceSummary);
  const settings = settingsState.data;

  return (
    <SiteLayout settings={settings}>
      <section className="container-x py-12 md:py-20">
        <SectionHeading
          eyebrow="Our practices"
          title={
            <>
              Everything Movara <em className="italic text-[var(--coral)]">guides</em>.
            </>
          }
          description="These services come directly from the backend and are shaped into a more visual browsing flow so people can discover the right path without reading a wall of copy."
        />
      </section>

      <section className="container-x pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} size="lg" />
          ))}
        </div>
      </section>

      <FinalCta
        eyebrow="Need help choosing?"
        title="A discovery call turns options into a clear next step."
        description="Tell us how you want to feel, what season of life you are in, and how much support you want. We’ll help you choose beautifully."
      />
    </SiteLayout>
  );
}
