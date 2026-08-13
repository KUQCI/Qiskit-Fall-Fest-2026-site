# BlochCursor — integration

Drop-in for `KUQCI/Qiskit-Fall-Fest-2026-site` (Next App Router, Tailwind v4).
Uses only existing tokens from `src/app/globals.css`: `--c-gold`, `--c-gold-strong`,
`--c-sky`, `--c-purple`, `--c-fg`, `--font-plex-mono`. No new colours, so it stays
correct in both dark and light themes.

## 1. Add the component

Copy `BlochCursor.tsx` to `src/components/BlochCursor.tsx`.

## 2. Add the native-cursor class to `globals.css`

Under the **REUSABLE PATTERNS** section:

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

## 3. Mount it

Site-wide, in `src/app/layout.tsx`, after `<SiteFooter />`:

```tsx
import { BlochCursor } from "@/components/BlochCursor";
...
<SiteFooter />
<BlochCursor />
```

Hero only — mount it inside `Hero.tsx` instead. The layer is `position: fixed`, so it
still follows the pointer everywhere, but it unmounts when the hero unmounts.

## Props

| Prop | Default | Notes |
|---|---|---|
| `size` | `34` | Sphere diameter in px. Vector, tip and label all scale from it. |
| `hideNativeCursor` | `true` | `false` keeps the system cursor visible alongside the sphere. |

## Behaviour

- **Idle** — vector points at the held state; equator and meridian squash on opposite
  phases to fake rotation; spin speed and colour come from the state.
- **Hover** — sphere brightens and grows, spin speeds up ~2.6×, a gold halo breathes.
- **Gate preview** — an element with `data-gate` leans the vector 86% of the way to the
  state that gate would produce, tints it that state's colour, and the label reads
  `H → |+⟩`. Where the gate only adds a global phase (`X` on `|−⟩`) the vector shivers
  in place, which is the physically honest result.
- **Click** — on a gated element, applies the gate and keeps the new state; anywhere
  else, cycles to the next state. The sphere pulses on every click.

## Adding gates to buttons

```tsx
<RegisterButton data-gate="X" />
<a href="#format" data-gate="H">How it works</a>
<a href="/faq" data-gate="Z">FAQ</a>
```

Suggested mapping — `X` on the primary CTA (a flip, the biggest move), `H` on
exploratory links (superposition, "have a look"), `Z` on secondary/FAQ links (subtle).
Anything interactive without `data-gate` gets the plain hover, so this is opt-in per
element and safe to roll out gradually.

## Accessibility and cost

- Returns `null` under `prefers-reduced-motion: reduce` and on any non-fine pointer
  (touch, stylus), so mobile and reduced-motion users keep the native cursor.
- Never touches React state — the loop writes `transform` and `opacity` only, on a
  single fixed layer of eight spans. No layout, no repaint of page content.
- Hides itself on window blur and when the pointer leaves the document.
- Focus outlines, text selection and keyboard navigation are untouched.

## Physics accuracy

The four states are coplanar on a real sphere (|0⟩ = +z, |1⟩ = −z, |+⟩ = +x, |−⟩ = −x),
so the disc is a genuine x–z slice, and every gate's **result** is correct. The animated
**path** is a shortest-arc approximation: a real `X` rotates about the x-axis and tips
through +y (behind the sphere) rather than sliding through |+⟩. Fine for a cursor; if
exactness ever matters, store the state as a 3D unit vector and animate a Rodrigues
rotation about each gate's axis, projecting to 2D with depth cues.
