import { Container, Eyebrow } from "@/components/ui/primitives";

/** Shared interior-page masthead. Page-specific art stays in the page body. */
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
      <div className="pointer-events-none absolute -right-20 top-8 h-40 w-72 -rotate-6 rounded-full bg-purple/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-[8%] hidden h-28 w-56 rounded-t-full border border-pink/20 bg-pink/[0.06] sm:block" aria-hidden="true" />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] sm:text-5xl lg:text-7xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-6 max-w-[68ch] text-base leading-relaxed text-fg-muted sm:text-lg">
            {lede}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
