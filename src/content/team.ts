import type { Speaker, TeamMember } from "./types";

/**
 * ORGANISING TEAM
 *
 * TODO(team): confirm every role title below before launch. These were drafted from
 * who was doing what during planning — check with each person that they are happy
 * with how they are described publicly, and that they want to be listed at all.
 */
export const organizingTeam: TeamMember[] = [
  {
    name: "Muhammad Awais Afzal Mirza",
    role: "Fall Fest Lead",
    focus: "IBM application, sponsorships, university approvals",
  },
  {
    name: "Osama Ahmed Mahmoud Mohamed Elmahdy",
    role: "Co-Lead",
    focus: "Programme design and research",
  },
  {
    name: "Malak Al Qedrah",
    role: "Events Chair",
    focus: "Logistics, venue, on-the-day coordination",
  },
  {
    name: "Rewan Fathi Elsayed Fathi Ramadan",
    role: "Outreach & Partnerships",
    focus: "Faculty and industry outreach",
  },
  {
    name: "Ahmed Ghandour",
    role: "Technology & Web",
    focus: "Website, tooling, operations",
  },
  {
    name: "Abdullah Hammadi",
    role: "Programme Design",
    focus: "Track structure and format",
  },
  {
    name: "Mena Abdelmoneim",
    role: "Academic Programmes",
    focus: "Workshops and educational content",
  },
  {
    name: "Shahad Rikas",
    role: "Research & Development",
    focus: "Technical content and open-source projects",
  },
];

/** Faculty advisor to the Quantum Computing Initiative. */
export const advisor = {
  name: "Prof. Ibrahim Elfadel",
  role: "Faculty Advisor",
  organization: "Computer and Information Engineering, Khalifa University",
  bio:
    "Professor of Computer and Information Engineering at Khalifa University and advisor to the Quantum Computing Initiative. Formerly a Research Scientist at IBM, and general chair of IEEE BioCAS 2025 at Khalifa University.",
};

/**
 * SPEAKERS
 *
 * Empty until people have actually agreed to speak. While this array is empty, the
 * speakers section renders an honest "being confirmed" state instead of placeholder
 * cards. Add entries as confirmations come in.
 */
export const speakers: Speaker[] = [];
