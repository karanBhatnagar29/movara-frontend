import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  LockKeyhole,
  Mail,
  Phone,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getEnrollmentAccess, getSiteSettings } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function EnrollmentAccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const [{ id }, { token }, settingsState] = await Promise.all([
    params,
    searchParams,
    getSiteSettings(),
  ]);
  const settings = settingsState.data;

  if (!token) {
    return (
      <SiteLayout settings={settings}>
        <section className="container-x py-16 md:py-24">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-foreground/10 bg-card p-8 text-center shadow-soft md:p-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--mint)]">
              <LockKeyhole className="h-6 w-6" />
            </span>
            <h1 className="mt-6 font-display text-4xl tracking-tight md:text-5xl">
              This access link is incomplete.
            </h1>
            <p className="mt-4 text-foreground/65">
              Open the full enrollment link from your email, WhatsApp message, or your My Classes
              lookup so we can verify your secure token.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="coral" size="lg">
                <Link href="/my-classes">
                  Find my classes <ArrowUpRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Talk to Movara</Link>
              </Button>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  try {
    const accessState = await getEnrollmentAccess(id, token);
    const access = accessState.data;
    const batch = access.batch;
    const lead = access.lead;
    const paymentPending = access.payment_status === "pending";
    const waitlisted = access.status === "waitlisted";
    const cancelled = access.status === "cancelled";

    return (
      <SiteLayout settings={settings}>
        <section className="container-x py-12 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2.25rem] bg-gradient-ocean p-8 text-ivory shadow-elegant md:p-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Enrollment status
              </span>
              <h1 className="mt-6 font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
                {batch?.title ?? "Your Movara class"} is being held for you.
              </h1>
              <p className="mt-5 max-w-2xl text-ivory/80 md:text-lg">{access.join_message}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {access.access_ready && access.join_link ? (
                  <Button asChild variant="ivory" size="xl">
                    <a href={access.join_link} target="_blank" rel="noreferrer">
                      Join class <ExternalLink />
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="ivory" size="xl">
                    <Link href="/contact">
                      Talk to support <ArrowUpRight />
                    </Link>
                  </Button>
                )}
                <Button asChild variant="soft" size="xl" className="text-ivory">
                  <Link href="/my-classes">Back to My Classes</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-foreground/10 bg-card p-6 shadow-soft md:p-8">
              <h2 className="font-display text-2xl tracking-tight">What happens next</h2>
              <ul className="mt-5 space-y-4 text-sm text-foreground/70">
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--coral)]" />
                  We may update you by email or WhatsApp as payment and access status changes.
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--coral)]" />
                  This page is your secure source of truth for join access and enrollment progress.
                </li>
                <li className="flex gap-3">
                  <Video className="mt-0.5 h-4 w-4 shrink-0 text-[var(--coral)]" />
                  Once access is granted and a meeting link exists for the batch, your class link
                  appears here automatically.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container-x pb-24">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-foreground/10 bg-card p-6 shadow-soft md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-3xl tracking-tight">Enrollment details</h2>
                <span className="rounded-full bg-foreground/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground/60">
                  {access.status.replace("_", " ")} · {access.payment_status}
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-background p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/45">
                    Batch
                  </p>
                  <p className="mt-2 font-display text-2xl tracking-tight">
                    {batch?.title ?? "Pending batch"}
                  </p>
                  <p className="mt-1 text-sm text-foreground/65">
                    with {batch?.instructor_name ?? "Movara coach"}
                  </p>
                </div>
                <div className="rounded-2xl bg-background p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/45">
                    Student
                  </p>
                  <p className="mt-2 font-display text-2xl tracking-tight">
                    {lead?.full_name ?? "Movara student"}
                  </p>
                  <p className="mt-1 text-sm text-foreground/65">
                    {lead?.email ?? lead?.phone ?? "We’ll stay in touch here."}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl border border-foreground/10 p-4">
                  <Calendar className="h-4 w-4 text-[var(--coral)]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">
                      Start date
                    </p>
                    <p className="text-sm text-foreground/75">
                      {batch?.start_date ?? "To be confirmed"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-foreground/10 p-4">
                  <Clock className="h-4 w-4 text-[var(--coral)]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">Time</p>
                    <p className="text-sm text-foreground/75">
                      {batch ? `${batch.start_time} · ${batch.timezone}` : "To be confirmed"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-foreground/10 bg-card p-6 shadow-soft md:p-8">
              <h2 className="font-display text-3xl tracking-tight">Access state</h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-background p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/45">
                    Payment
                  </p>
                  <p className="mt-2 text-lg text-foreground/80">
                    {paymentPending
                      ? "Waiting for payment confirmation"
                      : `Marked ${access.payment_status}`}
                  </p>
                </div>
                <div className="rounded-2xl bg-background p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/45">
                    Seat reservation
                  </p>
                  <p className="mt-2 text-lg text-foreground/80">
                    {access.seat_reserved
                      ? "Your seat is reserved"
                      : waitlisted
                        ? "You are currently waitlisted"
                        : "Seat will be reserved after confirmation"}
                  </p>
                </div>
                <div className="rounded-2xl bg-background p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/45">
                    Join access
                  </p>
                  <p className="mt-2 text-lg text-foreground/80">
                    {access.access_ready
                      ? "Your join link is ready below"
                      : cancelled
                        ? "This enrollment is cancelled"
                        : "Join access will unlock here once it is approved"}
                  </p>
                </div>
              </div>

              {access.access_ready && access.join_link ? (
                <Button asChild variant="coral" size="xl" className="mt-6 w-full">
                  <a href={access.join_link} target="_blank" rel="noreferrer">
                    Open class link <ExternalLink />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  } catch {
    notFound();
  }
}
