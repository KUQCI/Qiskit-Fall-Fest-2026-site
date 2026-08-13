import type { NextConfig } from "next";

/**
 * GitHub Pages serves a project repo from a subpath:
 *   https://<org>.github.io/<repo>/
 * so every asset and link needs that prefix. A user/org page or a custom domain
 * serves from the root and must NOT have a prefix.
 *
 * `BASE_PATH` is set by the deploy workflow (.github/workflows/deploy.yml) and left
 * empty for local dev, so `npm run dev` always runs at the root.
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export — the whole site is prerendered to plain HTML/CSS/JS in `out/`,
  // so it can be hosted anywhere (GitHub Pages, Vercel, KU web hosting, S3).
  output: "export",

  // Static hosts serve /tracks as /tracks/index.html, so emit trailing-slash dirs.
  trailingSlash: true,

  basePath,
  assetPrefix: basePath || undefined,

  // Public-folder asset paths are assembled in content data as well as components.
  // Expose the resolved prefix to both server and client bundles so those URLs work
  // unchanged in local development, custom domains, and GitHub project pages.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  images: {
    // next/image's optimizer needs a server; static export has none.
    unoptimized: true,
  },
};

export default nextConfig;
