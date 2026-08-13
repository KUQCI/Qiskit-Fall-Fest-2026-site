import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui/primitives";
import { event } from "@/content/event";

export function StatsStrip() {
  return (
    <Container className="py-12 sm:py-16">
      <dl className="grid gap-4 sm:grid-cols-3">
        {event.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 60}>
            <div className="card h-full border-l-2 border-l-pink/60 p-5 sm:p-6">
              <dd className="tabular font-mono text-3xl font-semibold text-fg sm:text-4xl">
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
