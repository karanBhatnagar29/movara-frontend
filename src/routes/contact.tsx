import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Calendar, Clock, ShieldCheck, Sparkles, ArrowUpRight, Phone, Mail } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import studioImg from "@/assets/studio-interior.jpg";
import t1 from "@/assets/testimonial-1.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Discovery Call — Movara" },
      { name: "description", content: "Talk to a Movara coach for 20 minutes — free, no pressure." },
      { property: "og:title", content: "Book a Discovery Call — Movara" },
      { property: "og:description", content: "A 20-minute conversation to find the right practice for you." },
    ],
  }),
  component: ContactPage,
});

const TIMES = ["09:00", "10:30", "13:00", "15:00", "17:30", "19:00"];
const REASSURANCES = [
  { icon: Clock, text: "Just 20 minutes" },
  { icon: ShieldCheck, text: "No pressure to commit" },
  { icon: Sparkles, text: "Personalised plan suggestion" },
];

function ContactPage() {
  const [time, setTime] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <SiteLayout>
      <section className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:gap-16 lg:py-20">
        {/* Left: atmosphere + reassurance */}
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--coral)]" />
            Discovery Call
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight text-balance md:text-6xl">
            A quiet conversation about <em className="italic text-[var(--coral)]">how you want to move</em>.
          </h1>
          <p className="mt-6 max-w-md text-lg text-foreground/70 text-pretty">
            We'll listen. We'll ask the right questions. And then we'll suggest the practice and instructor that actually fits your life.
          </p>

          <ul className="mt-8 space-y-3">
            {REASSURANCES.map((r) => (
              <li key={r.text} className="flex items-center gap-3 text-foreground/80">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mint)]">
                  <r.icon className="h-4 w-4" />
                </span>
                {r.text}
              </li>
            ))}
          </ul>

          <div className="relative mt-10 overflow-hidden rounded-3xl shadow-elegant">
            <img src={studioImg} alt="Movara studio" className="aspect-[5/3] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent p-5">
              <img src={t1} alt="Coach" className="h-12 w-12 rounded-full object-cover ring-2 ring-white" />
              <div className="text-ivory">
                <p className="font-display text-lg leading-tight">“Excited to meet you.”</p>
                <p className="text-xs text-ivory/75">— Léa, Senior Coach</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-foreground/60">
            <a href="mailto:hello@movara.studio" className="flex items-center gap-2 hover:text-foreground">
              <Mail className="h-4 w-4" /> hello@movara.studio
            </a>
            <a href="tel:+10000000000" className="flex items-center gap-2 hover:text-foreground">
              <Phone className="h-4 w-4" /> +1 (000) 000-0000
            </a>
          </div>
        </div>

        {/* Right: booking card */}
        <div className="lg:col-span-7">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/success" });
            }}
            className="rounded-[2rem] border border-foreground/10 bg-card p-6 shadow-elegant md:p-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-3xl tracking-tight">Pick a time</h2>
              <span className="rounded-full bg-[var(--mint)] px-3 py-1 text-xs font-medium">
                Free · 20 min
              </span>
            </div>

            <div className="mt-6">
              <Label className="text-xs uppercase tracking-wider text-foreground/55">
                <Calendar className="mr-1 inline h-3.5 w-3.5" /> Date
              </Label>
              <Input type="date" className="mt-2 h-12 rounded-2xl" required />
            </div>

            <div className="mt-6">
              <Label className="text-xs uppercase tracking-wider text-foreground/55">
                <Clock className="mr-1 inline h-3.5 w-3.5" /> Time
              </Label>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {TIMES.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTime(t)}
                    className={
                      "rounded-2xl border px-3 py-3 text-sm font-medium transition-all " +
                      (time === t
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/15 bg-background hover:border-foreground/40")
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Your name</Label>
                <Input id="name" required className="mt-2 h-12 rounded-2xl" placeholder="Jane Doe" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="mt-2 h-12 rounded-2xl" placeholder="jane@email.com" />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="msg">What would you like to work on? (optional)</Label>
              <Textarea
                id="msg"
                rows={4}
                className="mt-2 rounded-2xl"
                placeholder="A little about your goals, body, schedule…"
              />
            </div>

            <Button type="submit" variant="coral" size="xl" className="mt-8 w-full group">
              Confirm Discovery Call
              <ArrowUpRight className="transition-transform group-hover:rotate-45" />
            </Button>

            <p className="mt-4 text-center text-xs text-foreground/55">
              By booking, you agree to our terms. We'll never share your information.
            </p>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
