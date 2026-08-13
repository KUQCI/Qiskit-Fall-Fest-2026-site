import Image from "next/image";

import { Container, Eyebrow } from "@/components/ui/primitives";
import { fallFestAssets } from "@/content/assets";
import { cn } from "@/lib/utils";

export type PageHeaderArt = "tracks" | "schedule" | "partners" | "about" | "faq";

const artwork = {
  tracks: {
    src: fallFestAssets.stickers.sticker08.src,
    frameClass: "rotate-[-2deg] bg-purple/10",
    glowClass: "bg-purple/20",
    imageClass: "object-contain p-4 sm:p-5",
  },
  schedule: {
    src: fallFestAssets.stickers.sticker09.src,
    frameClass: "rotate-[2deg] bg-pink/10",
    glowClass: "bg-pink/20",
    imageClass: "object-contain p-4 sm:p-5",
  },
  partners: {
    src: fallFestAssets.stickers.sticker07.src,
    frameClass: "rotate-[-2deg] bg-purple/10",
    glowClass: "bg-pink/20",
    imageClass: "object-contain p-2 sm:p-3",
  },
  about: {
    src: fallFestAssets.stickers.sticker04.src,
    frameClass: "rotate-[2deg] bg-sky/10",
    glowClass: "bg-purple/20",
    imageClass: "object-contain p-2 sm:p-3",
  },
  faq: {
    src: fallFestAssets.stickers.sticker01.src,
    frameClass: "rotate-[-2deg] bg-sky/10",
    glowClass: "bg-gold/15",
    imageClass: "object-contain p-2 sm:p-3",
  },
} satisfies Record<
  PageHeaderArt,
  { src: string; frameClass: string; glowClass: string; imageClass: string }
>;

/** Shared interior-page masthead with a restrained, page-specific Fall Fest composition. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  art,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  art?: PageHeaderArt;
}) {
  const selectedArtwork = art ? artwork[art] : null;

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 top-8 h-40 w-72 -rotate-6 rounded-full bg-purple/10 blur-3xl" aria-hidden="true" />

      <Container className="relative grid items-center gap-9 py-16 sm:py-20 md:grid-cols-12 md:gap-8 lg:py-24">
        <div className={selectedArtwork ? "md:col-span-8" : "md:col-span-12"}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] sm:text-5xl lg:text-7xl">
            {title}
          </h1>
          {lede ? (
            <p className="mt-6 max-w-[68ch] text-base leading-relaxed text-fg-muted sm:text-lg">
              {lede}
            </p>
          ) : null}
        </div>

        {selectedArtwork ? (
          <div
            className="relative mx-auto h-40 w-full max-w-sm md:col-span-4 md:h-52 lg:h-60"
            aria-hidden="true"
          >
            <div
              className={cn(
                "absolute inset-5 rounded-[2rem] blur-2xl",
                selectedArtwork.glowClass,
              )}
            />
            <div
              className={cn(
                "absolute inset-2 overflow-hidden rounded-[2rem] border border-border-strong shadow-[0_24px_80px_rgba(5,7,24,0.28)]",
                selectedArtwork.frameClass,
              )}
            >
              <div className="absolute inset-0 bg-grid opacity-20" />
              <Image
                src={selectedArtwork.src}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 90vw"
                className={selectedArtwork.imageClass}
              />
            </div>
            <span className="absolute left-0 top-1/2 h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
            <span className="absolute right-1 top-3 h-2 w-2 rounded-full bg-pink shadow-[0_0_16px_var(--c-pink)]" />
            <span className="absolute bottom-2 right-10 h-1.5 w-1.5 rounded-full bg-purple" />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
