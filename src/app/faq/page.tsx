import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Container, Section } from "@/components/ui/primitives";
import { MailIcon } from "@/components/ui/Icons";
import { event } from "@/content/event";
import { faqs } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about the Qiskit Fall Fest 2026 at Khalifa University: who can take part, whether you need prior experience, how the hybrid format works, and how finalists are selected.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered"
        lede="If your question is not here, email us — we would rather answer it directly than have you guess."
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} withFilters />

            <div className="card mt-12 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="text-lg font-semibold text-fg">Still stuck?</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  Ask the organising team anything about the Fest.
                </p>
              </div>
              <a
                href={`mailto:${event.contactEmail}?subject=Qiskit%20Fall%20Fest%202026%20question`}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-gold hover:text-gold"
              >
                <MailIcon className="h-4 w-4" />
                {event.contactEmail}
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
