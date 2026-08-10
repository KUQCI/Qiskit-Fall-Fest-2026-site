import { QuantumField } from "@/components/QuantumField";
import { RegisterButton } from "@/components/RegisterButton";
import { Container, Section } from "@/components/ui/primitives";
import { MailIcon } from "@/components/ui/Icons";
import { event } from "@/content/event";

export function CtaSection() {
  return (
    <Section className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
        <QuantumField className="absolute inset-0 h-full w-full" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle," +
            " color-mix(in srgb, var(--c-gold) 35%, transparent) 0%," +
            " color-mix(in srgb, var(--c-brand) 20%, transparent) 50%," +
            " transparent 72%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative text-center">
        <p className="font-mono text-2xs uppercase tracking-[0.22em] text-gold sm:text-xs">
          {event.closingDateLabel} &middot; {event.venue.name}
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold sm:text-5xl">
          You do not need a physics degree to start
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
          Most people arriving at the Fall Fest have never written a quantum circuit. That is
          who the beginner track is built for. Come find out what the field actually looks
          like from the inside.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <RegisterButton size="lg" />
          <a
            href={`mailto:${event.contactEmail}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-base font-semibold text-fg transition-colors hover:border-gold hover:text-gold"
          >
            <MailIcon className="h-4.5 w-4.5" />
            Ask a question
          </a>
        </div>

        {!event.registrationUrl ? (
          <p className="mt-5 text-sm text-fg-subtle">{event.registrationNote}</p>
        ) : null}
      </Container>
    </Section>
  );
}
