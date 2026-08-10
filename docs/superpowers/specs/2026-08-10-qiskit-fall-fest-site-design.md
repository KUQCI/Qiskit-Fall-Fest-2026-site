# Qiskit Fall Fest 2026 — Website Design Spec

**Date:** 2026-08-10
**Owner:** Ahmed Ghandour, Quantum Computing Initiative (QCI), Khalifa University
**Status:** Approved, in implementation

---

## 1. Context

QCI at Khalifa University is hosting the **Qiskit Fall Fest 2026** — the first in the GCC.
IBM approval was received **2 August 2026**. Prof. Ibrahim Elfadel (CIE, QCI advisor,
former IBM Research Scientist) requested a website for the Fest, referencing
[IEEE BioCAS 2025](https://2025.ieee-biocas.org/) for design and formatting, and asked that
it link to the IBM Qiskit Fall Fest page and IBM Quantum learning resources.

The team's own internal deadline for the site being live is **5 October 2026**.
The event's headline date is **20 November 2026**.

### Event shape (from the IBM proposal)

- Hybrid: national in-person + international online tracks.
- **Opening day** — hybrid info session, plus student clubs and organizations invited to
  set up in the KU spine area for networking.
- **~2-week hacking period** — per-track workshops, mentorship, proposal reviews, coding
  qualifiers to shortlist finalists.
- **Closing showcase** — multi-day finals, finalists present, industry partners run
  networking booths.
- **5–6 independent tracks** spanning quantum machine learning, cybersecurity, drug
  discovery/chemistry, finance, plus beginner-friendly entry tracks for students with no
  prior quantum exposure. Some tracks are co-designed with sponsors and labs.
- Target reach: ~5,000 participants across in-person and online.

---

## 2. Goals and non-goals

### Goals

1. A credible public face for the Fest that satisfies Prof. Elfadel's request and holds up
   next to BioCAS.
2. Drive registrations — the countdown and Register CTA are the primary conversion path.
3. Explain a genuinely complicated event format (hybrid, multi-track, three phases) without
   overwhelming a first-year student who has never heard of a qubit.
4. Stay editable by a non-frontend member of the team for the entire semester.

### Non-goals

- No registration backend, no accounts, no payments. Registration is an external link.
- No CMS. Content lives in version-controlled typed files.
- No submissions/judging portal. Out of scope for this milestone.

---

## 3. Audience

| Audience | What they need | Where it lives |
|---|---|---|
| KU / UAE students, mostly non-quantum | "Can I even do this?" reassurance, dates, what a track is | Hero, Tracks, FAQ, beginner track badges |
| International online participants | Which tracks are open to them, timezone-safe dates | Tracks (format badges), Schedule |
| Sponsors and industry partners | Credibility, reach numbers, what a tier buys | Sponsors, Become a Sponsor |
| Faculty and KU administration | Legitimacy, IBM association, organizing structure | About, Team, Patrons |

---

## 4. Design system

### 4.1 Rationale for overriding the generated system

`ui-ux-pro-max --design-system` returned the *Event/Conference Landing* pattern (kept) but
paired it with a neon cyan/magenta OLED palette and an EB Garamond/Crimson Text serif
pairing. Both were rejected:

- The neon palette discards the existing QCI navy/gold seal and clashes with Khalifa
  University's institutional identity. Brand consistency beats a generic "quantum = neon"
  trope.
- Serif academic type reads as a journal, not a hackathon, and works against the
  student-friendly half of the brief.

### 4.2 Color tokens

Derived from the QCI seal (`qci-dark.png` / `qci-light.png`): navy field, gold ring,
light-blue interior, inside bra-ket `|⟩` notation.

| Token | Dark (default) | Light | Role |
|---|---|---|---|
| `--bg` | `#080D1F` | `#FFFFFF` | Page base |
| `--surface` | `#0E1633` | `#F5F7FC` | Cards, panels |
| `--surface-2` | `#16204A` | `#E9EEF9` | Raised / hover |
| `--brand` | `#2A47B0` | `#1B2A6B` | QCI navy |
| `--gold` | `#E3B23C` | `#A87A16` | Primary CTA, accents |
| `--sky` | `#A8C8F0` | `#2C5FA8` | Secondary text, links |
| `--purple` | `#8A63D2` | `#6929C4` | Qiskit accent, co-brand |
| `--fg` | `#EAF0FF` | `#0B1226` | Body text |
| `--fg-muted` | `#9BABD4` | `#4A5A80` | Secondary text |
| `--border` | `#22305F` | `#D3DCEF` | Dividers |

Dark is the default theme; light is a supported toggle. Both are authored together, and
every foreground/background pair is verified at 4.5:1 minimum (3:1 for large text).

### 4.3 Typography

**IBM Plex Sans** (headings + body) and **IBM Plex Mono** (eyebrows, countdown digits,
track codes, metadata).

IBM Plex is IBM's own typeface, which reinforces the Qiskit/IBM Quantum association at no
cost, and reads professional without reading formal. Plex Mono digits are tabular, so the
countdown does not shift width as it ticks.

Type scale: `12 / 14 / 16 / 18 / 20 / 24 / 32 / 44 / 60 / 80`. Body 16px minimum,
line-height 1.6. Headings 600–700 weight with `-0.02em` tracking.

### 4.4 Motion system

The brief requires the page to feel alive without user input. Four always-on layers:

1. **Quantum field canvas** — behind the hero. Qubit nodes drift on independent sine paths;
   entanglement lines fade in between pairs that come within a threshold distance, then
   decay. Continuous, no visible loop point. Capped at ~45 nodes, `requestAnimationFrame`,
   paused via `IntersectionObserver` when scrolled out of view.
2. **Live countdown** — ticks every second toward the event date.
3. **Auto-scrolling marquees** — partner and track strips drift horizontally, pausing on
   hover.
4. **Scroll reveal** — `IntersectionObserver` driven, 40ms stagger between siblings,
   transform + opacity only.

**Constraints:**
- Only `transform` and `opacity` are animated. No width/height/top/left.
- Micro-interactions 150–300ms, entrances ≤400ms, ease-out in / ease-in out.
- `prefers-reduced-motion: reduce` disables the canvas, marquees, parallax, and reveal
  transitions. Content renders in its final state immediately — never hidden.
- Canvas pauses when off-screen and when the tab is hidden.

---

## 5. Architecture

Next.js (App Router) + Tailwind CSS v4, static export.

```
src/
  content/            The only files a non-frontend editor touches
    event.ts          Name, dates, venue, registration URL, countdown target, stats, links
    tracks.ts         Track list: title, code, blurb, level, format, status
    schedule.ts       Phases (opening / hacking / closing) and their sessions
    speakers.ts       Speakers and mentors
    sponsors.ts       Tiers, confirmed partners, sponsorship packages
    faq.ts            Questions and answers
    team.ts           Organizing committee
    resources.ts      IBM Qiskit + IBM Quantum learning links
    types.ts          Shared types for all of the above
  components/         Presentational only; never hardcode event data
  app/                Routes
```

**The invariant:** components read from `src/content/*`. Adding a sponsor, changing a date,
or renaming a track is a one-file edit with no component changes. `src/content/README.md`
documents each file for whoever inherits this.

### Pages

| Route | Purpose |
|---|---|
| `/` | Full narrative: hero, stats, about, tracks preview, format timeline, speakers, sponsors, FAQ preview, CTA |
| `/tracks` | All tracks in full, with level and format filters |
| `/schedule` | Three-phase timeline with session detail |
| `/sponsors` | Confirmed partners, tier packages, become-a-sponsor contact |
| `/about` | QCI, the Fest, advisor, organizing team, IBM resource links |
| `/faq` | Full FAQ, grouped by category |

---

## 6. Content honesty rules

Sponsors and tracks are still being negotiated. The site states only what is true as of the
last edit:

- **Confirmed only.** IBM Quantum as Fall Fest host program; Khalifa University and the
  named departments already in discussion as academic partners. Companies still in
  conversation (ADNOC, TII, Algorithmiq, BlueQubit and others) do **not** appear until they
  have agreed in writing.
- Unconfirmed track details render as "Details coming soon" rather than invented content.
- Every track and session carries a `status` field (`confirmed` | `tentative` | `tba`) that
  drives its badge, so the page degrades honestly as plans firm up.
- Attendance figures are stated as targets, never as achieved numbers.

---

## 7. Accessibility

- WCAG 2.1 AA: 4.5:1 body contrast, 3:1 large text and UI glyphs, verified in both themes.
- Visible focus rings (2px gold, 2px offset) on every interactive element. Never removed.
- Sequential heading hierarchy, one `h1` per page.
- Skip-to-content link as the first focusable element.
- All icons are inline SVG with `aria-hidden`, paired with text or an `aria-label`.
- Touch targets ≥44×44px with ≥8px separation.
- Canvas is `aria-hidden` decoration; no information exists only inside it.
- `prefers-reduced-motion` fully respected as described in 4.4.
- Accordions and mobile nav are keyboard-operable with correct `aria-expanded`/`aria-controls`.

---

## 8. Verification

Before this is called done:

1. `npm run build` completes with no errors.
2. Every route renders; every nav and footer link resolves.
3. Countdown computes correctly and ticks.
4. Canvas animates, and stops under reduced-motion.
5. Theme toggle works in both directions and persists.
6. Layouts verified at 375px, 768px, and 1280px with no horizontal scroll.
7. Browser console clean of errors and warnings.
8. `/gsd-ui-review` 6-pillar audit run, findings triaged and fixed.

---

## 9. Open items for the team

These are placeholders in `src/content/` awaiting real values:

- Exact opening day, hacking window, and closing showcase dates.
- Registration URL.
- Final track list and per-track sponsor assignments.
- Speaker confirmations.
- Confirmed sponsor logos and tiers.
- Public contact email and social handles for the Fest.
- Venue room/building for in-person sessions.
