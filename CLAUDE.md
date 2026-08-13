# CLAUDE.md — Qiskit Fall Fest 2026 site

Website for Qiskit Fall Fest 2026, organized by the Quantum Computing Initiative and
Club at Khalifa University as part of IBM Quantum’s annual global event series.

## Confirmed timing

- **19 October 2026 at 6:00 PM UAE time (UTC+04:00)** — opening session and countdown target
- **Closing showcase date(s): to be announced**
- **5 October 2026** — team target for the site to be live

Never restore a previous unconfirmed closing date or regional-superlative claim.

## Stack

Next.js 15 (App Router), React 19, TypeScript, and Tailwind v4 with a static export
(`output: "export"`). The development server runs on port 4321. There is no backend,
CMS, or database.

Tailwind and `@tailwindcss/postcss` are pinned to the same exact version. Do not loosen
the versions: incompatible `@tailwindcss/oxide` versions can break the scanner.

## Content architecture

**Components do not own event data. Content lives in `src/content/`.**

Dates, names, public descriptions, page headings, partner details, links, and CTA copy
must be editable without opening a component. Shared components consume shared content
exports. See `src/content/README.md` for the file map.

## Content honesty

- Never list a sponsor, speaker, department, or partner that has not agreed in writing.
- Use `confirmed`, `planning`, `tentative`, and `tba` accurately.
- The six tracks are in the **Planning phase**. Do not publish difficulty, format,
  prerequisites, algorithms, datasets, judging criteria, or partner details yet.
- Do not invent attendance numbers, eligibility rules, team rules, workloads, closing
  dates, speaker formats, or selection processes.
- Keep the empty `speakers` array until people agree to be announced.
- Where a format or session time is unknown, omit the optional field.

## Public links and contact

- QCI: `https://qcinit.tech/`
- Contact: `100066617@ku.ac.ae`
- LinkedIn: `https://www.linkedin.com/company/ku-qci/`
- Instagram: `https://www.instagram.com/ku.qci/?hl=en`
- GitHub: `https://github.com/KUQCI`
- WhatsApp: `https://chat.whatsapp.com/Cc4OqqKTKbnLaBDJuqCQkG`

These values are canonical in `src/content/event.ts`; components should not duplicate them.

## Static assets and GitHub Pages

GitHub Pages may serve the site under a repository base path. Do not use a bare public
URL such as `/fall-fest-assets/image.png`. Use `fallFestAssets` or `withBasePath` from
`src/content/assets.ts`; `next.config.ts` exposes the resolved base path as
`NEXT_PUBLIC_BASE_PATH` during the build.

Use web-safe event-photo derivatives in pages while preserving the supplied originals:

- `hackathon.jpg` (original: `hackathon image.CR2`)
- `bootcamp-web.jpg` (original: `Bootcamp.JPG`)
- `ibm-quantum-wordmark.png` for the cropped partner wordmark

## Design system

Tokens live in `src/app/globals.css`. Never hardcode a color in a component. Use
`color-mix(in srgb, var(--c-token) N%, transparent)` for translucent values.

Both themes must have zero WCAG AA contrast failures. Maintain visible keyboard focus,
44×44 px mobile targets, meaningful alternative text, scalable type, and information
that does not rely on color alone.

## Motion and custom pointer

Motion may use `transform` and `opacity`, and must switch off under
`prefers-reduced-motion` with content remaining visible. The custom Bloch pointer must
also respect reduced motion, fine-pointer capability, keyboard use, and mobile/touch.
Never hide the native cursor unless the replacement is active and safe.

`Reveal` has a failsafe because `IntersectionObserver` may not fire in background tabs.
Do not make content permanently dependent on an animation callback.

## Gotchas

- Two display utilities on one element resolve by stylesheet order, not class order.
  Wrap the element when responsive visibility conflicts with a component’s own display.
- Do not run `npm run build` while `npm run dev` is running. Both write `.next`, which
  can produce misleading static-worker or `/_not-found` failures.

## Verification before completion

```bash
npm run build
```

Then check all six routes in dark and light themes at 375, 768, and 1280 px. Confirm no
console errors, horizontal overflow, missing base-path assets, inaccessible controls, or
legacy event claims. Test keyboard navigation and reduced motion.
