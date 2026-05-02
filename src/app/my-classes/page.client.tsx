"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  Flame,
  PlayCircle,
  Trophy,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteLayout } from "@/components/site/SiteLayout";
import type { SiteSettings } from "@/lib/api";
import { lookupMyClasses } from "@/lib/api";
import { imageForService } from "@/lib/media";
import { cn } from "@/lib/utils";
import yogaImg from "@/assets/service-yoga.jpg";

type LookupEnrollment = Awaited<ReturnType<typeof lookupMyClasses>>["data"]["enrollments"][number];

const TABS = ["Upcoming", "Completed", "All"] as const;
const STATS = [
  { icon: Flame, label: "Ready to join", kind: "access-ready" as const },
  { icon: BookOpen, label: "Total enrollments", kind: "all" as const },
  { icon: Trophy, label: "Completed", kind: "completed" as const },
];

function formatDateTime(date: string, time: string) {
  try {
    const safeTime = time?.trim();
    const match = safeTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return `${date} · ${time}`;
    let hours = Number(match[1]);
    const minutes = match[2];
    const period = match[3].toUpperCase();
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    const composed = new Date(`${date}T${String(hours).padStart(2, "0")}:${minutes}:00`);
    return composed.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return `${date} · ${time}`;
  }
}

function statusLabel(enrollment: LookupEnrollment) {
  if (enrollment.status === "completed" || enrollment.attendance_status === "attended")
    return "completed";
  if (enrollment.status === "waitlisted") return "waitlisted";
  if (enrollment.status === "cancelled") return "cancelled";
  if (enrollment.access_ready) return "ready";
  if (enrollment.payment_status === "pending") return "pending payment";
  return enrollment.status.replace("_", " ");
}

function statusClasses(enrollment: LookupEnrollment) {
  if (enrollment.status === "completed" || enrollment.attendance_status === "attended") {
    return "bg-foreground/10 text-foreground/75";
  }
  if (enrollment.status === "waitlisted") return "bg-[var(--gold)]/35 text-foreground";
  if (enrollment.status === "cancelled") return "bg-destructive/10 text-destructive";
  if (enrollment.access_ready) return "bg-[var(--mint)] text-foreground";
  return "bg-[var(--coral)] text-[var(--coral-foreground)]";
}

