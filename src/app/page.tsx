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
import { homeContent } from "@/content/event";
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

      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow={homeContent.about.eyebrow} title={homeContent.about.title} />
              <div className="mt-8 hidden h-1 w-28 bg-gradient-to-r from-pink via-purple to-brand lg:block" aria-hidden="true" />
            </div>
            <div className="editorial-panel space-y-5 p-6 text-base leading-relaxed text-fg-muted sm:p-8 lg:col-span-7 lg:text-lg">
              {homeContent.about.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className={index === homeContent.about.paragraphs.length - 1 ? "text-fg" : undefined}>
                  {paragraph}
                </p>
              ))}
              <div className="pt-2">
                <Link href="/about/" className="group inline-flex min-h-11 items-center gap-2 font-semibold text-gold">
                  {homeContent.about.linkLabel}
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface/25">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={homeContent.tracks.eyebrow}
              title={homeContent.tracks.title}
              lede={homeContent.tracks.lede}
            />
            <Link href="/tracks/" className="group inline-flex min-h-11 items-center gap-2 font-semibold text-gold">
              {homeContent.tracks.linkLabel}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((track, index) => (
              <Reveal as="li" key={track.slug} delay={index * 50}>
                <TrackCard track={track} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <FormatSection />
      <PartnersSection compact />
      <ResourcesSection />

      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow={homeContent.faq.eyebrow} title={homeContent.faq.title} />
              <Link href="/faq/" className="group mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-gold">
                {homeContent.faq.linkLabel}
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
