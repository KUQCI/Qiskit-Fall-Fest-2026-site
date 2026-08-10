/**
 * Core event details. This is the file you will edit most often.
 *
 * Everything here appears in multiple places across the site — change a value once
 * and it updates everywhere.
 */

export const event = {
  name: "Qiskit Fall Fest 2026",
  host: "Quantum Computing Initiative",
  hostShort: "QCI",
  university: "Khalifa University",
  tagline: "The first Qiskit Fall Fest in the GCC",

  /**
   * One-paragraph description. Used in the hero, the page meta description, and
   * social share cards.
   */
  intro:
    "Two weeks of quantum computing built for people who are curious, not credentialed. " +
    "Six tracks, hands-on workshops, mentors who answer questions, and a closing showcase " +
    "at Khalifa University — open to students across the UAE in person and to the wider " +
    "quantum community online.",

  /**
   * COUNTDOWN TARGET — the closing showcase date.
   *
   * ISO 8601 with the Gulf Standard Time offset (+04:00) so the countdown is correct
   * for every visitor regardless of their own timezone.
   *
   * TODO(team): confirm the exact start time with Campus Life before launch.
   */
  countdownTarget: "2026-11-20T09:00:00+04:00",

  /**
   * Headline date range shown in the hero, under the title.
   * TODO(team): replace once opening and closing dates are locked.
   */
  dateLabel: "October – November 2026",
  closingDateLabel: "20 November 2026",

  venue: {
    name: "Khalifa University",
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    /** TODO(team): add the building/room once Campus Life confirms the booking. */
    detail: "Main Campus",
    mapUrl: "https://maps.google.com/?q=Khalifa+University+Abu+Dhabi",
  },

  /**
   * REGISTRATION LINK.
   *
   * Set this to the live registration URL (Google Form, Luma, Cvent, whatever you
   * choose) and every Register button across the site points at it.
   *
   * While it is null, all Register buttons render as a disabled
   * "Registration opens soon" state instead of a dead link.
   */
  registrationUrl: null as string | null,
  registrationNote: "Registration opens soon — dates will be announced here first.",

  /** Public contact. TODO(team): swap for the dedicated Fall Fest address once created. */
  contactEmail: "quantum@ku.ac.ae",

  socials: {
    instagram: "https://instagram.com/ku.qci",
    linkedin: "https://www.linkedin.com/company/ku-qci",
    github: "https://github.com/KUQCI",
  },

  /**
   * Headline numbers in the hero strip.
   *
   * `value` is rendered exactly as written. Anything aspirational must say so —
   * do not present a target as an achieved figure.
   */
  stats: [
    { value: "6", label: "Tracks", detail: "From first qubit to research-level" },
    { value: "2", label: "Weeks", detail: "Workshops, mentorship, building" },
    { value: "5,000", label: "Participants targeted", detail: "In person and online" },
    { value: "1st", label: "In the GCC", detail: "Qiskit Fall Fest in the region" },
  ],
} as const;

export type EventConfig = typeof event;
