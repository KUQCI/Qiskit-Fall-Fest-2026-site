import { cn } from "@/lib/utils";

/**
 * Horizontally drifting strip that never stops.
 *
 * The children are rendered twice and the track translates by -50%, so the seam
 * lands exactly where the sequence restarts and the loop is invisible. The second
 * copy is aria-hidden so screen readers do not read the list twice.
 *
 * Pauses on hover (see `.marquee-host` in globals.css) and stops entirely under
 * prefers-reduced-motion.
 */
export function Marquee({
  children,
  slow = false,
  className,
}: {
  children: React.ReactNode;
  slow?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "marquee-host relative flex overflow-hidden",
        // Fade the strip out at both edges so items don't clip harshly.
        "[mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <div className={cn("flex w-max shrink-0", slow ? "animate-marquee-slow" : "animate-marquee")}>
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
