import Link from "next/link";
import { ArrowUpRight, Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const COLS = [
  {
    title: "Practice",
    links: [
      { to: "/services", label: "All Services" },
      { to: "/batches", label: "Live Classes" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Members",
    links: [
      { to: "/my-classes", label: "My Classes" },
      { to: "/contact", label: "Discovery Call" },
      { to: "/success", label: "After Booking" },
    ],
  },
  {
    title: "Studio",
    links: [
      { to: "/services", label: "Our Story" },
      { to: "/services", label: "Instructors" },
      { to: "/contact", label: "Contact" },
    ],
  },
] as const;

export function Footer({
  brandName = "Movara",
  tagline = "Movement that meets you where you are. Practiced together, worldwide.",
  supportEmail = "hello@movara.studio",
  supportPhone = "+1 (000) 000-0000",
  instagramUrl,
}: {
  brandName?: string;
  tagline?: string;
  supportEmail?: string;
  supportPhone?: string;
  instagramUrl?: string | null;
}) {
  return (
    <footer className="relative mt-32 overflow-hidden bg-gradient-ocean text-ivory">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--coral)]/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[var(--gold)]/20 blur-3xl" />

      <div className="container-x relative py-20">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo variant="ivory" brandName={brandName} />
            <p className="mt-6 max-w-md font-display text-3xl leading-tight text-balance md:text-4xl">
              {tagline}
            </p>
            <Button asChild variant="coral" size="lg" className="mt-8 group">
              <Link href="/contact">
                Book a Discovery Call
                <ArrowUpRight className="transition-transform group-hover:rotate-45" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-ivory/60">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.to}
                        className="text-ivory/85 transition-colors hover:text-ivory"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-ivory/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-ivory/60">
            © {new Date().getFullYear()} {brandName}. Move with intention.
          </p>
          <div className="flex items-center gap-3">
            {[
              { Icon: Instagram, href: instagramUrl || "#" },
              { Icon: Youtube, href: "#" },
              { Icon: Twitter, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:bg-ivory hover:text-foreground"
                aria-label="social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
