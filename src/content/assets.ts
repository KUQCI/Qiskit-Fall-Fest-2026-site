/**
 * Prefix a public asset for GitHub Pages project deployments. `next.config.ts`
 * exposes the resolved base path as NEXT_PUBLIC_BASE_PATH at build time.
 */
export const withBasePath = (path: string): string => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};

const fallFestAsset = (fileName: string) =>
  withBasePath(`/fall-fest-assets/${encodeURIComponent(fileName)}`);

export type FallFestAsset = {
  name: string;
  fileName: string;
  src: string;
  kind: "image" | "svg" | "html";
};

const imageAsset = (name: string, fileName: string): FallFestAsset => ({
  name,
  fileName,
  src: fallFestAsset(fileName),
  kind: fileName.endsWith(".svg") ? "svg" : "image",
});

export const fallFestAssets = {
  badge: {
    pink: imageAsset("badge-pink.svg", "badge-pink.svg"),
  },
  cursor: {
    customCursor: {
      name: "CustomCursor.html",
      fileName: "CustomCursor.html",
      src: fallFestAsset("CustomCursor.html"),
      kind: "html",
    } satisfies FallFestAsset,
  },
  hero: {
    fallFestScene: imageAsset("Fall Fest.png", "Fall Fest.png"),
    withTitle: imageAsset("Hero 2 with tile.png", "Hero 2 with tile.png"),
    withoutTitle: imageAsset("Hero 1 without title.png", "Hero 1 without title.png"),
    withoutTitleWeb: imageAsset(
      "hero-without-title-web.jpg",
      "hero-without-title-web.jpg",
    ),
  },
  logos: {
    ibmQuantum: imageAsset("IBM Quantum.png", "IBM Quantum.png"),
    ibmQuantumWordmark: imageAsset("ibm-quantum-wordmark.png", "ibm-quantum-wordmark.png"),
    khalifaUniversityTransparent: imageAsset(
      "ku-logo_black_backgroundless.png",
      "ku-logo_black_backgroundless.png",
    ),
    khalifaUniversityWhiteBackground: imageAsset("ku-logo_white-bg.jpg", "ku-logo_white-bg.jpg"),
    qciLogo: imageAsset("qci-logo.png", "qci-logo.png"),
    qciLogoFit: imageAsset("qci-logo-fit.png", "qci-logo-fit.png"),
    qciLogoHeader: imageAsset("qci-logo-header.png", "qci-logo-header.png"),
    quantaTransparent: imageAsset(
      "Quanta version_1_backgroundless.png",
      "Quanta version_1_backgroundless.png",
    ),
  },
  qiskitMarks: {
    white: imageAsset("Qiskit_01.png", "Qiskit_01.png"),
    gray: imageAsset("Qiskit_02.png", "Qiskit_02.png"),
    purple: imageAsset("Qiskit_03.png", "Qiskit_03.png"),
    fallFestBlack: imageAsset(
      "Qiskit Fall Fest 2026 Black.png",
      "Qiskit Fall Fest 2026 Black.png",
    ),
  },
  pastEvents: {
    hackathon: imageAsset("hackathon.jpg", "hackathon.jpg"),
    bootcamp: imageAsset("bootcamp-web.jpg", "bootcamp-web.jpg"),
    hackathonOriginal: imageAsset("hackathon image.CR2", "hackathon image.CR2"),
    bootcampOriginal: imageAsset("Bootcamp.JPG", "Bootcamp.JPG"),
  },
  stickers: {
    sticker01: imageAsset("Sticker 01.png", "Sticker 01.png"),
    sticker02: imageAsset("Sticker 02.png", "Sticker 02.png"),
    sticker03: imageAsset("Sticker 03.png", "Sticker 03.png"),
    sticker04: imageAsset("Sticker 04.png", "Sticker 04.png"),
    sticker05: imageAsset("Sticker 05.png", "Sticker 05.png"),
    sticker06: imageAsset("Sticker 06.png", "Sticker 06.png"),
    sticker07: imageAsset("Sticker 07.png", "Sticker 07.png"),
    sticker08: imageAsset("Sticker 08.png", "Sticker 08.png"),
    sticker09: imageAsset("Sticker 09.png", "Sticker 09.png"),
    cloud: imageAsset("Sticker_cloud.png", "Sticker_cloud.png"),
    cloud2: imageAsset("Sticker_cloud 2.png", "Sticker_cloud 2.png"),
  },
  textPills: {
    computingDark: imageAsset("Text_Computing_01.png", "Text_Computing_01.png"),
    computingLight: imageAsset("Text_Computing_02.png", "Text_Computing_02.png"),
    fallFestDark: imageAsset("Text_Fall Fest_01.png", "Text_Fall Fest_01.png"),
    fallFestPink: imageAsset("Text_Fall Fest_02.png", "Text_Fall Fest_02.png"),
    qiskitPurple: imageAsset("Text_Qiskit_01.png", "Text_Qiskit_01.png"),
    qiskitLight: imageAsset("Text_Qiskit_02.png", "Text_Qiskit_02.png"),
    quantumDark: imageAsset("Text_Quantum_01.png", "Text_Quantum_01.png"),
    quantumBlue: imageAsset("Text_Quantum_02.png", "Text_Quantum_02.png"),
  },
} as const;

export const allFallFestAssets: readonly FallFestAsset[] = [
  fallFestAssets.badge.pink,
  fallFestAssets.cursor.customCursor,
  ...Object.values(fallFestAssets.hero),
  ...Object.values(fallFestAssets.logos),
  ...Object.values(fallFestAssets.qiskitMarks),
  ...Object.values(fallFestAssets.pastEvents),
  ...Object.values(fallFestAssets.stickers),
  ...Object.values(fallFestAssets.textPills),
];