export function MyClassesClientPage({ settings }: { settings: SiteSettings }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Upcoming");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lookup, setLookup] = useState({ phone: "", email: "" });
  const [results, setResults] = useState<
    Awaited<ReturnType<typeof lookupMyClasses>>["data"] | null
  >(null);

  const filtered = useMemo(() => {
    const enrollments = results?.enrollments ?? [];
    return enrollments.filter((enrollment) => {
      const completed =
        enrollment.status === "completed" || enrollment.attendance_status === "attended";
      if (tab === "All") return true;
      if (tab === "Completed") return completed;
      return !completed;
    });
  }, [results, tab]);

  const statValues = useMemo(() => {
    const enrollments = results?.enrollments ?? [];
    return {
      "access-ready": enrollments.filter((item) => item.access_ready).length,
      all: enrollments.length,
      completed: enrollments.filter(
        (item) => item.status === "completed" || item.attendance_status === "attended",
      ).length,
    };
  }, [results]);

  async function handleLookup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await lookupMyClasses({
        phone: lookup.phone,
        email: lookup.email || undefined,
      });
      setResults(response.data);
    } catch (lookupError) {
      setResults(null);
      setError(
        lookupError instanceof Error
          ? lookupError.message
          : "We couldn't look up your classes right now.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SiteLayout settings={settings}>
      <section className="container-x py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/55">
              Recover your access
            </span>
            <h1 className="mt-3 font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
              Your practice, available whenever you need it.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground/65">
              Enter the same phone number you used during enrollment and we’ll fetch your upcoming
              classes, join access, and past enrollments.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-card p-5 shadow-soft">
                <stat.icon className="h-5 w-5 text-[var(--coral)]" />
                <p className="mt-3 font-display text-3xl tracking-tight">{statValues[stat.kind]}</p>
                <p className="text-xs uppercase tracking-wider text-foreground/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-8">
        <form
          onSubmit={handleLookup}
          className="rounded-[2rem] border border-foreground/10 bg-card p-6 shadow-soft md:p-8"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div>
              <Label htmlFor="lookup-phone">Phone number</Label>
              <Input
                id="lookup-phone"
                required
                value={lookup.phone}
                onChange={(event) =>
                  setLookup((current) => ({ ...current, phone: event.target.value }))
                }
                className="mt-2 h-12 rounded-2xl"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <Label htmlFor="lookup-email">Email (optional)</Label>
              <Input
                id="lookup-email"
                type="email"
                value={lookup.email}
                onChange={(event) =>
                  setLookup((current) => ({ ...current, email: event.target.value }))
                }
                className="mt-2 h-12 rounded-2xl"
                placeholder="you@example.com"
              />
            </div>
            <Button
              type="submit"
              variant="coral"
              size="xl"
              className="md:min-w-52"
              disabled={isLoading}
            >
              {isLoading ? "Looking up..." : "Find my classes"}
            </Button>
          </div>
          {error ? (
            <div className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}
        </form>
      </section>

      {results ? (
        <>
          <section className="container-x">
            <div className="flex gap-2 border-b border-foreground/10">
              {TABS.map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={cn(
                    "relative -mb-px px-5 py-3 text-sm font-medium transition-colors",
                    tab === item ? "text-foreground" : "text-foreground/50 hover:text-foreground",
                  )}
                >
                  {item}
                  {tab === item ? (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--coral)]" />
                  ) : null}
                </button>
              ))}
            </div>
          </section>

          <section className="container-x py-10">
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-foreground/15 bg-background p-16 text-center">
                <p className="font-display text-2xl tracking-tight">No classes in this view yet.</p>
                <p className="mt-2 text-foreground/60">
                  Try another tab or reserve your next live class.
                </p>
                <Button asChild variant="coral" size="lg" className="mt-6">
                  <Link href="/batches">
                    Browse live classes <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {filtered.map((enrollment) => {
                  const service = enrollment.batch?.services;
                  const imageUrl = service
                    ? imageForService({ slug: service.slug, category: service.name })
                    : yogaImg;
                  return (
                    <li
                      key={enrollment.id}
                      className="grid grid-cols-1 items-center gap-4 rounded-3xl border border-foreground/10 bg-card p-4 shadow-soft transition-all hover:shadow-elegant md:grid-cols-[auto_1fr_auto] md:gap-6 md:p-5"
                    >
                      <div className="relative h-20 w-full overflow-hidden rounded-2xl md:h-20 md:w-28">
                        <img
                          src={typeof imageUrl === "string" ? imageUrl : imageUrl.src}
                          alt={enrollment.batch?.title ?? "Movara class"}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-xl tracking-tight">
                            {enrollment.batch?.title ?? "Movara class"}
                          </h3>
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-medium capitalize",
                              statusClasses(enrollment),
                            )}
                          >
                            {statusLabel(enrollment)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-foreground/65">
                          {service?.name ?? "Movara program"} · with{" "}
                          {enrollment.batch?.instructor_name ?? "Movara coach"}
                        </p>
                        {enrollment.batch ? (
                          <div className="mt-3 flex flex-wrap gap-4 text-sm text-foreground/65">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              {formatDateTime(
                                enrollment.batch.start_date,
                                enrollment.batch.start_time,
                              )}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              {enrollment.batch.meeting_platform}
                            </span>
                          </div>
                        ) : null}
                      </div>
                      <div className="flex flex-col items-start gap-2 md:items-end">
                        <Button
                          asChild
                          variant={enrollment.access_ready ? "coral" : "outline"}
                          size="default"
                        >
                          <Link
                            href={`/enrollments/${enrollment.id}?token=${encodeURIComponent(enrollment.access_token)}`}
                          >
                            {enrollment.access_ready ? (
                              <>
                                <Video className="h-4 w-4" />
                                Open class access
                              </>
                            ) : (
                              <>
                                <PlayCircle className="h-4 w-4" />
                                View enrollment
                              </>
                            )}
                          </Link>
                        </Button>
                        <a
                          href={enrollment.access_path}
                          className="inline-flex items-center gap-1 text-sm text-foreground/55 transition-colors hover:text-foreground"
                        >
                          Copyable access path <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      ) : null}
    </SiteLayout>
  );
}
