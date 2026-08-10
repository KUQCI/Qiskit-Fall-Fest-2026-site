import type { FaqItem } from "./types";

/**
 * Frequently asked questions, grouped by `category`.
 *
 * Categories render as filter tabs on /faq in the order they first appear here.
 * Keep answers plain text — no markdown, no HTML — so anyone can edit them safely.
 */
export const faqs: FaqItem[] = [
  {
    category: "Getting started",
    question: "Do I need to know quantum computing already?",
    answer:
      "No. The Your First Qubit track assumes nothing — not physics, not linear algebra, not Qiskit. It is built for people hearing about quantum computing for the first time, including high school students and non-engineering majors. Everything you need is taught during the Fest.",
  },
  {
    category: "Getting started",
    question: "Do I need a team?",
    answer:
      "No. Most people arrive without one. There is a dedicated team formation session at the end of the opening day, and every track has a community space where you can find teammates. You can also take part solo if you would rather.",
  },
  {
    category: "Getting started",
    question: "What do I need to bring?",
    answer:
      "A laptop and curiosity. Qiskit is free and open source, and IBM Quantum accounts are free — we will walk you through the setup during the first workshop if you have not done it before.",
  },
  {
    category: "Getting started",
    question: "How much time does this actually take?",
    answer:
      "The hacking period runs about two weeks, but it is designed around a normal semester. Workshops are recorded, mentor office hours are scheduled rather than continuous, and the beginner track is deliberately lighter. Plan for a few hours a week, more if you are chasing a finals spot.",
  },
  {
    category: "Eligibility",
    question: "Who can take part?",
    answer:
      "In-person tracks are open to university students across the UAE. Online tracks are open internationally. Some beginner sessions also welcome high school students. If you are unsure whether you qualify, email us and ask.",
  },
  {
    category: "Eligibility",
    question: "Do I have to be a Khalifa University student?",
    answer:
      "No. KU hosts the Fest, but it is open to students from every university in the UAE for in-person tracks, and to anyone worldwide for the online tracks.",
  },
  {
    category: "Eligibility",
    question: "Is there a fee?",
    answer:
      "No. Taking part in the Qiskit Fall Fest is free.",
  },
  {
    category: "Format",
    question: "What does hybrid actually mean here?",
    answer:
      "Some tracks run in person at Khalifa University, some run entirely online, and some run both. Every track card on this site is labelled with its format, so you can tell before you register.",
  },
  {
    category: "Format",
    question: "Can I join from outside the UAE?",
    answer:
      "Yes, through the online tracks. Workshops are recorded and materials are shared, so you are not dependent on being awake at Gulf Standard Time. Only the in-person sessions and the physical showcase require being on campus.",
  },
  {
    category: "Format",
    question: "What happens at the closing showcase?",
    answer:
      "Shortlisted teams present their work to a judging panel in whatever format their track calls for — a pitch, a demo, or a technical defence. Industry partners run networking booths open to all participants, not just finalists, and the day ends with the awards ceremony.",
  },
  {
    category: "Format",
    question: "How are finalists selected?",
    answer:
      "It depends on the track. Pitch-style tracks use a proposal review partway through the hacking period. Challenge tracks run a coding qualifier. Both exist to keep the in-person finals to a workable size — online participation is not capped.",
  },
  {
    category: "The Fest",
    question: "What is the Qiskit Fall Fest?",
    answer:
      "It is IBM Quantum's annual global event series. Each Fall Fest is independently hosted by an approved institution, so it is that institution's own event while also being part of the wider IBM Quantum ecosystem. Ours is the first in the GCC.",
  },
  {
    category: "The Fest",
    question: "Who is organising this?",
    answer:
      "The Quantum Computing Initiative, a student organisation at Khalifa University, advised by Prof. Ibrahim Elfadel of the Computer and Information Engineering department.",
  },
  {
    category: "The Fest",
    question: "When will the exact dates be announced?",
    answer:
      "The closing showcase is 20 November 2026. The opening day and hacking period dates are being finalised with the university and will be published on this site as soon as they are confirmed.",
  },
];
