import { Container, Eyebrow } from "@/components/ui/primitives";

/** Shared header for every interior page. Renders the page's single h1. */
export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--c-brand) 60%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl lg:text-6xl">{title}</h1>
        {lede ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {lede}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
