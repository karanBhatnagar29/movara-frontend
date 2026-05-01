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
        <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--coral)]" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl text-lg text-foreground/65 text-pretty md:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}
