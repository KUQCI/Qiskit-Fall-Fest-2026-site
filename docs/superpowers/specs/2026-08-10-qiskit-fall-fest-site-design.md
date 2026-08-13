# Qiskit Fall Fest 2026 — Website Design Spec

**Originally drafted:** 2026-08-10

**Reconciled:** 2026-08-14

**Owner:** Quantum Computing Initiative and Club (QCI), Khalifa University
**Status:** Current implementation reference

This revision replaces earlier planning assumptions. When this document and
`src/content/` disagree, the typed content files are the canonical source.

## 1. Confirmed event facts

- Event: **Qiskit Fall Fest 2026**
- Local organizer: **Quantum Computing Initiative and Club (QCI)**
- Host institution: **Khalifa University, Abu Dhabi**
- Opening: **19 October 2026 at 6:00 PM UAE time**
- Countdown target: `2026-10-19T18:00:00+04:00`
- Challenge period: **approximately two weeks**
- Closing showcase: **date(s) to be announced**
- Registration: **opening soon**
- Contact: `100066617@ku.ac.ae`

Do not publish regional superlatives, a fixed closing date, attendance targets, or
unconfirmed rules for eligibility, teams, judging, workloads, prerequisites,
hardware, datasets, finalists, recordings, booths, or awards.

## 2. Product direction

The site presents QCI as the local organizer within IBM Quantum's global Qiskit
Fall Fest series. It should feel credible, welcoming, and easy to update.

The visual direction combines:

- QCI navy and gold as the foundation;
- Qiskit purple as a co-brand accent;
- Fall Fest pink, birds, and clouds as restrained illustration;
- IBM Plex Sans and IBM Plex Mono;
- spacious editorial panels and a calm, frosted shell.

Playful artwork is punctuation rather than decoration on every card. Confirmed
facts and developing programme details must remain visibly and verbally distinct.

## 3. Architecture

Next.js App Router, Tailwind CSS v4, and a static export.

```
src/
  content/       Canonical event data and editable page copy
  components/    Shared presentation and interaction
  app/           Route composition and metadata
public/
  fall-fest-assets/  Supplied artwork plus optimized web derivatives
```

Routes remain stable:

| Route | Visible label | Purpose |
|---|---|---|
| `/` | Home | Full event overview |
| `/tracks/` | Tracks | Six broad track directions |
| `/schedule/` | How It Works | Opening countdown and three phases |
| `/sponsors/` | Partners | IBM, KU, partnership value, contact |
| `/about/` | About | QCI, advisor, past events, R&D, speakers |
| `/faq/` | FAQ | Fourteen cautious answers with filters |

Content belongs in `src/content/`; page components should not duplicate event
facts. Public asset paths must go through `src/content/assets.ts` so GitHub Pages
base paths remain correct.

## 4. Page requirements

### Home

Order:

1. QCI-owned hero and opening countdown
2. Three honest statistics
3. Event introduction
4. Four preview tracks with **TENTATIVE** badges
5. Compact three-phase summary
6. Linked IBM Quantum and Khalifa University logos
7. Six learning resources
8. First five FAQs
9. Generic registration CTA

The primary hero uses the supplied title-free scene, with all meaningful titles as
HTML text.

### Tracks

Show exactly six broad cards, in this order:

1. Quantum Computing Foundations
2. Quantum Machine Learning
3. Quantum Cybersecurity
4. Quantum Computing & Biology
5. Quantum & Energy
6. Open Innovation

All six use **PLANNING PHASE**. Preserve existing internal slugs and codes. Do not
show level, delivery mode, partner, algorithm, dataset, or judging details.

### How It Works

The countdown targets the confirmed opening, not the unconfirmed close. Show:

- Opening Day — 19 October 2026 at 6:00 PM
- Challenge Period — approximately two weeks
- Closing Showcase — date(s) to be announced

Only the Welcome and Track Introduction opening sessions are explicitly hybrid.
Leave unspecified times and formats absent rather than guessing.

### Partners

Show exactly the linked IBM Quantum and Khalifa University logo cards, three
partnership-value cards, one **IN DEVELOPMENT** sponsorship package block, and a
focused organizing-team email CTA. Do not add participant registration, prices,
tiers, or unconfirmed organizations.

### About

Order: organizers, faculty advisor, two image-led past events, three compact R&D
cards, honest speaker empty state, resources, exact-opening CTA. Only verified
project links may be rendered.

### FAQ

Keep fourteen questions in canonical order with wrapping category filters. The
first five are shared with Home. Answers must distinguish known facts from
track-specific or developing details.

## 5. Shared shell and interaction

- The QCI logo links to `https://qcinit.tech/`; Home remains a separate navigation
  item.
- Navigation labels are Home, Tracks, How It Works, Partners, About, FAQ.
- Header and footer include the current email, Instagram, LinkedIn, GitHub, and
  WhatsApp links from `src/content/event.ts`.
- Registration controls are explicit unavailable states while the URL is null.
- The mobile menu traps and restores focus, closes on Escape and route changes, and
  locks background scrolling.
- The optional Bloch cursor runs only on fine hover pointers and is disabled for
  reduced motion. Text inputs retain an I-beam. Gate labels apply only to real
  actions: X for live registration, H for How It Works, and Z for FAQ.

Motion is restrained: one-time opacity/translation reveals, a low-opacity quantum
field, and at most a 2px lift on interactive cards. Do not use continuous marquees,
parallax, tilt, or animated status pills.

## 6. Accessibility and responsiveness

- One logical `h1` per page with sequential headings.
- Skip link, landmarks, visible focus, and keyboard-operable disclosures.
- Controls are at least 44px.
- Body text meets 4.5:1 contrast; meaningful UI boundaries meet 3:1.
- Images use meaningful alternative text or empty alt text when decorative.
- External-tab behavior is announced where the link purpose would not make it
  clear.
- Reduced motion leaves all content visible and removes ambient animation/cursor.
- Theme follows an explicit saved choice or the system preference without a flash.
- Grids stack without carousels or horizontal overflow at 1024, 768, 390, and
  320px, and remain usable at 200% zoom.

## 7. Verification

Before release:

1. `npm run build` completes and creates all six static routes.
2. A project-base-path build resolves every internal link and supplied asset.
3. Both themes are checked at desktop, tablet, and mobile widths.
4. Keyboard, screen-reader semantics, reduced motion, coarse touch, fine pointer,
   and cursor failure are checked.
5. The browser console is clean and no page has horizontal overflow.
6. Counts remain exact: four Home previews, six Tracks cards, two partner logos,
   one sponsorship block, two past events, three R&D cards, and fourteen FAQs.

## 8. Open items

- Add the registration URL when approved.
- Publish full track requirements only after they are confirmed.
- Confirm closing showcase date(s).
- Add speakers and mentors only after they agree to be announced.
- Replace the sponsorship development notice when packages are approved.
