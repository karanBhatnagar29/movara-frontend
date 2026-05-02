import { Star, Quote } from "lucide-react";
import type { Testimonial } from "./types";

function toSrc(asset: Testimonial["avatarUrl"]) {
  return typeof asset === "string" ? asset : asset.src;
}

export function TestimonialCard({
  t,
  accent = "ivory",
}: {
  t: Testimonial;
  accent?: "ivory" | "peach" | "mint";
}) {
  const bg =
    accent === "peach" ? "bg-[var(--peach)]" : accent === "mint" ? "bg-[var(--mint)]" : "bg-ivory";
  return (
    <figure
      className={`relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl ${bg} p-7 shadow-soft`}
    >
      <Quote className="absolute right-6 top-6 h-10 w-10 text-foreground/10" />
      {t.rating && (
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[var(--coral)] text-[var(--coral)]" />
          ))}
        </div>
      )}
      <blockquote className="font-display text-lg leading-snug tracking-tight md:text-[1.35rem]">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <img
          src={toSrc(t.avatarUrl)}
          alt={t.name}
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover ring-2 ring-background"
        />
        <div>
          <p className="font-medium text-foreground">{t.name}</p>
          {t.role && <p className="text-sm text-foreground/60">{t.role}</p>}
        </div>
      </figcaption>
    </figure>
  );
}
