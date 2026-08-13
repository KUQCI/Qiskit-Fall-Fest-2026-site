# Task: add the BlochCursor to the site

You are integrating one new client component into `KUQCI/Qiskit-Fall-Fest-2026-site`
(Next.js App Router, static export, Tailwind v4, TypeScript). Everything you need is in
this zip. Do the four steps below, in order, and change nothing else.

Contents of the zip:

| File | What to do with it |
|---|---|
| `BlochCursor.tsx` | Copy into the repo (step 1). Do not rewrite it. |
| `INTEGRATION.md` | Reference: props, behaviour, accessibility, physics notes. |
| `README-FOR-CODER.md` | This file. The task. |

## Step 1 — add the component

Copy `BlochCursor.tsx` to:

```
src/components/BlochCursor.tsx
```

No dependencies to install. It imports only `useEffect` and `useRef` from `react`, and
it is already marked `"use client"` — required, since it uses `window` and
`requestAnimationFrame`. Do not remove that directive or the component will break the
static export.

## Step 2 — add one CSS block to `src/app/globals.css`

Append this at the end of the **REUSABLE PATTERNS** section (the last section in the
file). Do not touch any other rule, and do not add a colour token — this block has none.

```css
/* Hides the native cursor while BlochCursor is mounted. The class is added by the
   component itself, so a JS failure leaves the system cursor intact. Text inputs and
   text selection keep their own cursors — losing the I-beam hurts usability. */
.qff-cursor-hidden,
.qff-cursor-hidden * {
  cursor: none;
}

.qff-cursor-hidden :where(input, textarea, select, [contenteditable]) {
  cursor: auto;
}
```

## Step 3 — mount it in `src/app/layout.tsx`

Add the import alongside the existing component imports:

```tsx
import { BlochCursor } from "@/components/BlochCursor";
```

And render it as the last child of `<body>`, after `<SiteFooter />`:

```tsx
<SiteHeader />
<main id="main">{children}</main>
<SiteFooter />
<BlochCursor />
```

It must be last so its `position: fixed` layer sits above page content without needing a
higher `z-index` than the skip link's `z-[100]` (the component uses `9999` and is
`pointer-events: none`, so it never blocks a click).

`layout.tsx` is a server component; that is fine — `BlochCursor` is a client component
and Next will handle the boundary. Do not add `"use client"` to `layout.tsx`.

## Step 4 — assign gates to interactive elements

The cursor previews a quantum gate when hovering any element carrying `data-gate`.
This is opt-in per element. Add these three, and nothing more for now:

| Element | File | Attribute |
|---|---|---|
| Primary register CTA | `src/components/RegisterButton.tsx` | `data-gate="X"` |
| "How it works" link in the hero | `src/components/Hero.tsx` | `data-gate="H"` |
| FAQ link in the footer | `src/components/SiteFooter.tsx` | `data-gate="Z"` |

For `RegisterButton`, put the attribute on the rendered `<a>`/`<button>` element itself,
not on the component call, unless the component already spreads extra props through.

Everything else interactive (`a`, `button`, `summary`, `[role="button"]`) still gets the
plain hover state — brighter sphere, faster spin, gold halo — with no gate readout.

## Constraints from the repo's own rules

- **Never hardcode a colour.** The component already reads `--c-gold`,
  `--c-gold-strong`, `--c-sky`, `--c-purple`, `--c-fg` and `--font-plex-mono` from
  `globals.css`. If you refactor anything, keep it on tokens so both themes stay correct.
- **Do not touch `src/content/`.** No event data is involved in this change.
- **Do not remove focus styles.** The `:focus-visible` outline rule in `globals.css`
  must stay exactly as it is; the cursor does not interact with it.
- **Reduced motion is already handled** inside the component (it returns `null`), so do
  not add it to the `prefers-reduced-motion` block in `globals.css`.

## Verification checklist

- [ ] `npm run build` completes with no type errors and static export still succeeds.
- [ ] On desktop, the sphere follows the pointer, the equator and meridian squash on
      opposite phases, and the mono state label `|0⟩` trails to the lower right.
- [ ] Hovering any link or button: sphere brightens and grows, spin speeds up, a gold
      halo breathes around it.
- [ ] Hovering the register CTA shows `X → |1⟩` and the vector leans down. Clicking it
      commits the state — the label stays `|1⟩` after the pointer moves away.
- [ ] Hovering the FAQ link while in state `|0⟩` shows `Z → |0⟩` and the vector shivers
      without moving. That is correct, not a bug: `Z` leaves `|0⟩` unchanged.
- [ ] Clicking empty page background cycles the state.
- [ ] With `prefers-reduced-motion: reduce` set in the OS, no sphere renders and the
      native cursor is visible.
- [ ] On a touch device / mobile emulation, no sphere renders and nothing is hidden.
- [ ] Text inputs still show an I-beam; the skip link still receives focus.
- [ ] Theme toggle: the sphere recolours with the light theme and stays visible on white.

## If you want it on the hero only

Instead of step 3, render `<BlochCursor />` inside `src/components/Hero.tsx` (the
section is already client-adjacent, but `Hero` is a server component, so mount it inside
an existing client child or add `"use client"` to a small wrapper). The layer is fixed,
so it still tracks the pointer across the whole viewport, but it unmounts when the hero
leaves the tree.

## Notes for the reviewer

The animation loop writes `transform` and `opacity` only, on eight spans in one fixed
layer, and never touches React state — so it does not re-render the page or cause
layout. `size` (default `34`) and `hideNativeCursor` (default `true`) are the only props.
Physics accuracy is documented at the end of `INTEGRATION.md`: gate *results* are
correct, animated *paths* are shortest-arc approximations.
