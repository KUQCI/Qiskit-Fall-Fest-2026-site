import type { Track } from "./types";

/**
 * The Fall Fest tracks.
 *
 * Set `status` honestly:
 *   confirmed — the track is agreed and the description is final
 *   tentative — planned, description may still change
 *   tba       — the card renders "Details coming soon" instead of the description
 *
 * Only fill `partner` for organisations that have actually agreed to co-design the
 * track. An unconfirmed sponsor named here is a public claim you cannot back.
 */
export const tracks: Track[] = [
  {
    slug: "quantum-machine-learning",
    code: "QML-01",
    title: "Quantum Machine Learning",
    summary:
      "Build hybrid quantum-classical models and find out where a quantum layer actually helps — and where it does not.",
    description:
      "Work with variational circuits, quantum kernels, and hybrid models that pair a quantum layer with classical training. Bring your own dataset or take one of the provided problems. Submissions are judged on the quality of the experiment, not just the accuracy number.",
    level: "intermediate",
    format: "hybrid",
    status: "tentative",
    highlights: [
      "Variational circuits and parameter-shift training",
      "Quantum kernels for classification",
      "Honest benchmarking against a classical baseline",
    ],
  },
  {
    slug: "quantum-cybersecurity",
    code: "SEC-02",
    title: "Quantum & Cybersecurity",
    summary:
      "Post-quantum cryptography, quantum key distribution, and what actually breaks when a large quantum computer arrives.",
    description:
      "Split between the offensive and defensive halves of the problem: how Shor's algorithm threatens today's public-key cryptography, and what post-quantum schemes are being standardised in response. Projects can be implementation, analysis, or a migration study.",
    level: "intermediate",
    format: "hybrid",
    status: "tentative",
    highlights: [
      "Shor's algorithm and the real scale required to run it",
      "Post-quantum cryptographic schemes",
      "Quantum key distribution protocols",
    ],
  },
  {
    slug: "chemistry-drug-discovery",
    code: "CHEM-03",
    title: "Chemistry & Drug Discovery",
    summary:
      "Simulate molecules on quantum hardware — the application where quantum advantage is least speculative.",
    description:
      "Ground-state energy estimation, molecular Hamiltonians, and variational eigensolvers applied to small molecules. Run in collaboration with Khalifa University's science departments.",
    level: "advanced",
    format: "hybrid",
    status: "tentative",
    highlights: [
      "Molecular Hamiltonians and qubit encodings",
      "Variational quantum eigensolver in practice",
      "Where today's hardware noise stops you",
    ],
  },
  {
    slug: "quantum-finance",
    code: "FIN-04",
    title: "Quantum for Finance",
    summary:
      "Portfolio optimisation, risk modelling, and Monte Carlo methods rebuilt as quantum algorithms.",
    description:
      "Map real optimisation problems onto quantum formulations and run them. Expect to spend as much time on the encoding as on the algorithm — that is the actual work.",
    level: "intermediate",
    format: "online",
    status: "tba",
    highlights: [
      "QAOA for portfolio optimisation",
      "Amplitude estimation for risk",
      "Encoding a business problem into a Hamiltonian",
    ],
  },
  {
    slug: "first-qubit",
    code: "INTRO-05",
    title: "Your First Qubit",
    summary:
      "No physics background, no linear algebra, no prior coding in Qiskit. Start here.",
    description:
      "A guided track for anyone who has never touched quantum computing — including high school students and non-engineering majors. Walk from superposition and entanglement to writing and running a real circuit on IBM hardware, with mentors on hand the whole way. Ends in a small guided challenge rather than an open-ended build.",
    level: "beginner",
    format: "hybrid",
    status: "tentative",
    highlights: [
      "Superposition and entanglement, explained without the maths wall",
      "Writing your first circuit in Qiskit",
      "Running it on real IBM quantum hardware",
    ],
  },
  {
    slug: "open-innovation",
    code: "OPEN-06",
    title: "Open Innovation",
    summary:
      "An open track for projects that do not fit the others — including tracks co-designed with our industry partners.",
    level: "all-levels",
    format: "online",
    status: "tba",
  },
];

/** Tracks shown on the home page preview, in order. */
export const featuredTrackSlugs = [
  "first-qubit",
  "quantum-machine-learning",
  "quantum-cybersecurity",
  "chemistry-drug-discovery",
];
