import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, Video, ArrowUpRight, Flame, BookOpen, Trophy } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MyClassEntry } from "@/components/site/types";
import yogaImg from "@/assets/service-yoga.jpg";
import pilatesImg from "@/assets/service-pilates.jpg";
import danceImg from "@/assets/service-dance.jpg";
import meditationImg from "@/assets/service-meditation.jpg";

export const Route = createFileRoute("/my-classes")({
  head: () => ({
    meta: [
      { title: "My Classes — Movara" },
      { name: "description", content: "Your upcoming and completed Movara sessions." },
    ],
  }),
  component: MyClassesPage,
});

function inHours(h: number): string {
  const d = new Date();
  d.setHours(d.getHours() + h);
  return d.toISOString();
}

const ENTRIES: MyClassEntry[] = [
  { id: "1", title: "Sunrise Vinyasa", instructor: "Léa Moreau", startsAt: inHours(5), durationMin: 50, status: "upcoming", joinUrl: "#", imageUrl: yogaImg },
  { id: "2", title: "Reformer Strength", instructor: "Camila Ríos", startsAt: inHours(28), durationMin: 50, status: "upcoming", joinUrl: "#", imageUrl: pilatesImg },
  { id: "3", title: "Free-Flow Movement", instructor: "Naomi Park", startsAt: inHours(-26), durationMin: 45, status: "completed", imageUrl: danceImg },
  { id: "4", title: "Evening Stillness", instructor: "Anya Kapoor", startsAt: inHours(-50), durationMin: 20, status: "completed", imageUrl: meditationImg },
];

const STATS = [
  { icon: Flame, value: "12", label: "Day streak" },
  { icon: BookOpen, value: "38", label: "Classes done" },
  { icon: Trophy, value: "4", label: "Programs completed" },
];

const TABS = ["Upcoming", "Completed", "All"] as const;

function fmtTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  } catch { return iso; }
}

function StatusBadge({ status }: { status: MyClassEntry["status"] }) {
  const map: Record<MyClassEntry["status"], string> = {
    upcoming: "bg-[var(--mint)] text-foreground",
    live: "bg-[var(--coral)] text-[var(--coral-foreground)]",
    completed: "bg-foreground/10 text-foreground/70",
    cancelled: "bg-destructive/10 text-destructive",
  };
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-medium capitalize", map[status])}>
      {status}
    </span>
  );
}

function MyClassesPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Upcoming");
  const filtered = ENTRIES.filter((e) =>
    tab === "All"
      ? true
      : tab === "Upcoming"
        ? e.status === "upcoming" || e.status === "live"
        : e.status === "completed",
  );

  return (
    <SiteLayout>
      {/* Header */}
      <section className="container-x py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/55">
              Welcome back
            </span>
            <h1 className="mt-3 font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
              Your practice, <em className="italic text-[var(--coral)]">in motion</em>.
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl bg-card p-5 shadow-soft">
                <s.icon className="h-5 w-5 text-[var(--coral)]" />
                <p className="mt-3 font-display text-3xl tracking-tight">{s.value}</p>
                <p className="text-xs uppercase tracking-wider text-foreground/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container-x">
        <div className="flex gap-2 border-b border-foreground/10">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative -mb-px px-5 py-3 text-sm font-medium transition-colors",
                tab === t ? "text-foreground" : "text-foreground/50 hover:text-foreground",
              )}
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--coral)]" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* List */}
      <section className="container-x py-10">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-foreground/15 bg-background p-16 text-center">
            <p className="font-display text-2xl tracking-tight">Nothing here yet.</p>
            <p className="mt-2 text-foreground/60">Reserve your next live class to get started.</p>
            <Button asChild variant="coral" size="lg" className="mt-6">
              <Link to="/batches">Browse Live Classes <ArrowUpRight /></Link>
            </Button>
          </div>
        ) : (
          <ul className="space-y-4">
            {filtered.map((e) => (
              <li
                key={e.id}
                className="grid grid-cols-1 items-center gap-4 rounded-3xl border border-foreground/10 bg-card p-4 shadow-soft transition-all hover:shadow-elegant md:grid-cols-[auto_1fr_auto_auto] md:gap-6 md:p-5"
              >
                <div className="relative h-20 w-full overflow-hidden rounded-2xl md:h-20 md:w-28">
                  <img
                    src={e.imageUrl}
                    alt={e.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl tracking-tight">{e.title}</h3>
                    <StatusBadge status={e.status} />
                  </div>
                  <p className="text-sm text-foreground/65">with {e.instructor}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-foreground/65">
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {fmtTime(e.startsAt)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {e.durationMin} min</span>
                </div>
                <div className="flex justify-end">
                  {e.status === "upcoming" && (
                    <Button variant="default" size="default">
                      <Video className="h-4 w-4" /> Join
                    </Button>
                  )}
                  {e.status === "completed" && (
                    <Button variant="outline" size="default">Replay</Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </SiteLayout>
  );
}
