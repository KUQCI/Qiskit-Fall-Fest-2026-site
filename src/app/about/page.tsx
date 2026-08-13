import type { Metadata } from "next";
import Image from "next/image";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/ui/Icons";
import { fallFestAssets } from "@/content/assets";
import { event } from "@/content/event";
import {
  aboutContent,
  advisor,
  pastEvents,
  researchProjects,
  speakers,
} from "@/content/team";

export const metadata: Metadata = {
  title: "About",
  description: aboutContent.metadataDescription,
};

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
        eyebrow={aboutContent.organizersEyebrow}
        title={aboutContent.organizersTitle}
        lede={aboutContent.organizersSubtitle}
      />

      <div className="relative py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <a
                href={event.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-interactive group relative flex aspect-square min-h-44 items-center justify-center overflow-hidden p-8 sm:p-12"
                aria-label={`${aboutContent.organizersSubtitle} website (opens in a new tab)`}
              >
                <Image
                  src={fallFestAssets.logos.qciLogoFit.src}
                  alt="Quantum Computing Initiative and Club logo"
                  width={720}
                  height={720}
                  className="h-auto w-full max-w-sm object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  priority
                />
              </a>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={80}>
              <div className="max-w-2xl">
                <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
                  {aboutContent.organizersDescription}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      <Section className="border-t border-border bg-surface/25">
        <Container>
          <SectionHeading eyebrow={aboutContent.facultyAdvisorEyebrow} title={advisor.name} />
          <div className="mt-8 max-w-3xl">
            <p className="font-mono text-sm text-sky">{advisor.organization}</p>
            <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
              {aboutContent.facultyAdvisorDescription}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <SectionHeading
            eyebrow={aboutContent.pastEventsEyebrow}
            title={aboutContent.pastEventsTitle}
            lede={aboutContent.pastEventsDescription}
          />

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {pastEvents.map((pastEvent, index) => (
              <Reveal as="li" key={pastEvent.title} delay={index * 70}>
                <article className="card h-full overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-2">
                    <Image
                      src={pastEvent.image}
                      alt={pastEvent.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                    <p className="font-mono text-2xs uppercase tracking-[0.16em] text-sky">
                      {pastEvent.meta}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-fg">{pastEvent.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                      {pastEvent.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          <a
            href={event.socials.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${aboutContent.moreFromQciLabel} (opens in a new tab)`}
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-gold underline-offset-4 hover:underline"
          >
            {aboutContent.moreFromQciLabel}
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface/25">
        <Container>
          <SectionHeading
            eyebrow={aboutContent.researchEyebrow}
            title={aboutContent.researchTitle}
            lede={aboutContent.researchDescription}
          />

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {researchProjects.map((project, index) => (
              <Reveal as="li" key={project.name} delay={index * 60}>
                <article className="card flex h-full flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-fg">{project.name}</h3>
                    {project.badge ? <Badge tone="purple">{project.badge}</Badge> : null}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
                    {project.description}
                  </p>
                  {project.links.length > 0 ? (
                    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                      {project.links.map((link) => (
                        <li key={`${project.name}-${link.url}`}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${link.label} for ${project.name} (opens in a new tab)`}
                            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold underline-offset-4 hover:underline"
                          >
                            {link.label}
                            <ExternalLinkIcon className="h-3.5 w-3.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </ul>

          <a
            href={event.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${aboutContent.exploreProjectsLabel} (opens in a new tab)`}
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-gold underline-offset-4 hover:underline"
          >
            {aboutContent.exploreProjectsLabel}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <SectionHeading
            eyebrow={aboutContent.speakersEyebrow}
            title={aboutContent.speakersTitle}
            lede={aboutContent.speakersDescription}
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
                <h3 className="text-base font-medium text-fg">
                  {aboutContent.speakersEmptyTitle}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  {aboutContent.speakersEmptyDescription}
                </p>
              </div>
              <a
                href={event.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${aboutContent.followAnnouncementsLabel} (opens in a new tab)`}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-gold hover:text-gold"
              >
                {aboutContent.followAnnouncementsLabel}
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </div>
          )}
        </Container>
      </Section>

      <ResourcesSection />
      <CtaSection variant="opening" />
    </>
  );
}
