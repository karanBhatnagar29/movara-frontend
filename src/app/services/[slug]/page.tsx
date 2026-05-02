import Link from "next/link";
import { notFound } from "next/navigation";
import { Activity, ArrowUpRight, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/site/FinalCta";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getServiceBySlug, getSiteSettings } from "@/lib/api";
import { mapBatch, mapServiceDetail } from "@/lib/media";

export const dynamic = "force-dynamic";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const [serviceState, settingsState] = await Promise.all([
      getServiceBySlug(slug),
      getSiteSettings(),
    ]);

    const service = serviceState.data;
    const settings = settingsState.data;
    const detail = mapServiceDetail(service);
    const liveBatch = service.class_batches[0] ? mapBatch(service.class_batches[0]) : null;

    return (
      <SiteLayout settings={settings}>
        <section className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-20">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--coral)]" />
              {service.category}
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight text-balance md:text-7xl">
              {service.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-foreground/70 text-pretty">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2 text-sm">
                <Clock className="h-4 w-4 text-[var(--coral)]" /> {service.delivery_mode}
              </div>
              <div className="flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2 text-sm">
                <Activity className="h-4 w-4 text-[var(--coral)]" /> {detail.intensity} intensity
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="coral" size="xl" className="group">
                <Link href="/contact">
                  Book a Discovery Call{" "}
                  <ArrowUpRight className="transition-transform group-hover:rotate-45" />
                </Link>
              </Button>
              {liveBatch ? (
                <Button asChild variant="outline" size="xl">
                  <Link href={`/enroll/${liveBatch.id}`}>Join live batch</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" size="xl">
                  <Link href="/batches">View live schedule</Link>
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[2rem] shadow-elegant">
              <img
                src={typeof detail.imageUrl === "string" ? detail.imageUrl : detail.imageUrl.src}
                alt={service.name}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="container-x py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {detail.highlights.map((item) => (
              <div key={item.title} className="rounded-3xl bg-card p-7 shadow-soft">
                <h3 className="font-display text-xl tracking-tight">{item.title}</h3>
                <p className="mt-2 text-foreground/65">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-x grid gap-12 py-16 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">What you'll feel.</h2>
            <ul className="mt-8 space-y-4">
              {detail.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-lg">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--mint)]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/80">{outcome}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {detail.galleryUrls.slice(0, 2).map((imageUrl) => (
                <img
                  key={typeof imageUrl === "string" ? imageUrl : imageUrl.src}
                  src={typeof imageUrl === "string" ? imageUrl : imageUrl.src}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-3xl object-cover"
                />
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-gradient-ocean p-8 text-ivory shadow-elegant">
              <p className="text-sm uppercase tracking-[0.18em] text-ivory/65">Support path</p>
              <p className="mt-3 font-display text-3xl leading-tight">
                {service.pricing_plans.length > 0
                  ? `${service.pricing_plans.length} pricing option${service.pricing_plans.length > 1 ? "s" : ""}`
                  : "Talk to a coach for 20 minutes."}
              </p>
              <p className="mt-3 text-ivory/80">
                {liveBatch
                  ? `${liveBatch.title} starts soon and is the clearest next live option for this service.`
                  : "We’ll help you choose the right format, timeline, and instructor for your goals."}
              </p>
              <Button asChild variant="coral" size="lg" className="mt-6 w-full group">
                <Link href="/contact">
                  Book a Discovery Call{" "}
                  <ArrowUpRight className="transition-transform group-hover:rotate-45" />
                </Link>
              </Button>
            </div>
          </aside>
        </section>

        <FinalCta
          eyebrow="Your next step"
          title="Talk to Movara before you commit."
          description="If the program fits, we’ll guide you into the right plan or live batch with real clarity."
        />
      </SiteLayout>
    );
  } catch {
    notFound();
  }
}
