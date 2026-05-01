import { Check, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { PricingPlan } from "./types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const highlighted = plan.highlighted;
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl border p-8 transition-all duration-500",
        highlighted
          ? "border-transparent bg-gradient-ocean text-ivory shadow-elegant"
          : "border-foreground/10 bg-card text-foreground hover:-translate-y-1 hover:shadow-soft",
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-8 rounded-full bg-[var(--coral)] px-4 py-1 text-xs font-medium uppercase tracking-wider text-[var(--coral-foreground)]">
          Most loved
        </span>
      )}

      <div className="flex items-baseline justify-between">
        <h3
          className={cn(
            "font-display text-2xl tracking-tight",
            highlighted ? "text-ivory" : "text-foreground",
          )}
        >
          {plan.name}
        </h3>
      </div>
      <p className={cn("mt-2 text-sm", highlighted ? "text-ivory/75" : "text-foreground/65")}>
        {plan.description}
      </p>

      <div className="mt-6 flex items-end gap-2">
        <span className="font-display text-5xl tracking-tight">{plan.priceLabel}</span>
        <span className={cn("pb-2 text-sm", highlighted ? "text-ivory/65" : "text-foreground/55")}>
          {plan.cadenceLabel}
        </span>
      </div>

      <ul className="mt-8 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                highlighted ? "bg-ivory/15 text-ivory" : "bg-[var(--mint)] text-foreground",
              )}
            >
              <Check className="h-3 w-3" />
            </span>
            <span className={highlighted ? "text-ivory/90" : "text-foreground/75"}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-2">
        <Button
          asChild
          variant={highlighted ? "ivory" : "default"}
          size="lg"
          className="w-full group"
        >
          <Link to={"/contact" as "/"}>
            {plan.ctaLabel}
            <ArrowUpRight className="transition-transform group-hover:rotate-45" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
