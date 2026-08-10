import type { Phase } from "./types";

/**
 * The three phases of the Fall Fest.
 *
 * `dateRange` is free text on purpose — it reads fine as "Late October 2026" now and
 * as "26 October 2026" once the dates are locked, with no code change needed.
 */
export const phases: Phase[] = [
  {
    slug: "opening",
    label: "Phase 01",
    title: "Opening Day",
    dateRange: "Late October 2026",
    summary:
      "A hybrid opening session that introduces the Fest, walks through every track, and sets expectations for the two weeks that follow. Student clubs and organisations from across the UAE are invited to set up in the KU spine for the day.",
    status: "tentative",
    sessions: [
      {
        title: "Welcome & Fall Fest Briefing",
        time: "Morning",
        description:
          "What the Fall Fest is, how IBM's global Fall Fest programme works, and how the two weeks are structured.",
        format: "hybrid",
        status: "tentative",
      },
      {
        title: "Track Introductions",
        time: "Midday",
        description:
          "Each track lead presents their challenge, the level assumed, and what a strong submission looks like.",
        format: "hybrid",
        status: "tentative",
      },
      {
        title: "Club & Organisation Showcase",
        time: "Afternoon",
        description:
          "Student clubs and organisations from universities across the UAE set up in the spine to meet participants and each other.",
        format: "in-person",
        status: "tentative",
      },
      {
        title: "Team Formation",
        time: "Late afternoon",
        description:
          "Find teammates. Coming alone is fine — most people do, and this session exists for exactly that.",
        format: "hybrid",
        status: "tentative",
      },
    ],
  },
  {
    slug: "hacking",
    label: "Phase 02",
    title: "Two Weeks of Building",
    dateRange: "Approximately two weeks",
    summary:
      "The core of the Fest. Every track runs its own workshops and mentorship while teams build. Depending on the track, you will pass through proposal reviews, technical milestones, or coding qualifiers before the finals.",
    status: "tentative",
    sessions: [
      {
        title: "Track Workshops",
        time: "Throughout",
        description:
          "Hands-on sessions run per track, from Qiskit fundamentals to track-specific methods. Recorded for online participants.",
        format: "hybrid",
        status: "tentative",
      },
      {
        title: "Mentor Office Hours",
        time: "Throughout",
        description:
          "Scheduled time with mentors from QCI, KU faculty, and partner organisations. Bring a broken circuit.",
        format: "hybrid",
        status: "tentative",
      },
      {
        title: "Milestone Check-ins",
        time: "Mid-period",
        description:
          "Proposal reviews for pitch-style tracks, and coding qualifiers for challenge tracks, used to shortlist finalists.",
        format: "hybrid",
        status: "tentative",
      },
      {
        title: "Final Submissions",
        time: "End of period",
        description: "Code, documentation, and a short write-up or recorded demo per track.",
        format: "online",
        status: "tentative",
      },
    ],
  },
  {
    slug: "closing",
    label: "Phase 03",
    title: "Closing Showcase",
    dateRange: "20 November 2026",
    summary:
      "The festival itself. Finalists present their work, industry partners run networking booths, and the Fest closes with the awards ceremony.",
    status: "tentative",
    sessions: [
      {
        title: "Finalist Presentations",
        time: "Morning",
        description:
          "Shortlisted teams present to a judging panel, in the format their track calls for — a pitch, a demo, or a technical defence.",
        format: "hybrid",
        status: "tentative",
      },
      {
        title: "Industry Networking Booths",
        time: "Throughout",
        description:
          "Partner organisations set up alongside the showcase, open to every participant, not only finalists.",
        format: "in-person",
        status: "tentative",
      },
      {
        title: "Keynote",
        time: "Afternoon",
        description: "Speaker to be announced.",
        format: "hybrid",
        status: "tba",
      },
      {
        title: "Awards & Closing",
        time: "Evening",
        description: "Track winners, prizes, and closing remarks.",
        format: "hybrid",
        status: "tentative",
      },
    ],
  },
];
