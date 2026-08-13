import { Reveal } from "@/components/Reveal";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { formatSectionCopy, homePhases, phases } from "@/content/schedule";
import { formatLabel, statusLabel } from "@/lib/utils";

export function FormatSection({ variant = "compact" }: { variant?: "compact" | "detailed" }) {
  const detailed = variant === "detailed";
  const copy = detailed ? formatSectionCopy.detailed : formatSectionCopy.compact;

  if (!detailed) {
    return (
      <Section id="format" className="relative overflow-hidden border-t border-border">
        <div className="pointer-events-none absolute inset-0 bg-fest-dots opacity-25" aria-hidden="true" />
        <Container className="relative">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
          <ol className="mt-12 grid gap-5 lg:mt-14">
            {homePhases.map((phase, index) => (
              <Reveal as="li" key={phase.label} delay={index * 55}>
                <article className="editorial-panel relative grid gap-6 overflow-hidden p-6 sm:p-8 md:grid-cols-12 md:gap-10">
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-pink via-purple to-brand" />
                  <div className="md:col-span-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-mono text-2xs uppercase tracking-[0.2em] text-pink">{phase.label}</p>
                      {statusLabel(phase.status) ? (
                        <Badge tone="neutral">{statusLabel(phase.status)}</Badge>
                      ) : null}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-fg sm:text-3xl">{phase.title}</h3>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-fg-subtle">{phase.dateRange}</p>
                  </div>
                  <p className="text-base leading-relaxed text-fg-muted md:col-span-8">{phase.summary}</p>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="format" className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0 bg-fest-dots opacity-25" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          lede={copy.lede}
        />

        <ol className="mt-12 grid gap-5 lg:mt-14">
          {phases.map((phase, index) => (
            <Reveal as="li" key={phase.slug} delay={index * 55}>
              <article className="editorial-panel relative grid gap-6 overflow-hidden p-6 sm:p-8 md:grid-cols-12 md:gap-10">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-pink via-purple to-brand"
                />

                <div className="md:col-span-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-mono text-2xs uppercase tracking-[0.2em] text-pink">
                      {phase.label}
                    </p>
                    {statusLabel(phase.status) ? (
                      <Badge tone="neutral">{statusLabel(phase.status)}</Badge>
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-fg sm:text-3xl">{phase.title}</h3>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-fg-subtle">
                    {phase.dateRange}
                  </p>
                </div>

                <div className="md:col-span-8">
                  <p className="text-base leading-relaxed text-fg-muted">{phase.summary}</p>

                  {phase.sessions.length > 0 ? (
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {phase.sessions.map((session) => (
                        <li key={session.title} className="rounded-[0.875rem] border border-border bg-bg/45 p-5">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <h4 className="text-base font-semibold text-fg">{session.title}</h4>
                            {session.time ? (
                              <span className="font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle">
                                {session.time}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                            {session.description}
                          </p>
                          {session.format ? (
                            <div className="mt-4">
                              <Badge tone="sky">{formatLabel(session.format)}</Badge>
                            </div>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
