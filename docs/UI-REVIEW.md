# UI Review — Qiskit Fall Fest 2026

**Date:** 2026-08-10
**Scope:** Full site (6 routes + 404), dark and light themes, 375 / 768 / 1280px
**Method:** 6-pillar audit (GSD `gsd-ui-auditor` standards), run directly against the
codebase and a live dev server.

> **Note on how this was run.** `/gsd-ui-review` normally spawns the `gsd-ui-auditor`
> subagent against GSD phase artifacts (`.planning/`, `*-SUMMARY.md`, `*-PLAN.md`).
> This project is not GSD-managed and has no `.planning/` directory, so the workflow
> would exit at its step-1 gate. The 6-pillar audit methods were therefore executed
> directly. Scoring is against abstract 6-pillar standards, since there is no
> `UI-SPEC.md` contract — the design spec in
> `docs/superpowers/specs/2026-08-10-qiskit-fall-fest-site-design.md` served as the
> baseline instead.

---

## Pillar Scores

| Pillar | Score | Key finding |
|---|---|---|
| 1. Copywriting | 4/4 | No generic labels anywhere; CTA and empty states are specific |
| 2. Visuals | 4/4 | Single clear focal point; every icon-only control has an accessible name |
| 3. Color | 3/4 | **Was 2/4** — five gradients hardcoded `rgb()` values. Fixed during audit |
| 4. Typography | 3/4 | 12 sizes in use — deliberate scale, but one arbitrary `text-[2.5rem]` |
| 5. Spacing | 3/4 | Consistent 4/8px rhythm; a few justified arbitrary values, one magic number |
| 6. Experience Design | 4/4 | Unavailable, empty, reduced-motion, and no-JS states all handled |

**Overall: 21/24.**

---

## Findings

### Pillar 1: Copywriting — 4/4

Greps for `Submit`, `Click Here`, `OK`, `Learn More`, `Read More` returned nothing.
Copy is specific throughout: "Registration opens soon" rather than a dead "Register";
"The speaker line-up is being confirmed" rather than "No data"; "Details coming soon"
on unfinalised tracks. FAQ answers address the actual anxiety ("Do I need a team?" →
"No. Most people arrive without one.").

No finding requiring action.

### Pillar 2: Visuals — 4/4

One focal point per page (hero `h1`, one `h1` per route — verified in browser).
Hierarchy is carried by size, weight, and colour together rather than colour alone.
30 `aria-hidden` on decorative SVGs, 15 `aria-label` on icon-only controls — no
unlabelled interactive icon exists.

**Fixed during audit:** bright canvas nodes were rendering behind hero body copy and
degrading legibility. Added a token-derived gradient scrim over the text column
(`Hero.tsx`), which protects the left side while leaving the field visible on the right.

### Pillar 3: Color — 3/4 (was 2/4)

**WARNING — fixed.** Five decorative gradients hardcoded `rgb()` literals duplicating
design tokens:

| File | Literal | Token it duplicated |
|---|---|---|
| `Hero.tsx` | `rgb(42 71 176)`, `rgb(138 99 210)` | `--c-brand`, `--c-purple` |
| `CtaSection.tsx` | `rgb(227 178 60)`, `rgb(42 71 176)` | `--c-gold`, `--c-brand` |
| `FormatSection.tsx` | `rgb(138 99 210)` | `--c-purple` |
| `PageHeader.tsx` | `rgb(42 71 176)` | `--c-brand` |
| `RegisterButton.tsx` | `rgb(227 178 60)` (×2, shadows) | `--c-gold` |

Two consequences, both real:
1. **Already stale.** `rgb(138 99 210)` was the pre-fix purple. The contrast fix moved
   `--c-purple` to `#9A78DC`, and these literals silently did not follow.
2. **Theme-blind.** Literals do not respond to `.light`, so light mode rendered
   dark-theme glows.

