import Image from "next/image";
import Link from "next/link";

import { Countdown } from "@/components/Countdown";
import { QuantumField } from "@/components/QuantumField";
import { RegisterButton } from "@/components/RegisterButton";
import { Container } from "@/components/ui/primitives";
import { ArrowRightIcon, CalendarIcon, MapPinIcon } from "@/components/ui/Icons";
import { fallFestAssets } from "@/content/assets";
import { event, homeContent } from "@/content/event";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
        <QuantumField className="absolute inset-0 h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />

      <Container className="relative grid min-h-[calc(100svh-6rem)] items-center gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <div className="relative z-10 lg:col-span-7">
          <p className="whitespace-pre-line font-mono text-xs uppercase tracking-[0.22em] text-pink sm:text-sm">
            {homeContent.heroOwner}
          </p>

          <h1 className="mt-4 max-w-4xl text-[clamp(2.7rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
            <span className="block text-fg">Qiskit</span>
            <span className="block text-lavender">Fall Fest 2026</span>
          </h1>

          <p className="mt-6 max-w-[68ch] text-base leading-relaxed text-fg-muted sm:text-lg">
            {event.intro}
          </p>

          <div className="mt-7 flex flex-col gap-3 text-sm text-fg-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:text-base">
            <span className="inline-flex items-center gap-2.5">
              <CalendarIcon className="h-5 w-5 shrink-0 text-pink" />
              {event.dateLabel}
            </span>
            <a
              href={event.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2.5 transition-colors hover:text-fg"
            >
              <MapPinIcon className="h-5 w-5 shrink-0 text-pink" />
              {event.venue.name}, {event.venue.city}
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <RegisterButton size="lg" />
            <Link
              href="/#format"
              data-gate="H"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-base font-semibold text-fg transition-colors hover:border-pink hover:text-pink"
            >
              How it works
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="editorial-panel relative min-h-[21rem] overflow-hidden sm:min-h-[27rem] lg:min-h-[34rem]">
            <Image
              src={fallFestAssets.hero.withoutTitleWeb.src}
              alt=""
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" aria-hidden="true" />

            <div className="absolute inset-x-4 bottom-4 rounded-[1.125rem] border border-border bg-bg/90 p-5 backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-6">
              <p className="font-mono text-2xs uppercase tracking-[0.2em] text-pink">
                Fall Fest begins
              </p>
              <p className="mt-2 text-lg font-semibold text-fg sm:text-xl">
                {event.openingDateLabel}
              </p>
              <Countdown className="mt-4" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
