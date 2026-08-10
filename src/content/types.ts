/**
 * Shared types for every content file in this folder.
 *
 * If you are editing event content, you probably do not need this file — edit the
 * data files directly (event.ts, tracks.ts, ...). This exists so your editor can
 * autocomplete fields and warn you when something is missing or misspelled.
 */

/**
 * How firm a piece of information is. This drives the badge shown on the site, so the
 * page always tells the truth about what has actually been agreed.
 *
 *   confirmed — agreed in writing. Safe to announce publicly.
 *   tentative — planned and likely, but not finalised. Shows a "Tentative" badge.
 *   tba       — placeholder. Renders as "Details coming soon" instead of the content.
 */
export type Status = "confirmed" | "tentative" | "tba";

/** Where a track or session actually happens. */
export type Format = "in-person" | "online" | "hybrid";

/** Assumed prior quantum computing knowledge. */
export type Level = "beginner" | "intermediate" | "advanced" | "all-levels";

export interface Track {
  /** URL-safe id. Also used as the anchor link on /tracks. */
  slug: string;
  /** Short code shown in mono type on the card, e.g. "QML-01". */
  code: string;
  title: string;
  /** One or two sentences. Shown on the card and at the top of the track detail. */
  summary: string;
  /** Longer description. Optional — omit while the track is still being designed. */
  description?: string;
  level: Level;
  format: Format;
  status: Status;
  /** Organisation co-designing the track, if any. Only name confirmed partners. */
  partner?: string;
  /** Bullet points: what participants will actually build or learn. */
  highlights?: string[];
}

export interface Session {
  title: string;
  /** Free text so it works before exact times are known, e.g. "Day 1, morning". */
  time: string;
  description: string;
  format: Format;
  status: Status;
}

export interface Phase {
  slug: string;
  /** e.g. "Phase 01". Displayed in mono type. */
  label: string;
  title: string;
  /** Human-readable date range, e.g. "Mid-November 2026" while dates are unconfirmed. */
  dateRange: string;
  summary: string;
  status: Status;
  sessions: Session[];
}

export interface Speaker {
  name: string;
  role: string;
  organization: string;
  /** Path under /public, e.g. "/speakers/name.jpg". Falls back to initials if omitted. */
  photo?: string;
  bio?: string;
  status: Status;
}

export interface SponsorTier {
  name: string;
  /** Displayed as-is. Use "" to hide pricing while packages are being finalised. */
  price: string;
  summary: string;
  benefits: string[];
  /** Draws the highlighted border. Use on at most one tier. */
  featured?: boolean;
}

export interface Partner {
  name: string;
  /**
   * Logo image. Falls back to a name plate when omitted (the current behaviour —
   * nothing renders `logo` yet).
   *
   * IMPORTANT when you start rendering these: a bare "/partners/ibm.svg" path is NOT
   * rewritten with the GitHub Pages basePath and will 404 in production. Import the
   * image instead (`import ibm from "@/assets/partners/ibm.svg"`), the way the QCI
   * seal is handled in src/app/about/page.tsx.
   */
  logo?: string;
  url?: string;
  /** e.g. "Host Program", "Academic Partner". */
  kind: string;
  status: Status;
}

export interface FaqItem {
  question: string;
  /** Plain text. Kept free of markup so anyone can edit it safely. */
  answer: string;
  category: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** Optional — omit rather than guessing. */
  focus?: string;
}

export interface ResourceLink {
  title: string;
  description: string;
  url: string;
  /** Groups the link on the resources strip. */
  group: "qiskit" | "learn" | "qci";
}
