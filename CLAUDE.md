# CLAUDE.md — Qiskit Fall Fest 2026 site

Website for the Qiskit Fall Fest 2026, hosted by the Quantum Computing Initiative (QCI)
at Khalifa University. First Fall Fest in the GCC. IBM approval received 2 Aug 2026.

## Hard dates

- **20 Nov 2026** — closing showcase (the countdown target)
- **5 Oct 2026** — team's own deadline for the site being live

## Stack

Next.js 15 (App Router) + Tailwind v4, **static export** (`output: "export"`).
Dev server runs on port 4321. No backend, no CMS, no database.

Tailwind and `@tailwindcss/postcss` are **pinned to the same exact version**. Caret
ranges let `@tailwindcss/oxide` drift ahead of the plugin and the build dies with
`Missing field 'negated' on ScannerOptions.sources`. Keep them locked together.

## The one architectural rule

**Components never contain event data. Content lives in `src/content/`.**

A non-frontend member of the team has to be able to change a date, add a sponsor, or
edit a track without opening a component. If you find yourself putting a date, a name,
or a track description in a `.tsx` file under `src/components/`, it belongs in
`src/content/` instead.

## Content honesty rules

These are not stylistic — they protect the team's relationships with real companies.

- **Never list a sponsor that has not agreed in writing.** Naming an organisation that
  is only "in conversation" is a public claim they have not consented to. Prospects
  (ADNOC, TII, Algorithmiq, BlueQubit, etc.) stay out of `sponsors.ts`.
- Use the `status` field (`confirmed` / `tentative` / `tba`) rather than inventing
  detail or deleting a section. `tba` renders "Details coming soon".
- Attendance numbers are **targets**, and must be labelled as such. The 5,000 figure is
  a goal, not an achieved number.
- Do not invent speakers. An empty `speakers` array renders an honest "being confirmed"
  state by design.
- Team role titles in `team.ts` were drafted from planning chats and are marked
  `TODO(team)` — confirm with each person before publishing.

## Design system

Tokens in `src/app/globals.css`. **Never hardcode a colour in a component** — a
hardcoded value silently goes stale when a token changes and does not adapt to the
light theme. Both already happened once; see `docs/UI-REVIEW.md` Pillar 3.

Use `color-mix(in srgb, var(--c-token) N%, transparent)` for translucent values.

- Palette: navy + gold from the QCI seal, Qiskit purple as co-brand accent
- Type: IBM Plex Sans + IBM Plex Mono (mono for eyebrows, countdown, track codes)
- Dark is default; `.light` on `<html>` switches themes

**Both themes must stay at 0 WCAG AA contrast failures.** If you change a colour token,
re-check contrast against both `--c-bg` and `--c-surface`.

## Motion

The brief requires the page to feel alive with no user input: ambient canvas, live
countdown, drifting marquees, scroll reveals.

Non-negotiables:
- `transform`/`opacity` only
- Everything off under `prefers-reduced-motion`, with content still fully visible
- **Content must never be permanently invisible.** `Reveal` has a 2s failsafe because
  `IntersectionObserver` does not fire in background tabs — without it, sections
  rendered blank. Do not remove it.
- `QuantumField` paints one frame synchronously in `build()` so a throttled rAF never
  leaves the hero blank, and uses `ResizeObserver` so a zero-size mount recovers.

## Gotchas

- Two display utilities on one element (e.g. `inline-flex` + `hidden sm:inline-flex`)
  resolve by **stylesheet order, not class order**. Wrap the element instead of passing
  display classes into a component that sets its own.
- **Do not run `npm run build` while `npm run dev` is running.** They share the `.next`
  directory, and a dev recompile landing mid-export crashes the static worker with a
  confusing `/_not-found` prerender error (`TypeError: e[o] is not a function`). It is
  not a code bug. Stop the dev server, or `rm -rf .next` and rebuild. Back-to-back
  builds with dev stopped are reproducibly fine.

## Verification before calling anything done

```bash
npm run build
```

Then check in the browser: all 6 routes, dark + light, 375 / 768 / 1280px, no console
errors, no horizontal scroll. `docs/UI-REVIEW.md` records the audit method.
