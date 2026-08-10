import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { TrackCard } from "@/components/TrackCard";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container, Section } from "@/components/ui/primitives";
import { tracks } from "@/content/tracks";

export const metadata: Metadata = {
  title: "Tracks",
  description:
    "Six independent Qiskit Fall Fest tracks, from your first qubit through quantum machine learning, cybersecurity, chemistry, and finance.",
};

export default function TracksPage() {
  const beginnerCount = tracks.filter(
    (track) => track.level === "beginner" || track.level === "all-levels",
  ).length;

  return (
    <>
      <PageHeader
        eyebrow="Tracks"
        title="Six tracks, one Fall Fest"
        lede="Each track runs independently with its own workshops, mentors, and community space. Join one, or follow along with several — there is no requirement to pick early."
      />

      <Section>
        <Container>
          <div className="card mb-10 flex flex-col gap-3 border-gold/25 bg-gold/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <h2 className="text-lg font-semibold text-fg">New to quantum computing?</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                {beginnerCount} of the six tracks assume no prior experience. Start with{" "}
                <a href="#first-qubit" className="font-medium text-gold underline-offset-4 hover:underline">
                  Your First Qubit
                </a>
                .
              </p>
            </div>
          </div>

          <ul className="grid gap-5 md:grid-cols-2">
            {tracks.map((track, index) => (
              <Reveal as="li" key={track.slug} delay={(index % 2) * 60}>
                <TrackCard track={track} detailed />
              </Reveal>
            ))}
          </ul>

          <p className="mt-10 text-sm leading-relaxed text-fg-subtle">
            Track details are still being finalised with our academic and industry partners.
            Anything marked tentative may change, and tracks marked &ldquo;to be
            announced&rdquo; will be filled in here as soon as they are confirmed.
          </p>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
