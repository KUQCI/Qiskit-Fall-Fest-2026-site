import type { Metadata } from "next";

import { Countdown } from "@/components/Countdown";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { FormatSection } from "@/components/sections/FormatSection";
import { Container } from "@/components/ui/primitives";
import { event } from "@/content/event";
import { schedulePageContent } from "@/content/schedule";

export const metadata: Metadata = {
  title: "How It Works",
  description: schedulePageContent.metadataDescription,
};

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow={schedulePageContent.eyebrow}
        title={schedulePageContent.title}
        lede={schedulePageContent.lede}
      />

      <Container className="py-12 sm:py-16">
        <div className="editorial-panel grid gap-7 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <p className="font-mono text-2xs uppercase tracking-[0.2em] text-pink">
              {schedulePageContent.countdownLabel}
            </p>
            <p className="mt-3 text-2xl font-semibold text-fg sm:text-3xl">
              {event.openingDateLabel}
            </p>
            <p className="mt-2 text-sm text-fg-muted sm:text-base">
              {event.venue.name}, {event.venue.city}
            </p>
          </div>
          <Countdown className="lg:col-span-7" />
        </div>
      </Container>

      <FormatSection variant="detailed" />
      <CtaSection />
    </>
  );
}
