import type { ResourceLink } from "./types";

/**
 * Learning resources.
 *
 * Prof. Elfadel specifically asked that the site link to the IBM Qiskit Fall Fest page
 * and to IBM Quantum's learning resources — these are those links.
 */
export const resources: ResourceLink[] = [
  {
    title: "Qiskit Fall Fest 2026",
    description:
      "IBM Quantum's announcement of the global Fall Fest programme this event is part of.",
    url: "https://www.ibm.com/quantum/blog/qiskit-fall-fest-2026",
    group: "qiskit",
  },
  {
    title: "IBM Quantum Platform",
    description:
      "Create a free account and run circuits on real IBM quantum hardware and simulators.",
    url: "https://quantum.ibm.com/",
    group: "qiskit",
  },
  {
    title: "IBM Quantum Learning",
    description:
      "Free structured courses, from quantum basics through to algorithm design. The best place to start before the Fest.",
    url: "https://learning.quantum.ibm.com/",
    group: "learn",
  },
  {
    title: "Qiskit Documentation",
    description: "API reference, tutorials, and guides for the Qiskit SDK.",
    url: "https://quantum.cloud.ibm.com/docs",
    group: "learn",
  },
  {
    title: "Qiskit on GitHub",
    description: "The open-source SDK itself. Issues, source, and contribution guides.",
    url: "https://github.com/Qiskit/qiskit",
    group: "learn",
  },
  {
    title: "QCI on GitHub",
    description:
      "Our own open-source work, including quantum-learn, a quantum machine learning library supporting both Qiskit and PennyLane.",
    url: "https://github.com/KUQCI",
    group: "qci",
  },
];
