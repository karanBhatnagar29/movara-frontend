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
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
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
      <h2 className="mt-4 font-display text-3xl leading-[1.06] tracking-tight text-balance md:text-4xl lg:text-[3.25rem]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-xl text-base leading-7 text-foreground/65 text-pretty md:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
