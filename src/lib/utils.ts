import type { Status } from "@/content/types";

/** Join class names, dropping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Turn a status into the label shown on its badge, or null if no badge is needed. */
export function statusLabel(status: Status): string | null {
  if (status === "planning") return "Planning phase";
  if (status === "tentative") return "Tentative";
  if (status === "tba") return "To be announced";
  return null;
}

/** Human-readable label for a track or session format. */
export function formatLabel(format: "in-person" | "online" | "hybrid"): string {
  if (format === "in-person") return "In person";
  if (format === "online") return "Online";
  return "Hybrid";
}

/** Human-readable label for a difficulty level. */
export function levelLabel(
  level: "beginner" | "intermediate" | "advanced" | "all-levels",
): string {
  if (level === "all-levels") return "All levels";
  return level.charAt(0).toUpperCase() + level.slice(1);
}
