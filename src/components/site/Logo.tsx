import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "ivory";
}) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2 font-display text-2xl tracking-tight", className)}
    >
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-warm shadow-soft",
          variant === "ivory" && "bg-ivory",
        )}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2}>
          <path d="M3 16c4-8 6-8 9 0s5 8 9 0" strokeLinecap="round" />
        </svg>
      </span>
      <span className={cn(variant === "ivory" ? "text-ivory" : "text-foreground")}>
        Movara
      </span>
    </Link>
  );
}
