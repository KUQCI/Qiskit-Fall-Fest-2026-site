import type { FaqItem } from "./types";

export const faqPageContent = {
  eyebrow: "FAQ",
  title: "Questions, answered honestly",
  lede:
    "The event is still being developed. Here is what is known now, and where details depend on the final track or programme.",
  contactTitle: "Still have a question?",
  contactDescription:
    "Ask the organizing team directly. We’ll answer what we can and update this page as event details are confirmed.",
  contactActionLabel: "Ask a question",
  metadataDescription:
    "Answers to common questions about Qiskit Fall Fest 2026, including experience, teams, equipment, eligibility, format, dates, and registration.",
} as const;

/** Categories become the filter tabs on the full FAQ page. */
export const faqs: FaqItem[] = [
  {
    category: "Getting started",
    question: "Do I need to know quantum computing already?",
    answer:
      "No. Some tracks will be designed to introduce participants to quantum computing, while others will explore more specialized applications. Final track requirements and prerequisites will be published as development progresses.",
  },
  {
    category: "Getting started",
    question: "Do I need a team?",
    answer:
      "Team requirements will depend on the track. Some challenges may allow individual participation, while others may involve teams. Full participation and team-format details will be announced with the tracks.",
  },
  {
    category: "Getting started",
    question: "What do I need to bring?",
    answer:
      "For in-person activities, participants should expect to bring a laptop. Any required software, accounts, datasets, or other track-specific resources will be communicated before the event.",
  },
  {
    category: "Getting started",
    question: "How much time does this actually take?",
    answer:
      "The main challenge period runs for approximately two weeks. The exact workload will vary by track, and more detailed expectations will be published once the challenges are finalized.",
  },
  {
    category: "Eligibility",
    question: "Who can take part?",
    answer:
      "The Fall Fest is being designed for participants with a range of backgrounds and experience levels. Some activities will take place at Khalifa University, while others may be available online internationally. Detailed eligibility and registration requirements will be announced with each track.",
  },
  {
    category: "Eligibility",
    question: "Do I have to be a Khalifa University student?",
    answer:
      "The event is not being designed only for Khalifa University students. Exact eligibility may vary by track or activity, and the full requirements will be published with registration information.",
  },
  {
    category: "Eligibility",
    question: "Is there a fee?",
    answer:
      "Participation is currently planned to be free. Final registration information, including any requirements for individual activities, will be published before registration opens.",
  },
  {
    category: "Format",
    question: "What does hybrid actually mean here?",
    answer:
      "The opening session will be available at Khalifa University and online internationally. Formats during the challenge period and closing showcases may vary by track, and will be labelled when those details are finalized.",
  },
  {
    category: "Format",
    question: "Can I join from outside the UAE?",
    answer:
      "The opening session will be available online internationally, and some later activities may also support online participation. Track-specific access and eligibility will be announced with the full track details.",
  },
  {
    category: "Format",
    question: "What happens at the closing showcase?",
    answer:
      "The closing phase is planned to include project showcases, coding competitions, industry showcase and networking, and winner announcements. The exact format and date or dates will be announced as the programme is finalized.",
  },
  {
    category: "Format",
    question: "How are finalists selected?",
    answer:
      "Selection will depend on the track. Some tracks may include an intermediate submission or shortlisting stage, while others may use a different process. Criteria will be published before participants begin each challenge.",
  },
  {
    category: "The Fest",
    question: "What is the Qiskit Fall Fest?",
    answer:
      "Qiskit Fall Fest is IBM Quantum’s annual global event series. Each event is independently organized by an approved host institution as part of the wider IBM Quantum and Qiskit community.",
  },
  {
    category: "The Fest",
    question: "Who is organizing this?",
    answer:
      "The event is organized by the Quantum Computing Initiative and Club at Khalifa University as part of the Qiskit Fall Fest event series.",
  },
  {
    category: "The Fest",
    question: "When will the exact dates be announced?",
    answer:
      "The Fall Fest begins on 19 October 2026 at 6:00 PM UAE time. The closing showcase date or dates and the remaining programme details will be announced here once they are confirmed.",
  },
];
