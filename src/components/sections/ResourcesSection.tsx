import { Reveal } from "@/components/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { ExternalLinkIcon } from "@/components/ui/Icons";
import { resources, resourcesSectionCopy } from "@/content/resources";

export function ResourcesSection() {
  return (
    <Section className="border-t border-border">
      <Container>
        <SectionHeading
          eyebrow={resourcesSectionCopy.eyebrow}
          title={resourcesSectionCopy.title}
          lede={resourcesSectionCopy.lede}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <Reveal key={resource.url} delay={(index % 3) * 45}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${resource.title} (opens in a new tab)`}
                className="card card-interactive group flex h-full flex-col p-6"
              >
                <h3 className="flex items-start justify-between gap-3 text-base font-semibold text-fg transition-colors group-hover:text-gold">
                  {resource.title}
                  <ExternalLinkIcon className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle transition-colors group-hover:text-gold" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{resource.description}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
