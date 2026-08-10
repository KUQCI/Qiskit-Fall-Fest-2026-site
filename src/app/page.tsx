import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { TrackCard } from "@/components/TrackCard";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FormatSection } from "@/components/sections/FormatSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { event } from "@/content/event";
import { faqs } from "@/content/faq";
import { featuredTrackSlugs, tracks } from "@/content/tracks";

const featured = featuredTrackSlugs
  .map((slug) => tracks.find((track) => track.slug === slug))
  .filter((track): track is NonNullable<typeof track> => Boolean(track));

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />

      {/* What this is */}
      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="What this is"
                title="The first Qiskit Fall Fest in the GCC"
              />
            </div>
            <div className="space-y-5 text-base leading-relaxed text-fg-muted lg:col-span-7 lg:text-lg">
              <p>
                The Qiskit Fall Fest is IBM Quantum&rsquo;s annual global event series. Each
                edition is independently hosted by an approved institution, so it is that
                institution&rsquo;s own event while also being part of the wider IBM Quantum
                ecosystem.
              </p>
              <p>
                Ours is the first in the Gulf. It is organised by the {event.host} — a student
                organisation at {event.university} — and it exists because the quantum
                community here is growing fast while remaining scattered across universities,
                labs, and companies that rarely meet.
              </p>
              <p className="text-fg">
                So the format is built around that problem. Six tracks, each with its own
                community. Beginner routes that assume nothing. And a closing showcase where
                the people building this field in the region are in the same room.
              </p>
              <div className="pt-2">
                <Link
                  href="/about/"
                  className="group inline-flex items-center gap-2 font-semibold text-gold"
                >
                  More about QCI
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Tracks preview */}
      <Section className="border-t border-border bg-surface/25">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Tracks"
              title="Pick the problem you want to spend two weeks on"
              lede="Six independent tracks, from your first qubit to research-level chemistry. Every track is labelled with the level it assumes and whether it runs in person, online, or both."
            />
            <Link
              href="/tracks/"
              className="group inline-flex min-h-11 items-center gap-2 font-semibold text-gold"
            >
              All six tracks
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((track, index) => (
              <Reveal as="li" key={track.slug} delay={index * 60}>
                <TrackCard track={track} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <FormatSection />
      <PartnersSection compact />
      <ResourcesSection />

      {/* FAQ preview */}
      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Questions" title="The ones people actually ask" />
              <Link
                href="/faq/"
                className="group mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-gold"
              >
                Read all questions
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={faqs.slice(0, 5)} />
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
