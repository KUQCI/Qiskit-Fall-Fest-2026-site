import type { Metadata } from "next";

import { Countdown } from "@/components/Countdown";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { FormatSection } from "@/components/sections/FormatSection";
import { Container } from "@/components/ui/primitives";
import { event } from "@/content/event";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "The three phases of the Qiskit Fall Fest 2026: opening day, a two-week hacking period, and the closing showcase at Khalifa University on 20 November 2026.",
};

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="Schedule"
        title="What happens, and when"
        lede="The Fall Fest runs across three phases. Exact dates for the opening day and hacking period are being confirmed with the university and will appear here first."
      />

      <Container className="py-12">
        <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-mono text-2xs uppercase tracking-[0.18em] text-gold">
              Closing showcase
            </p>
            <p className="mt-2 text-2xl font-semibold text-fg sm:text-3xl">
              {event.closingDateLabel}
            </p>
            <p className="mt-1 text-sm text-fg-muted">
              {event.venue.name}, {event.venue.city}
            </p>
          </div>
          <Countdown />
        </div>
      </Container>

      <FormatSection showSessions />

      <CtaSection />
    </>
  );
}