This also violated the rule stated at the top of `globals.css` ("never hardcode a hex
value in a component").

**Fix applied:** all six rewritten as `color-mix(in srgb, var(--token) N%, transparent)`;
the button glow moved to a `.glow-cta` utility. `grep` for `rgb(`/hex in
`src/components` now returns nothing but a comment. Verified visually unchanged.

Remaining `#000` in `Marquee.tsx` is a mask-image stop, where the colour is
structural and theme-independent — not a defect. Hex values in `layout.tsx` are the
browser-chrome `themeColor` meta, which must be literal.

**Accent distribution** is healthy: gold 86 uses (primary accent), sky 7, purple 3.
Accent is confined to CTAs, eyebrows, active nav, and badges.

### Pillar 4: Typography — 3/4

12 distinct sizes and 3 weights. The auditor heuristic flags >4 sizes, but these map
to the declared 10-step scale in the design spec and the distribution is sane
(`text-sm` 44, `text-base` 27, `text-2xs` 20 — a genuine hierarchy, not drift).
3 weights (600/500/700) is disciplined.

**WARNING — not fixed:** `Hero.tsx:64` uses an arbitrary `text-[2.5rem]` for the mobile
headline because no scale step sits between `text-4xl` (2.25rem) and `text-5xl` (3rem).
Defensible, but it is the one size outside the system. Either add a scale token or
accept it deliberately.

### Pillar 5: Spacing — 3/4

Padding/margin/gap use the 4/8px scale consistently; no off-scale spacing found.
Arbitrary values are confined to non-spacing dimensions and are each justified:

- `h-[520px] w-[820px]`, `h-[380px] w-[720px]` — decorative blur sizes
- `max-w-[280px]` — logo cap
- `min-w-[4.25rem]` — countdown cell width, deliberately fixed to stop digit jitter
- `h-[calc(100%-2rem)]` — timeline connector

**WARNING — not fixed:** `FormatSection.tsx:44` uses `left-[15px]` to centre the
timeline connector under an 8px marker inside a 32px circle. It is a magic number that
will break silently if the marker size changes. Low priority; worth a comment or a
computed value if that area is edited.

### Pillar 6: Experience Design — 4/4

State coverage is the strongest part of the build:

- **Unavailable state** — `registrationUrl: null` renders a disabled, explained control
  across all 5 call sites rather than a dead link.
- **Empty state** — zero speakers renders an honest "being confirmed" panel with a
  follow CTA, not placeholder cards.
- **Degraded content state** — the `status` field drives "Tentative" / "Details coming
  soon" so the page stays truthful as plans firm up.
- **Reduced motion** — canvas disabled, marquees and reveals stopped, content forced
  visible.
- **No-JS** — `.no-js` fallback keeps all reveal content visible.
- **Observer failure** — a 2s failsafe reveals content if `IntersectionObserver` never
  fires (fixed during verification; content was permanently invisible in background tabs).
- **Keyboard** — accordion and mobile menu carry `aria-expanded`/`aria-controls`, menu
  closes on Escape and locks background scroll, skip link present, focus rings never removed.

No destructive actions exist, so confirmation dialogs are not applicable.

---

## Priority fixes

1. ~~Hardcoded `rgb()` in five components, two values already stale~~ — **fixed**
2. ~~Canvas nodes degrading hero text legibility~~ — **fixed**
3. `text-[2.5rem]` outside the type scale (`Hero.tsx:64`) — open, low priority
4. `left-[15px]` magic number (`FormatSection.tsx:44`) — open, low priority

---

## Defects found and fixed during verification

These were caught in browser verification before this audit and are recorded here for
completeness:

| Defect | Impact | Status |
|---|---|---|
| `IntersectionObserver` never fires in a background tab → sections permanently invisible | Blocker | Fixed — 2s failsafe in `Reveal.tsx` |
| Register/theme controls visible at 375px; hamburger missing | Blocker | Fixed — two display utilities on one element resolved by stylesheet order, not class order; wrapped instead |
| `--c-gold` 3.59:1, `--c-fg-subtle` 4.01:1 (light); `--c-purple` 4.06:1, `--c-fg-subtle` 4.54:1 (dark) | WCAG AA failures | Fixed — tokens retuned, both themes now 0 failures |
| TBA track showed "Details coming soon" *and* three specific highlights | Contradictory content | Fixed — highlights gated on `!isTba` |
| Canvas never painted if rAF throttled | Blank hero on slow/background loads | Fixed — synchronous first paint in `build()` |
| Canvas stuck at 0×0 if mounted at zero size | Blank hero | Fixed — `ResizeObserver` replaces window resize listener |
| Hydration mismatch from theme script | Console error on every load | Fixed — `suppressHydrationWarning` |

---

## Verification evidence

- `npm run build` — clean, 7 routes exported. (A spurious `/_not-found` prerender error
  appeared twice mid-audit; traced to `next build` running while `next dev` was
  recompiling into the same `.next` directory, not to application code. Three
  consecutive builds with the dev server idle pass.)
- Contrast audit, dark theme, fresh load: **0 failures / 90 text elements**.
- Contrast audit, light theme: **0 failures**.
- Link audit: all 6 internal routes resolve; 0 anchors without an accessible name.
- 375px: no horizontal scroll (`scrollWidth` 375 = `clientWidth` 375).
- Countdown verified live (ticked 02:15 → 01:16 across reloads).

**Not verified in-browser:** `prefers-reduced-motion` behaviour could not be emulated
in this harness. It is implemented in CSS and guarded in `QuantumField.tsx` and
`Reveal.tsx`, but has not been observed running.
