/** Shared, presentation-agnostic types for the site content. */

/** How firm a public detail is. */
export type Status = "confirmed" | "planning" | "tentative" | "tba";

/** A delivery format is optional until it has been agreed. */
export type Format = "in-person" | "online" | "hybrid";

/** A difficulty level is optional until track prerequisites have been agreed. */
export type Level = "beginner" | "intermediate" | "advanced" | "all-levels";

export interface Track {
  /** Stable internal anchor. Preserve this when a visible track name changes. */
  slug: string;
  /** Stable internal/decorative code. Do not invent replacements. */
  code: string;
  title: string;
  summary: string;
  description?: string;
  level?: Level;
  format?: Format;
  status: Status;
  partner?: string;
  highlights?: string[];
}

export interface Session {
  title: string;
  description: string;
  /** Omit rather than guessing an unconfirmed time or delivery format. */
  time?: string;
  format?: Format;
  status?: Status;
}

export interface Phase {
  slug: string;
  label: string;
  title: string;
  dateRange: string;
  summary: string;
  status: Status;
  sessions: Session[];
}

export interface Speaker {
  name: string;
  role: string;
  organization: string;
  photo?: string;
  bio?: string;
  status: Status;
}

/** @deprecated Use the single sponsorshipPackage export instead of tiers. */
export interface SponsorTier {
  name: string;
  price: string;
  summary: string;
  benefits: string[];
  featured?: boolean;
}

export interface Partner {
  name: string;
  logo?: string;
  url?: string;
  kind: string;
  status: Status;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface TeamMember {
  name: string;
  role: string;
  focus?: string;
}

export interface ResourceLink {
  title: string;
  description: string;
  url: string;
  group: "qiskit" | "learn" | "qci";
}

export interface PastEvent {
  title: string;
  meta: string;
  description: string;
  image: string;
  alt: string;
}

export interface ResearchProjectLink {
  label: string;
  url: string;
}

export interface ResearchProject {
  name: string;
  description: string;
  badge?: string;
  links: ResearchProjectLink[];
}

export interface PartnerReason {
  title: string;
  description: string;
}
