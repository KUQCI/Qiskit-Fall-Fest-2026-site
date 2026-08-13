import type { Track } from "./types";

/**
 * Broad track directions only. Challenges, prerequisites, formats, partners, and
 * judging details remain intentionally unpublished while each track is developed.
 * Stable slugs and codes are preserved from the original data.
 */
export const tracks: Track[] = [
  {
    slug: "first-qubit",
    code: "INTRO-05",
    title: "Quantum Computing Foundations",
    summary:
      "Build a foundation in quantum computing and Qiskit through core concepts and hands-on exploration.",
    status: "planning",
  },
  {
    slug: "quantum-machine-learning",
    code: "QML-01",
    title: "Quantum Machine Learning",
    summary:
      "Explore the intersection of quantum computing and machine learning, including how quantum and classical approaches can work together.",
    status: "planning",
  },
  {
    slug: "quantum-cybersecurity",
    code: "SEC-02",
    title: "Quantum Cybersecurity",
    summary:
      "Explore quantum computing in the context of cybersecurity and cryptography, including the opportunities and challenges created by quantum technologies.",
    status: "planning",
  },
  {
    slug: "chemistry-drug-discovery",
    code: "CHEM-03",
    title: "Quantum Computing & Biology",
    summary:
      "Explore potential applications of quantum computing across biology, chemistry, and the life sciences.",
    status: "planning",
  },
  {
    slug: "quantum-finance",
    code: "FIN-04",
    title: "Quantum & Energy",
    summary:
      "Explore potential applications of quantum computing across energy systems, sustainability, and related optimization challenges.",
    status: "planning",
  },
  {
    slug: "open-innovation",
    code: "OPEN-06",
    title: "Open Innovation",
    summary:
      "A flexible track for quantum computing ideas and applications that extend beyond the other track areas.",
    status: "planning",
  },
];

export const featuredTrackSlugs = [
  "first-qubit",
  "quantum-machine-learning",
  "quantum-cybersecurity",
  "chemistry-drug-discovery",
] as const;

export const tracksPageContent = {
  eyebrow: "Tracks",
  title: "Find your path into quantum",
  intro:
    "Explore tracks ranging from quantum fundamentals to specialized applications. Each track runs independently, so participants can choose the area that best matches their interests.",
  note:
    "Note: Track details are currently in development, with challenges and full information to be announced soon.",
  metadataDescription:
    "Explore the six planning-stage Qiskit Fall Fest tracks, from quantum computing foundations to specialized applications and open innovation.",
} as const;
