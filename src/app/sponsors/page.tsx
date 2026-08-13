import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { MailIcon } from "@/components/ui/Icons";
import { event } from "@/content/event";
import {
  partnerReasons,
  partnersPageContent,
  sponsorshipPackage,
} from "@/content/sponsors";

export const metadata: Metadata = {
  title: "Partners",
  description: partnersPageContent.metadataDescription,
};

export default function SponsorsPage() {
  return (
    <>
      <PageHeader
        eyebrow={partnersPageContent.eyebrow}
        title={partnersPageContent.title}
        lede={partnersPageContent.lede}
      />

      <PartnersSection />

      <Section>
        <Container>
          <SectionHeading
            eyebrow={partnersPageContent.reasonsEyebrow}
            title={partnersPageContent.reasonsTitle}
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {partnerReasons.map((reason, index) => (
              <Reveal as="li" key={reason.title} delay={index * 70}>
                <article className="card h-full p-6 sm:p-7">
                  <h3 className="text-lg font-semibold text-fg">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {reason.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface/25">
        <Container>
          <SectionHeading
            eyebrow={partnersPageContent.packagesEyebrow}
            title={partnersPageContent.packagesTitle}
          />

          <Reveal>
            <article className="card mt-12 max-w-4xl p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-4">
                <h3 className="text-2xl font-semibold text-fg">{sponsorshipPackage.title}</h3>
                <Badge tone="purple">
                  {sponsorshipPackage.status.replaceAll("-", " ")}
                </Badge>
              </div>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-fg-muted sm:text-lg">
                {sponsorshipPackage.description}
              </p>
            </article>
          </Reveal>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <div className="card mx-auto max-w-3xl p-8 text-center sm:p-12">
            <h2 className="text-2xl font-semibold text-fg sm:text-3xl">
              {partnersPageContent.contactTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
              {partnersPageContent.contactDescription}
            </p>
            <a
              href={`mailto:${event.contactEmail}?subject=${encodeURIComponent(
                `${event.name} partnership`,
              )}`}
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-on-gold transition-colors hover:bg-gold-strong"
            >
              <MailIcon className="h-4.5 w-4.5" />
              {partnersPageContent.contactActionLabel}
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
