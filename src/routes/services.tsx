import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { FinalCta } from "@/components/site/FinalCta";
import type { ServiceSummary } from "@/components/site/types";
import yogaImg from "@/assets/service-yoga.jpg";
import pilatesImg from "@/assets/service-pilates.jpg";
import danceImg from "@/assets/service-dance.jpg";
import meditationImg from "@/assets/service-meditation.jpg";
import groupImg from "@/assets/group-yoga.jpg";
import studioImg from "@/assets/studio-interior.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Movara" },
      {
        name: "description",
        content:
          "Explore Movara's full range of yoga, pilates, dance, meditation and transformation programs.",
      },
      { property: "og:title", content: "Services — Movara" },
      {
        property: "og:description",
        content: "Yoga, Pilates, Dance, Meditation and 1:1 transformation — designed by world-class instructors.",
      },
    ],
  }),
  component: ServicesPage,
});

const ALL_SERVICES: ServiceSummary[] = [
  { id: "1", slug: "vinyasa-yoga", title: "Vinyasa Flow", tagline: "Breath-led movement.", category: "Yoga", accent: "mint", intensity: "Balanced", durationLabel: "45–60 min", imageUrl: yogaImg },
  { id: "2", slug: "reformer-pilates", title: "Reformer Pilates", tagline: "Deep core strength.", category: "Pilates", accent: "coral", intensity: "Strong", durationLabel: "50 min", imageUrl: pilatesImg },
  { id: "3", slug: "movement-dance", title: "Movement & Dance", tagline: "Express and release.", category: "Dance", accent: "peach", intensity: "Balanced", durationLabel: "45 min", imageUrl: danceImg },
  { id: "4", slug: "meditation", title: "Stillness & Meditation", tagline: "A calmer, clearer mind.", category: "Mindfulness", accent: "sky", intensity: "Gentle", durationLabel: "12–20 min", imageUrl: meditationImg },
  { id: "5", slug: "barre", title: "Barre Sculpt", tagline: "Long, lean, lifted.", category: "Barre", accent: "gold", intensity: "Balanced", durationLabel: "45 min", imageUrl: studioImg },
  { id: "6", slug: "prenatal", title: "Prenatal Care", tagline: "Strong through every trimester.", category: "Specialty", accent: "peach", intensity: "Gentle", durationLabel: "30–40 min", imageUrl: groupImg },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="container-x py-12 md:py-20">
        <SectionHeading
          eyebrow="Our practices"
          title={<>Everything Movara <em className="italic text-[var(--coral)]">teaches</em>.</>}
          description="Six core practices, dozens of formats, one philosophy: movement should make you feel more like yourself."
        />
      </section>

      <section className="container-x pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ALL_SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} size="lg" />
          ))}
        </div>
      </section>

      <FinalCta />
    </SiteLayout>
  );
}
