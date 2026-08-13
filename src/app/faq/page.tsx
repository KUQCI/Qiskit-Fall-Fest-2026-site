import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Container, Section } from "@/components/ui/primitives";
import { MailIcon } from "@/components/ui/Icons";
import { event } from "@/content/event";
import { faqPageContent, faqs } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: faqPageContent.metadataDescription,
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow={faqPageContent.eyebrow}
        title={faqPageContent.title}
        lede={faqPageContent.lede}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="sr-only">Frequently asked questions</h2>
            <FaqAccordion items={faqs} withFilters />

            <div className="card mt-12 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="text-lg font-semibold text-fg">
                  {faqPageContent.contactTitle}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  {faqPageContent.contactDescription}
                </p>
              </div>
              <a
                href={`mailto:${event.contactEmail}?subject=${encodeURIComponent(
                  `${event.name} question`,
                )}`}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-gold hover:text-gold"
              >
                <MailIcon className="h-4 w-4" />
                {faqPageContent.contactActionLabel}
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
