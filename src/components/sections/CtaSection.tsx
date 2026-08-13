import { RegisterButton } from "@/components/RegisterButton";
import { Container, Section } from "@/components/ui/primitives";
import { MailIcon } from "@/components/ui/Icons";
import { ctaCopy, event } from "@/content/event";

export function CtaSection({ variant = "default" }: { variant?: "default" | "opening" }) {
  const copy = ctaCopy[variant];

  return (
    <Section className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/15 blur-3xl" aria-hidden="true" />

      <Container className="relative text-center">
        <p className="font-mono text-2xs uppercase tracking-[0.22em] text-pink sm:text-xs">
          {copy.eyebrow}
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold sm:text-5xl">
          {copy.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-[65ch] text-base leading-relaxed text-fg-muted sm:text-lg">
          {copy.body}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <RegisterButton size="lg" />
          <a
            href={`mailto:${event.contactEmail}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-base font-semibold text-fg transition-colors hover:border-pink hover:text-pink"
          >
            <MailIcon className="h-4.5 w-4.5" />
            Ask a question
          </a>
        </div>

        {!event.registrationUrl ? (
          <p className="mt-5 text-sm text-fg-subtle">{copy.note}</p>
        ) : null}
      </Container>
    </Section>
  );
}
