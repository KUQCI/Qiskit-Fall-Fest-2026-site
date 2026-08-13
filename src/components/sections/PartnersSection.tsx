import Image from "next/image";

import { Reveal } from "@/components/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { ExternalLinkIcon } from "@/components/ui/Icons";
import { partners, partnersIntro } from "@/content/sponsors";
import { cn } from "@/lib/utils";

export function PartnersSection({ compact = false }: { compact?: boolean }) {
  const confirmed = partners.filter((partner) => partner.status === "confirmed");

  return (
    <Section className="border-y border-border bg-surface/25">
      <Container>
        <SectionHeading
          eyebrow="Partners"
          title="Who is behind the Fest"
          lede={partnersIntro}
        />

        <div className={cn("mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5", !compact && "lg:mt-12")}>
          {confirmed.map((partner, index) => (
            <Reveal key={partner.name} delay={index * 60}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${partner.name} (opens in a new tab)`}
                className="card card-interactive group flex min-h-44 items-center justify-center p-5 sm:p-7"
              >
                <span className="logo-plate relative flex h-28 w-full items-center justify-center overflow-hidden px-7 py-5">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      sizes="(max-width: 639px) 90vw, 45vw"
                      className="object-contain p-5"
                    />
                  ) : (
                    <span className="text-xl font-semibold text-logo-ink">{partner.name}</span>
                  )}
                </span>
                <ExternalLinkIcon className="ml-3 h-4 w-4 shrink-0 text-fg-subtle transition-colors group-hover:text-gold" />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
