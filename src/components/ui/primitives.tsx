import { cn } from "@/lib/utils";

/** Consistent max-width and horizontal gutters for every section on the site. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[75rem] px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}

/** A page section with the standard vertical rhythm. */
export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative py-18 sm:py-24 lg:py-28", className)}>
      {children}
    </section>
  );
}

/** Small mono label that sits above a section heading. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-2xs uppercase tracking-[0.22em] text-gold sm:text-xs">
      {children}
    </p>
  );
}

/** Standard section header: eyebrow, title, and optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{title}</Tag>
      {lede ? (
        <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-fg-muted sm:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
  );
}

type BadgeTone = "gold" | "purple" | "sky" | "neutral" | "success";

const badgeTones: Record<BadgeTone, string> = {
  gold: "border-gold/35 bg-gold/10 text-gold",
  purple: "border-purple/35 bg-purple/10 text-purple",
  sky: "border-sky/35 bg-sky/10 text-sky",
  neutral: "border-border-strong bg-surface-2 text-fg-muted",
  success: "border-success/35 bg-success/10 text-success",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-2xs uppercase tracking-wider",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Thin divider that fades out at both ends. */
export function FadeRule({ className }: { className?: string }) {
  return <div className={cn("rule-fade w-full", className)} aria-hidden="true" />;
}
