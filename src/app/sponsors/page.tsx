import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { CheckIcon, MailIcon } from "@/components/ui/Icons";
import { event } from "@/content/event";
import { sponsorTiers } from "@/content/sponsors";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Partner with the first Qiskit Fall Fest in the GCC. Track partnerships, headline sponsorship, and in-kind support at Khalifa University.",
};

export default function SponsorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sponsors & Partners"
        title="Put a real problem in front of them"
        lede="The Fall Fest gives partners two weeks of student attention on a challenge they choose, and a closing showcase to meet the people who solved it."
      />

      <PartnersSection />

      {/* Why sponsor */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why partner with us"
            title="What a partnership actually gets you"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "A track built around your problem",
                body: "Track partners define the challenge. If your team is working on optimisation, materials, or security, that becomes the thing dozens of students attack for two weeks — and you see every approach they take.",
              },
              {
                title: "Access to quantum-curious talent",
                body: "Participants come from universities across the UAE and, through the online tracks, internationally. You meet them mid-problem rather than mid-interview.",
              },
              {
                title: "Visibility in a first",
                body: "This is the first Qiskit Fall Fest in the GCC, run under IBM Quantum's global programme and hosted at Khalifa University. Partners are named across the site, the event, and the coverage that follows.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <div className="card h-full p-6 sm:p-7">
                  <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Packages */}
      <Section className="border-t border-border bg-surface/25">
        <Container>
          <SectionHeading
            eyebrow="Packages"
            title="Ways to support the Fest"
            lede="Packages are flexible — if none of these fit what you had in mind, tell us what would."
          />

          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {sponsorTiers.map((tier, index) => (
              <Reveal as="li" key={tier.name} delay={(index % 2) * 60}>
                <div
                  className={cn(
                    "card flex h-full flex-col p-6 sm:p-8",
                    tier.featured && "border-gold/45 bg-gold/[0.04]",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-fg">{tier.name}</h3>
                    {tier.featured ? (
                      <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 font-mono text-2xs uppercase tracking-wider text-gold">
                        Most impact
                      </span>
                    ) : null}
                  </div>

                  {/* Price only renders when set — no placeholder figures. */}
                  {tier.price ? (
                    <p className="mt-3 font-mono text-2xl font-semibold text-gold">
                      {tier.price}
                    </p>
                  ) : null}

                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{tier.summary}</p>

                  <ul className="mt-6 space-y-2.5">
                    {tier.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2.5 text-sm text-fg-muted"
                      >
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>

          <p className="mt-8 text-sm text-fg-subtle">
            Package details and figures are being finalised. Get in touch and we will send the
            current sponsorship pack.
          </p>
        </Container>
      </Section>

      {/* Contact */}
      <Section className="border-t border-border">
        <Container>
          <div className="card mx-auto max-w-2xl p-8 text-center sm:p-12">
            <h2 className="text-2xl font-semibold text-fg sm:text-3xl">
              Talk to the organising team
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-fg-muted">
              Tell us what your organisation works on and we will come back with a track idea
              rather than a generic deck.
            </p>
            <a
              href={`mailto:${event.contactEmail}?subject=Qiskit%20Fall%20Fest%202026%20sponsorship`}
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-on-gold transition-colors hover:bg-gold-strong"
            >
              <MailIcon className="h-4.5 w-4.5" />
              {event.contactEmail}
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
