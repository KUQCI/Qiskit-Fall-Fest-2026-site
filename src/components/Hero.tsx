import { Countdown } from "@/components/Countdown";
import { Marquee } from "@/components/Marquee";
import { QuantumField } from "@/components/QuantumField";
import { RegisterButton } from "@/components/RegisterButton";
import { Container } from "@/components/ui/primitives";
import { ArrowRightIcon, CalendarIcon, MapPinIcon } from "@/components/ui/Icons";
import { event } from "@/content/event";
import { tracks } from "@/content/tracks";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Layer 1: ambient animated field */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <QuantumField className="absolute inset-0 h-full w-full opacity-70" />
      </div>

      {/* Layer 2: static grid and colour wash */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" aria-hidden="true" />

      {/* Layer 3: scrim over the text column. The drifting nodes are bright enough to
          sit behind body copy and hurt legibility, so the left side — where all the
          text lives — always keeps a near-opaque backdrop while the right stays open. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          // color-mix keeps this correct in both themes, since it mixes the live
          // --c-bg token rather than a hardcoded navy.
          background:
            "linear-gradient(to right," +
            " var(--c-bg) 0%," +
            " color-mix(in srgb, var(--c-bg) 88%, transparent) 26%," +
            " color-mix(in srgb, var(--c-bg) 45%, transparent) 46%," +
            " transparent 66%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          // Built from tokens rather than literal rgb() so the wash tracks any brand
          // change and adapts between themes.
          background:
            "radial-gradient(circle," +
            " color-mix(in srgb, var(--c-brand) 50%, transparent) 0%," +
            " color-mix(in srgb, var(--c-purple) 22%, transparent) 45%," +
            " transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative pb-16 pt-16 sm:pb-20 sm:pt-24">
        {/* Host line */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-gold" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            <span className="font-mono text-2xs uppercase tracking-[0.18em] text-gold">
              Approved by IBM Quantum
            </span>
          </span>
          <span className="font-mono text-2xs uppercase tracking-[0.18em] text-fg-subtle">
            {event.hostShort} &middot; {event.university}
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl text-[2.5rem] font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
          <span className="block text-fg">Qiskit</span>
          <span className="block text-gradient-gold">Fall Fest 2026</span>
        </h1>

        <p className="mt-5 max-w-xl font-mono text-sm uppercase tracking-[0.16em] text-sky sm:text-base">
          {event.tagline}
        </p>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
          {event.intro}
        </p>

        {/* Date and venue, mirroring the BioCAS hero pattern */}
        <div className="mt-8 flex flex-col gap-3 text-sm text-fg-muted sm:flex-row sm:items-center sm:gap-7 sm:text-base">
          <span className="inline-flex items-center gap-2.5">
            <CalendarIcon className="h-5 w-5 shrink-0 text-gold" />
            {event.dateLabel}
          </span>
          <a
            href={event.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 transition-colors hover:text-fg"
          >
            <MapPinIcon className="h-5 w-5 shrink-0 text-gold" />
            {event.venue.name}, {event.venue.city}
          </a>
        </div>

        {/* Countdown */}
        <div className="mt-10">
          <p className="mb-3 font-mono text-2xs uppercase tracking-[0.18em] text-fg-subtle">
            Closing showcase &middot; {event.closingDateLabel}
          </p>
          <Countdown />
        </div>

        {/* Actions */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <RegisterButton size="lg" />
          <a
            href="#format"
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-base font-semibold text-fg transition-colors hover:border-gold hover:text-gold"
          >
            How it works
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {!event.registrationUrl ? (
          <p className="mt-4 text-sm text-fg-subtle">{event.registrationNote}</p>
        ) : null}
      </Container>

      {/* Track marquee — always drifting, so the page is never fully still */}
      <div className="relative border-y border-border bg-surface/50 py-3.5">
        <Marquee slow>
          {tracks.map((track) => (
            <span
              key={track.slug}
              className="flex items-center gap-3 whitespace-nowrap px-6 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle"
            >
              <span className="text-gold">{track.code}</span>
              <span>{track.title}</span>
              <span className="text-border-strong" aria-hidden="true">
                &#47;&#47;
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
