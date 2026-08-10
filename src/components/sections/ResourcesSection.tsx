import { Reveal } from "@/components/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { resources } from "@/content/resources";

/**
 * Links to IBM Quantum's own learning material.
 *
 * Prof. Elfadel specifically asked that the site link to the Qiskit Fall Fest page and
 * the IBM Quantum resources, so these are given a real section rather than being
 * buried in the footer.
 */
export function ResourcesSection() {
  return (
    <Section className="border-t border-border">
      <Container>
        <SectionHeading
          eyebrow="Start learning now"
          title="You can begin before the Fest does"
          lede="Everything below is free. If you want to arrive already knowing how to run a circuit, start with IBM Quantum Learning."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <Reveal key={resource.url} delay={index * 60}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-interactive group flex h-full flex-col p-6"
              >
                <h3 className="flex items-start justify-between gap-3 text-base font-semibold text-fg transition-colors group-hover:text-gold">
                  {resource.title}
                  <ArrowRightIcon className="mt-0.5 h-4 w-4 shrink-0 -rotate-45 text-fg-subtle transition-all duration-200 group-hover:text-gold" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {resource.description}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
