import { Badge } from "@/components/ui/primitives";
import { CheckIcon } from "@/components/ui/Icons";
import type { Track } from "@/content/types";
import { cn, formatLabel, levelLabel, statusLabel } from "@/lib/utils";

const levelTone = {
  beginner: "success",
  intermediate: "sky",
  advanced: "purple",
  "all-levels": "neutral",
} as const;

export function TrackCard({ track, detailed = false }: { track: Track; detailed?: boolean }) {
  const badge = statusLabel(track.status);
  const isTba = track.status === "tba";

  return (
    <article
      id={track.slug}
      className={cn(
        "card card-interactive group relative flex h-full flex-col overflow-hidden p-6 scroll-mt-28",
        detailed && "sm:p-8",
      )}
    >
      {/* Gold sweep on hover — decorative, transform-only. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-2xs uppercase tracking-[0.18em] text-fg-subtle">
          {track.code}
        </span>
        {badge ? <Badge tone={isTba ? "neutral" : "gold"}>{badge}</Badge> : null}
      </div>

      <h3
        className={cn(
          "mt-3 font-semibold text-fg transition-colors group-hover:text-gold",
          detailed ? "text-2xl" : "text-xl",
        )}
      >
        {track.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{track.summary}</p>

      {/* Only render the long description when it exists and the track is not TBA —
          never invent content for a track that has not been designed yet. */}
      {detailed && !isTba && track.description ? (
        <p className="mt-4 text-sm leading-relaxed text-fg-muted">{track.description}</p>
      ) : null}

      {isTba ? (
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">
          Details coming soon
        </p>
      ) : null}

      {/* Highlights are gated on !isTba for the same reason as the description: a card
          that says "details coming soon" must not then list specific details. */}
      {detailed && !isTba && track.highlights?.length ? (
        <ul className="mt-5 space-y-2">
          {track.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2.5 text-sm text-fg-muted">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {track.partner ? (
        <p className="mt-4 text-xs text-fg-subtle">
          In partnership with <span className="text-sky">{track.partner}</span>
        </p>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        <Badge tone={levelTone[track.level]}>{levelLabel(track.level)}</Badge>
        <Badge tone="neutral">{formatLabel(track.format)}</Badge>
      </div>
    </article>
  );
}
