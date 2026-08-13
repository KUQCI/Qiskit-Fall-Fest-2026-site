import { fallFestAssets } from "./assets";
import type { Partner, PartnerReason, SponsorTier } from "./types";

/** Only organisations with a confirmed, public role belong here. */
export const partners: Partner[] = [
  {
    name: "IBM Quantum",
    kind: "IBM Quantum",
    url: "https://www.ibm.com/quantum",
    logo: fallFestAssets.logos.ibmQuantumWordmark.src,
    status: "confirmed",
  },
  {
    name: "Khalifa University",
    kind: "Khalifa University",
    url: "https://www.ku.ac.ae",
    logo: fallFestAssets.logos.khalifaUniversityTransparent.src,
    status: "confirmed",
  },
];

export const partnersIntro =
  "The Qiskit Fall Fest is IBM Quantum’s annual global event series. This PLUS edition is organised by the Quantum Computing Initiative at Khalifa University.";

export const partnerReasons: PartnerReason[] = [
  {
    title: "Shape a challenge or support a track",
    description:
      "Bring a real problem into the Fall Fest, help shape a challenge, or support participants through mentorship, workshops, resources, compute, or funding. Partners can contribute in the way that best fits their expertise.",
  },
  {
    title: "Connect with emerging quantum talent",
    description:
      "Engage directly with students building across different areas of quantum computing. See how participants approach real problems, share expertise during the challenge period, and meet the teams behind the projects.",
  },
  {
    title: "Visibility & ecosystem connection",
    description:
      "Partners can be recognised across the event and connect with students, researchers, and other organisations during the closing showcase. The partnership also offers a way to contribute directly to the growth of the UAE’s quantum computing ecosystem.",
  },
];

export const sponsorshipPackage = {
  title: "Sponsorship Packages",
  status: "in-development",
  description:
    "Packages and benefits are currently being finalized. Support may include track involvement, funding, mentorship, resources, visibility, and participation in the closing showcase. We also welcome flexible partnerships and are happy to discuss support that fits your organisation’s goals.",
} as const;

export const partnersPageContent = {
  eyebrow: "Partners",
  title: "Build the ecosystem with us",
  lede:
    "Bring your challenges, expertise, and ideas to the Fall Fest. Support participants throughout the challenge period, then join us at the closing showcase to meet the teams, explore their projects, and connect with other industry partners, researchers, and the wider quantum community.",
  reasonsEyebrow: "Why partner with us",
  reasonsTitle: "What a partnership actually gets you",
  packagesEyebrow: "Packages",
  packagesTitle: "Ways to support the Fest",
  contactTitle: "Talk to the organizing team",
  contactDescription:
    "Tell us about what you or your organisation works on, your interests, and how you’d like to get involved. We’ll work with you to explore a contribution or partnership that fits your goals and the needs of the Fall Fest.",
  contactActionLabel: "Start a conversation",
  metadataDescription:
    "Partner with Qiskit Fall Fest 2026 through challenges, mentorship, resources, funding, or participation in the closing showcase at Khalifa University.",
} as const;

/** @deprecated Academic partner claims are intentionally removed. */
export const academicPartners: Partner[] = [];

/** @deprecated Kept briefly for compatibility; consume sponsorshipPackage instead. */
export const sponsorTiers: SponsorTier[] = [
  {
    name: sponsorshipPackage.title,
    price: "",
    summary: sponsorshipPackage.description,
    benefits: [],
  },
];
