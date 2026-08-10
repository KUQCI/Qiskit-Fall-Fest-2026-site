import { Reveal } from "@/components/Reveal";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { academicPartners, partners } from "@/content/sponsors";
import { statusLabel } from "@/lib/utils";

/**
 * Confirmed partners only.
 *
 * Organisations still in conversation are deliberately absent — see the note at the
 * top of src/content/sponsors.ts.
 */
export function PartnersSection({ compact = false }: { compact?: boolean }) {
  const confirmed = partners.filter((partner) => partner.status === "confirmed");

  return (
    <Section className="border-y border-border bg-surface/30">
      <Container>
        <SectionHeading
          eyebrow="Partners"
          title="Who is behind the Fest"
          lede="The Qiskit Fall Fest is IBM Quantum's global programme. This edition is organised and hosted by the Quantum Computing Initiative at Khalifa University."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {confirmed.map((partner, index) => (
            <Reveal key={partner.name} delay={index * 70}>
              <a
                href={partner.url ?? "#"}
                target={partner.url ? "_blank" : undefined}
                rel={partner.url ? "noopener noreferrer" : undefined}
                className="card card-interactive flex h-full items-center gap-5 p-6 sm:p-7"
              >
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 font-mono text-lg font-semibold text-gold"
                  aria-hidden="true"
                >
                  {partner.name
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-fg">{partner.name}</h3>
                  <p className="mt-0.5 text-sm text-fg-muted">{partner.kind}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {!compact ? (
          <Reveal delay={140}>
            <div className="mt-10">
              <h3 className="font-mono text-2xs uppercase tracking-[0.18em] text-fg-subtle">
                Academic partners at Khalifa University
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
                Departments across the university are working with us to design tracks and
                supply mentors. Some of these are still being finalised.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {academicPartners.map((partner) => (
                  <li key={partner.name}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-fg-muted">
                      {partner.name}
                      {partner.status !== "confirmed" ? (
                        <Badge tone="neutral" className="ml-0.5">
                          {statusLabel(partner.status)}
                        </Badge>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
