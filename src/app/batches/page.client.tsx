"use client";

import { useMemo, useState } from "react";
import { BatchCard } from "@/components/site/BatchCard";
import { FinalCta } from "@/components/site/FinalCta";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import type { ClassBatch, SiteSettings } from "@/lib/api";
import { mapBatch } from "@/lib/media";
import { cn } from "@/lib/utils";

export function BatchesClientPage({
  batches,
  settings,
}: {
  batches: ClassBatch[];
  settings: SiteSettings;
}) {
  const mapped = batches.map(mapBatch);
  const filters = useMemo(
    () => ["All", ...new Set(mapped.map((batch) => batch.category))],
    [mapped],
  );
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(
    () => (filter === "All" ? mapped : mapped.filter((batch) => batch.category === filter)),
    [filter, mapped],
  );

  return (
    <SiteLayout settings={settings}>
      <section className="container-x py-12 md:py-20">
        <SectionHeading
          eyebrow="This week · Live"
          title={
            <>
              Practice live with <em className="italic text-[var(--coral)]">a real teacher</em>.
            </>
          }
          description="These batches come directly from the backend, with real schedules, instructors, and seat counts. The UI is shaped to make live classes feel exciting and easy to scan."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                filter === item
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/15 bg-background text-foreground/70 hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((batch) => (
            <BatchCard key={batch.id} b={batch} />
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-foreground/55">
            No live sessions in this category right now.
          </p>
        ) : null}
      </section>

      <FinalCta
        eyebrow="Not sure which class?"
        title="Let’s match you with the right live batch."
        description="A discovery call helps us recommend the best format, time, and instructor before you enroll."
      />
    </SiteLayout>
  );
}
