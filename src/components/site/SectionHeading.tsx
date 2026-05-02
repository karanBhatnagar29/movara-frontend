import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-foreground/70",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-8 bg-[var(--coral)]" />
          {eyebrow}
          <span className="h-px w-8 bg-[var(--coral)]" />
        </span>
      )}
      <h2 className="mt-5 font-display text-4xl leading-[1.02] tracking-tight text-balance md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-xl text-lg text-foreground/65 text-pretty md:text-xl",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
