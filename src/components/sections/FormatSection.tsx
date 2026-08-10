import { Reveal } from "@/components/Reveal";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { phases } from "@/content/schedule";
import { formatLabel, statusLabel } from "@/lib/utils";

/**
 * The three-phase format, shown as a vertical timeline.
 *
 * This is the section that has to do the heaviest explaining — the event format is
 * genuinely complicated, and a student deciding whether to sign up needs to grasp it
 * in about fifteen seconds.
 */
export function FormatSection({ showSessions = false }: { showSessions?: boolean }) {
  return (
    <Section id="format" className="relative overflow-hidden">
      {/* Slow-drifting glow so the section is never completely static */}
      <div
        className="animate-drift pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--c-purple) 55%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="How it works"
          title="Three phases, about a month"
          lede="Open to everyone, structured so you can take part alongside a normal semester. Every phase runs both in person at Khalifa University and online."
        />

        <ol className="mt-14 space-y-0">
          {phases.map((phase, index) => {
            const badge = statusLabel(phase.status);
            const isLast = index === phases.length - 1;

            return (
              <li key={phase.slug}>
                <Reveal delay={index * 80}>
                  <div className="relative grid gap-6 pb-14 md:grid-cols-12 md:gap-10">
                    {/* Connector line down the timeline */}
                    {!isLast ? (
                      <span
                        className="absolute left-[15px] top-12 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold/50 to-border md:block"
                        aria-hidden="true"
                      />
                    ) : null}

                    {/* Phase marker + label */}
                    <div className="md:col-span-4 md:flex md:gap-5">
                      <span
                        className="relative hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-bg md:flex"
                        aria-hidden="true"
                      >
                        <span className="h-2 w-2 rounded-full bg-gold" />
                      </span>
                      <div>
                        <p className="font-mono text-2xs uppercase tracking-[0.18em] text-gold">
                          {phase.label}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-fg">{phase.title}</h3>
                        <p className="mt-1.5 font-mono text-xs text-fg-subtle">
                          {phase.dateRange}
                        </p>
                        {badge ? (
                          <div className="mt-3">
                            <Badge tone="neutral">{badge}</Badge>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Phase detail */}
                    <div className="md:col-span-8">
                      <p className="text-base leading-relaxed text-fg-muted">{phase.summary}</p>

                      {showSessions ? (
                        <ul className="mt-6 space-y-3">
                          {phase.sessions.map((session) => (
                            <li key={session.title} className="card p-5">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <h4 className="text-base font-semibold text-fg">
                                  {session.title}
                                </h4>
                                <span className="font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle">
                                  {session.time}
                                </span>
                              </div>
                              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                                {session.description}
                              </p>
                              <div className="mt-3.5 flex flex-wrap gap-2">
                                <Badge tone="sky">{formatLabel(session.format)}</Badge>
                                {statusLabel(session.status) ? (
                                  <Badge tone="neutral">{statusLabel(session.status)}</Badge>
                                ) : null}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
