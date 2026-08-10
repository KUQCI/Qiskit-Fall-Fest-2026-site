import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui/primitives";
import { event } from "@/content/event";

export function StatsStrip() {
  return (
    <Container className="py-14 sm:py-16">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-8 lg:grid-cols-4">
        {event.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 60}>
            <div className="border-l-2 border-gold/30 pl-4 sm:pl-5">
              <dd className="tabular font-mono text-3xl font-semibold text-fg sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-sm font-medium text-fg sm:text-base">{stat.label}</dt>
              <p className="mt-1 text-xs leading-relaxed text-fg-subtle sm:text-sm">
                {stat.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </dl>
    </Container>
  );
}
