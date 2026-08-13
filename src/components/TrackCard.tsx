import { Badge } from "@/components/ui/primitives";
import type { Track } from "@/content/types";
import { cn, statusLabel } from "@/lib/utils";

/**
 * A deliberately honest track summary. Until challenges are final, cards show only
 * their broad direction and a single planning-state label.
 */
export function TrackCard({
  track,
  variant = "preview",
}: {
  track: Track;
  variant?: "preview" | "planning";
}) {
  const planning = variant === "planning";
  const badgeLabel = statusLabel(track.status) ?? "Planning phase";

  return (
    <article
      id={track.slug}
      className={cn(
        "card group relative flex h-full scroll-mt-28 flex-col overflow-hidden p-6",
        planning && "sm:p-8",
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink to-transparent opacity-60"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-2xs uppercase tracking-[0.18em] text-fg-subtle">
          {track.code}
        </span>
        <Badge tone={planning ? "purple" : "neutral"}>
          {badgeLabel}
        </Badge>
      </div>

      <h3 className={cn("mt-4 font-semibold text-fg", planning ? "text-2xl" : "text-xl")}>
        {track.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{track.summary}</p>

      <div className="mt-auto pt-8" aria-hidden="true">
        <span className="block h-px w-12 bg-pink transition-[width] duration-300 group-hover:w-20" />
      </div>
    </article>
  );
}
