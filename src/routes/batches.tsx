import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BatchCard } from "@/components/site/BatchCard";
import { FinalCta } from "@/components/site/FinalCta";
import type { BatchSession } from "@/components/site/types";
import yogaImg from "@/assets/service-yoga.jpg";
import pilatesImg from "@/assets/service-pilates.jpg";
import danceImg from "@/assets/service-dance.jpg";
import meditationImg from "@/assets/service-meditation.jpg";
import groupImg from "@/assets/group-yoga.jpg";
import studioImg from "@/assets/studio-interior.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/batches")({
  head: () => ({
    meta: [
      { title: "Live Classes — Movara" },
      { name: "description", content: "See this week's live class schedule and reserve your seat." },
      { property: "og:title", content: "Live Classes — Movara" },
      { property: "og:description", content: "Practice live with world-class instructors, across global time zones." },
    ],
  }),
  component: BatchesPage,
});

function inDays(days: number, h: number, m = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

const BATCHES: BatchSession[] = [
  { id: "1", title: "Sunrise Vinyasa", instructor: "Léa Moreau", category: "Yoga", level: "All levels", startsAt: inDays(1, 7), durationMin: 50, seatsTotal: 24, seatsTaken: 18, imageUrl: yogaImg, accent: "mint" },
  { id: "2", title: "Reformer Strength", instructor: "Camila Ríos", category: "Pilates", level: "Intermediate", startsAt: inDays(1, 18), durationMin: 50, seatsTotal: 12, seatsTaken: 11, imageUrl: pilatesImg, accent: "coral" },
  { id: "3", title: "Free-Flow Movement", instructor: "Naomi Park", category: "Dance", level: "All levels", startsAt: inDays(2, 19), durationMin: 45, seatsTotal: 30, seatsTaken: 14, imageUrl: danceImg, accent: "peach" },
  { id: "4", title: "Evening Stillness", instructor: "Anya Kapoor", category: "Meditation", level: "Beginner", startsAt: inDays(2, 21), durationMin: 20, seatsTotal: 60, seatsTaken: 22, imageUrl: meditationImg, accent: "sky" },
  { id: "5", title: "Barre Sculpt 45", instructor: "Imani Carter", category: "Barre", level: "All levels", startsAt: inDays(3, 8), durationMin: 45, seatsTotal: 20, seatsTaken: 9, imageUrl: studioImg, accent: "gold" },
  { id: "6", title: "Prenatal Flow", instructor: "Sofía Reyes", category: "Specialty", level: "Beginner", startsAt: inDays(3, 11), durationMin: 35, seatsTotal: 15, seatsTaken: 6, imageUrl: groupImg, accent: "peach" },
];

const FILTERS = ["All", "Yoga", "Pilates", "Dance", "Meditation", "Barre", "Specialty"] as const;

function BatchesPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const filtered = useMemo(
    () => (filter === "All" ? BATCHES : BATCHES.filter((b) => b.category === filter)),
    [filter],
  );

  return (
    <SiteLayout>
      <section className="container-x py-12 md:py-20">
        <SectionHeading
          eyebrow="This week · Live"
          title={<>Practice live with <em className="italic text-[var(--coral)]">a real teacher</em>.</>}
          description="Small-group sessions across global time zones. Reserve a seat — your practice begins together."
        />

        {/* Filter chips */}
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                filter === f
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/15 bg-background text-foreground/70 hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <BatchCard key={b.id} b={b} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-20 text-center text-foreground/55">No live sessions in this category right now.</p>
        )}
      </section>

      <FinalCta
        eyebrow="Not sure which class?"
        title="Let's match you with the right batch."
        description="A 20-minute discovery call helps us recommend the perfect class, time and instructor."
      />
    </SiteLayout>
  );
}
