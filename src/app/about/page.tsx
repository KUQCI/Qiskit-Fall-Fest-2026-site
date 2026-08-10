import type { Metadata } from "next";
import Image from "next/image";

/* Imported rather than referenced as "/brand/...". A bare public/ path is NOT
   rewritten with basePath, so it would 404 on a GitHub Pages project page.
   Static imports go through the _next/static/media pipeline, which is. */
import sealDark from "@/assets/brand/qci-seal-dark.png";
import sealLight from "@/assets/brand/qci-seal-light.png";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { ExternalLinkIcon } from "@/components/ui/Icons";
import { event } from "@/content/event";
import { advisor, organizingTeam, speakers } from "@/content/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Quantum Computing Initiative at Khalifa University, the team organising the first Qiskit Fall Fest in the GCC, and the faculty advisor behind it.",
};

/** Initials fallback used when a person has no photo. */
function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 font-mono text-sm font-semibold text-gold"
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Quantum Computing Initiative"
        lede="A student organisation at Khalifa University building a quantum computing community — starting here, then well past the campus gates."
      />

      {/* Who we are */}
      <Section>
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="card relative flex aspect-square items-center justify-center overflow-hidden p-10">
                <div
                  className="animate-spin-slow pointer-events-none absolute inset-8 rounded-full border border-dashed border-border-strong opacity-40"
                  aria-hidden="true"
                />
                {/* The seal ships in two variants; each is hidden in the other theme. */}
                <Image
                  src={sealDark}
                  alt="Quantum Computing Initiative seal"
                  className="relative w-full max-w-[280px] [.light_&]:hidden"
                  priority
                />
                <Image
                  src={sealLight}
                  alt=""
                  aria-hidden="true"
                  className="relative hidden w-full max-w-[280px] [.light_&]:block"
                />
              </div>
            </div>

            <div className="space-y-5 text-base leading-relaxed text-fg-muted lg:col-span-7 lg:text-lg">
              <p>
                The {event.host} was founded to build a quantum computing community, starting
                at {event.university} and expanding outward. The work has always been about
                two things: making the field legible to people who have not studied it, and
                giving the people who have somewhere to do real work.
              </p>
              <p>
                That runs in both directions. On the education side, we run workshops,
                hackathons, and talks. On the technical side, our R&amp;D division contributes
                to the open-source quantum ecosystem — including{" "}
                <a
                  href="https://github.com/KUQCI/quantum-learn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold underline-offset-4 hover:underline"
                >
                  quantum-learn
                </a>
                , a quantum machine learning library supporting both Qiskit and PennyLane.
              </p>
              <p>
                We have also hosted the IEEE Open Silicon Initiative Chip Design Bootcamp at
                Khalifa University, led by Prof. Ibrahim Elfadel.
              </p>
              <p className="text-fg">
                The Qiskit Fall Fest is the next step: the first in the GCC, and the largest
                thing we have attempted.
              </p>

              <div className="pt-2">
                <a
                  href={event.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-semibold text-gold"
                >
                  Our open-source work on GitHub
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Advisor */}
      <Section className="border-t border-border bg-surface/25">
        <Container>
          <SectionHeading eyebrow="Faculty advisor" title={advisor.name} />
          <div className="mt-8 max-w-3xl">
            <p className="font-mono text-sm text-sky">{advisor.organization}</p>
            <p className="mt-4 text-base leading-relaxed text-fg-muted lg:text-lg">
              {advisor.bio}
            </p>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section className="border-t border-border">
        <Container>
          <SectionHeading
            eyebrow="Organising team"
            title="The people running the Fest"
            lede="A student team across engineering and science at Khalifa University, plus the events, media, and R&D groups behind them."
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {organizingTeam.map((member, index) => (
              <Reveal as="li" key={member.name} delay={(index % 3) * 60}>
                <div className="card flex h-full items-start gap-4 p-5">
                  <Initials name={member.name} />
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-fg">{member.name}</h3>
                    <p className="mt-0.5 font-mono text-2xs uppercase tracking-[0.14em] text-gold">
                      {member.role}
                    </p>
                    {member.focus ? (
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                        {member.focus}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Speakers — honest empty state until confirmations land */}
      <Section className="border-t border-border bg-surface/25">
        <Container>
          <SectionHeading
            eyebrow="Speakers"
            title="Speakers and mentors"
            lede="We are confirming speakers from IBM Quantum, our academic partners, and industry now."
          />

          {speakers.length > 0 ? (
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {speakers.map((speaker, index) => (
                <Reveal as="li" key={speaker.name} delay={(index % 3) * 60}>
                  <div className="card flex h-full items-start gap-4 p-5">
                    <Initials name={speaker.name} />
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-fg">{speaker.name}</h3>
                      <p className="mt-0.5 text-sm text-sky">{speaker.role}</p>
                      <p className="mt-0.5 text-sm text-fg-subtle">{speaker.organization}</p>
                      {speaker.bio ? (
                        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                          {speaker.bio}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="card mt-10 flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-base font-medium text-fg">
                  The speaker line-up is being confirmed
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  We will announce speakers here as they are confirmed, rather than before.
                </p>
              </div>
              <a
                href={event.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-gold hover:text-gold"
              >
                Follow for announcements
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </div>
          )}
        </Container>
      </Section>

      <ResourcesSection />
      <CtaSection />
    </>
  );
}
