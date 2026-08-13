import type { ResourceLink } from "./types";

export const resourcesSectionCopy = {
  eyebrow: "Start learning now",
  title: "Get a head start before the Fest",
  lede:
    "Everything below is free to explore. If you want to arrive ready to build and run your first quantum circuits, IBM Quantum Learning is a great place to start.",
} as const;

/** Ordered intentionally; shared resource sections should preserve this order. */
export const resources: ResourceLink[] = [
  {
    title: "QCI on GitHub",
    description:
      "Explore our open-source projects, including quantum-learn, our quantum machine learning library supporting Qiskit and PennyLane.",
    url: "https://github.com/KUQCI",
    group: "qci",
  },
  {
    title: "IBM Quantum Learning",
    description:
      "Structured courses covering everything from quantum fundamentals to algorithms and applications. A great place to start before the Fest.",
    url: "https://learning.quantum.ibm.com/",
    group: "learn",
  },
  {
    title: "IBM Quantum Platform",
    description:
      "Access IBM Quantum tools, simulators, and quantum hardware to build and run circuits.",
    url: "https://quantum.ibm.com/",
    group: "qiskit",
  },
  {
    title: "Qiskit Documentation",
    description: "API references, tutorials, and guides for building with Qiskit.",
    url: "https://quantum.cloud.ibm.com/docs",
    group: "learn",
  },
  {
    title: "Qiskit on GitHub",
    description:
      "The open-source Qiskit SDK — source code, issues, releases, and contribution guides.",
    url: "https://github.com/Qiskit/qiskit",
    group: "learn",
  },
  {
    title: "Qiskit Fall Fest 2026",
    description:
      "IBM Quantum’s overview of the global Qiskit Fall Fest programme that this event is part of.",
    url: "https://www.ibm.com/quantum/blog/qiskit-fall-fest-2026",
    group: "qiskit",
  },
];
