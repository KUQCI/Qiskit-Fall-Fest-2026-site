import type { Partner, SponsorTier } from "./types";

/**
 * PARTNERS AND SPONSORS
 *
 * Rule: an organisation appears here only once it has agreed in writing.
 *
 * Naming a company that is still "in conversation" is a public claim about them that
 * they have not consented to — it can cost you the sponsorship and embarrass the
 * university. Keep prospects in your own notes, not in this file.
 */
export const partners: Partner[] = [
  {
    name: "IBM Quantum",
    kind: "Fall Fest Host Program",
    url: "https://www.ibm.com/quantum",
    logo: "/partners/ibm-quantum.svg",
    status: "confirmed",
  },
  {
    name: "Khalifa University",
    kind: "Host Institution",
    url: "https://www.ku.ac.ae",
    logo: "/partners/khalifa-university.svg",
    status: "confirmed",
  },
];

/**
 * Academic partners inside Khalifa University.
 * These are the departments already in discussion about co-designing tracks.
 */
export const academicPartners: Partner[] = [
  { name: "Computer Science", kind: "Department", status: "tentative" },
  { name: "Computer & Information Engineering", kind: "Department", status: "tentative" },
  { name: "Biological Sciences", kind: "Department", status: "tentative" },
  { name: "Chemistry", kind: "Department", status: "tba" },
  { name: "Chemical Engineering", kind: "Department", status: "tba" },
  { name: "Petroleum Engineering", kind: "Department", status: "tba" },
];

/**
 * Sponsorship packages.
 *
 * Leave `price` as "" to hide the figure while packages are being finalised —
 * the card renders without a price line rather than showing a placeholder number.
 */
export const sponsorTiers: SponsorTier[] = [
  {
    name: "Track Partner",
    price: "",
    summary:
      "Co-design a track around a problem your team actually cares about, and watch students attack it for two weeks.",
    featured: true,
    benefits: [
      "Co-design one Fall Fest track with your own use case",
      "Your team mentors participants through the build",
      "Named as the track partner across the site and event materials",
      "Booth at the closing showcase",
      "Access to participant projects and, with consent, their CVs",
      "Speaking slot at the opening session",
    ],
  },
  {
    name: "Headline Sponsor",
    price: "",
    summary: "Top-level presence across the whole Fest, in person and online.",
    benefits: [
      "Logo placement across the site, stage, and event materials",
      "Booth at the closing showcase",
      "Speaking slot at the opening session",
      "Recognition in all announcements and post-event coverage",
    ],
  },
  {
    name: "Supporting Sponsor",
    price: "",
    summary: "Back the Fest and reach participants without running a track.",
    benefits: [
      "Logo on the site and event materials",
      "Booth at the closing showcase",
      "Recognition in event announcements",
    ],
  },
  {
    name: "In-Kind Partner",
    price: "",
    summary:
      "Support through prizes, hardware access, cloud credits, catering, or workshop space.",
    benefits: [
      "Logo on the site and event materials",
      "Recognition tied to what you provide",
      "Invitation to the closing showcase",
    ],
  },
];
