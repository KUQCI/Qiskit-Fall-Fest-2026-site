# Qiskit Fall Fest 2026 Website Handoff

This guide is for QCI members, designers, developers, and future maintainers who
need to update the website without relying on its original authors.

## 1. Start here

### Requirements

- Node.js 22 or newer
- npm
- Git

### Run the website locally

```bash
npm install
npm run dev
```

Open <http://localhost:4321>.

Stop the development server before running a production build. Both commands use
the `.next` directory, so running them simultaneously can corrupt the temporary
build cache.

```bash
npm run build
```

A successful build creates the static website in `out/`.

## 2. How the repository is organized

```text
src/
  app/                 Pages, metadata, global styles, and route composition
  components/          Shared visual and interactive components
  content/             Canonical event facts and editable website copy
  lib/                 Small shared utilities
public/
  fall-fest-assets/    Supplied artwork and optimized web images
docs/
  HANDOFF.md           This guide
  superpowers/specs/   Current design and product specification
.github/workflows/
  deploy.yml           GitHub Pages deployment workflow
```

The most important rule is:

> Put event facts and editable copy in `src/content/`. Do not repeat dates,
> links, track descriptions, or programme claims inside components.

## 3. Current confirmed information

Before publishing a change, keep these canonical facts consistent:

| Item | Current value |
|---|---|
| Event | Qiskit Fall Fest 2026 |
| Organizer | Quantum Computing Initiative and Club (QCI) |
| Institution | Khalifa University, Abu Dhabi |
| Opening | 19 October 2026 at 6:00 PM UAE time |
| Countdown | `2026-10-19T18:00:00+04:00` |
| Challenge period | Approximately two weeks |
| Closing showcase | Date(s) to be announced |
| Registration | Opening soon |
| Contact | `100066617@ku.ac.ae` |
| QCI website | <https://qcinit.tech/> |
| Instagram | <https://www.instagram.com/ku.qci/?hl=en> |
| LinkedIn | <https://www.linkedin.com/company/ku-qci/> |
| GitHub | <https://github.com/KUQCI> |
| WhatsApp | <https://chat.whatsapp.com/Cc4OqqKTKbnLaBDJuqCQkG> |

The canonical implementation is `src/content/event.ts`. If this table becomes
outdated, update both places in the same change.

## 4. Common changes

### Open registration

Edit `src/content/event.ts`:

```ts
registrationUrl: "https://your-approved-registration-link.example",
```

Also update `registrationNote`. One change activates the shared registration
controls across the website.

Do not replace the unavailable registration state with a link that goes nowhere.

### Change a date or venue

Edit `src/content/event.ts` for shared event information.

If the programme phase itself changes, also edit `src/content/schedule.ts`. Check:

- `countdownTarget`
- `openingDateLabel`
- `dateLabel`
- `closingDateLabel`
- phase `dateRange` values
- FAQ answers that mention dates
- CTA text

Always include an explicit UTC offset in countdown timestamps. UAE time is
`+04:00`.

### Update tracks

Edit `src/content/tracks.ts`.

Current public order:

1. Quantum Computing Foundations
2. Quantum Machine Learning
3. Quantum Cybersecurity
4. Quantum Computing & Biology
5. Quantum & Energy
6. Open Innovation

Preserve existing `slug` and `code` values unless you have checked every anchor,
route, and external link that may use them. Those identifiers deliberately remain
stable when visible titles change.

Do not publish difficulty, delivery mode, prerequisites, datasets, hardware,
judging criteria, partner assignments, or challenge details until confirmed.

### Update How It Works

Edit `src/content/schedule.ts`.

- Omit an unknown time instead of writing a placeholder time.
- Omit an unknown format instead of assuming it is hybrid.
- Use `tentative` for programme details that may change.
- Keep the closing showcase date as TBA until it is approved.

### Add a partner

Edit `src/content/sponsors.ts`.

Only add a partner after written approval. Add its logo to
`public/fall-fest-assets/`, register it in `src/content/assets.ts`, and reference
the exported asset.

Do not invent sponsorship tiers, prices, or benefits. The current sponsorship
package remains an **In Development** notice.

### Add a speaker or mentor

Edit the `speakers` array in `src/content/team.ts`.

Only publish a person after they have agreed to be announced. If there are no
confirmed speakers, leave the array empty; the website already displays an honest
announcement state.

### Update FAQs

Edit `src/content/faq.ts`.

The Home page automatically shows the first five entries. Reordering the full FAQ
therefore also changes the Home preview.

Keep answers cautious where eligibility, formats, teams, selection, or closing
arrangements vary by track.

### Update resources

Edit `src/content/resources.ts`.

The current order is intentional:

1. QCI GitHub
2. IBM Quantum Learning
3. IBM Quantum Platform
4. Qiskit Documentation
5. Qiskit GitHub
6. Qiskit Fall Fest 2026

The footer derives its resource links from this list.

## 5. Working with images and supplied assets

All event media lives in `public/fall-fest-assets/`.

After adding a file:

1. Keep the original file if it is part of the supplied source package.
2. Create a reasonably sized web derivative for large photos or hero artwork.
3. Register the file in `src/content/assets.ts`.
4. Import `fallFestAssets` and use the registered `src`.
5. Provide meaningful alternative text unless the image is purely decorative.

Do not write a bare path such as:

```tsx
<img src="/fall-fest-assets/example.png" />
```

Use:

```tsx
import { fallFestAssets } from "@/content/assets";

<img src={fallFestAssets.example.src} alt="Meaningful description" />
```

The asset helper adds the GitHub Pages project path and safely encodes filenames
containing spaces.

Current web derivatives include:

- `hero-without-title-web.jpg`
- `qci-logo-header.png`
- `ibm-quantum-wordmark.png`
- `hackathon.jpg`
- `bootcamp-web.jpg`

Do not replace official organization logos with AI-generated versions.

## 6. Page and component map

| Public page | Route file | Main shared components |
|---|---|---|
| Home | `src/app/page.tsx` | `Hero`, `StatsStrip`, `TrackCard`, shared sections |
| Tracks | `src/app/tracks/page.tsx` | `PageHeader`, `TrackCard`, `CtaSection` |
| How It Works | `src/app/schedule/page.tsx` | `Countdown`, `FormatSection` |
| Partners | `src/app/sponsors/page.tsx` | `PartnersSection`, partnership cards |
| About | `src/app/about/page.tsx` | organizer, event, research, and resource sections |
| FAQ | `src/app/faq/page.tsx` | `FaqAccordion`, `CtaSection` |

Shared shell:

- Header: `src/components/SiteHeader.tsx`
- Footer: `src/components/SiteFooter.tsx`
- Theme toggle: `src/components/ThemeToggle.tsx`
- Registration control: `src/components/RegisterButton.tsx`
- Custom pointer: `src/components/BlochCursor.tsx`
- Global tokens and patterns: `src/app/globals.css`

When a change should appear on several pages, update the shared component or
content export rather than copying the markup into every route.

### Cursor behavior

The Bloch cursor is available only on fine hover pointers when reduced motion is
not requested. Ordinary page clicks advance its displayed quantum state. Every
enabled link, button, disclosure, and form control receives an H-gate preview by
default. Add `data-gate="X"` or `data-gate="Z"` to an interactive element when a
specific gate is meaningful; `data-gate="H"` may be used explicitly too. Hovering
non-interactive elements does not trigger the gate treatment.

The bottom-right **Cursor VFX** control switches between the Bloch cursor and the
native system pointer. Its choice is saved in local storage under
`kuqci-custom-cursor-enabled`.

### Interior page artwork

`PageHeader` accepts an `art` variant and owns the decorative masthead composition.
Current assignments are `tracks`, `schedule`, `partners`, `about`, and `faq`; their
asset mapping lives in `src/components/PageHeader.tsx`. Keep these images decorative
(`alt=""`) because each page's actual title and meaning remain in HTML. Prefer
changing the variant mapping over adding one-off positioned art inside a route.

## 7. Design rules

The current system uses:

- QCI navy and gold as the foundation
- Qiskit purple as a co-brand color
- Fall Fest pink and bird/cloud art as restrained accents
- IBM Plex Sans and IBM Plex Mono
- dark and light themes from semantic CSS tokens

Use tokens such as `text-fg`, `bg-surface`, `border-border`, `text-gold`,
and `text-pink`. Do not hardcode colors in page components.

Keep the interface restrained:

- interactive cards may lift by no more than 2px;
- reveals should use short opacity/translation transitions;
- do not add parallax, tilt, continuous marquees, or animated status pills;
- reduced-motion users must see all content without animation;
- decorative art must never carry essential text.

## 8. Accessibility checklist

Every change should preserve:

- one logical `h1` on each page;
- sequential heading levels;
- keyboard access and visible focus;
- controls at least 44px high and wide where applicable;
- meaningful image alt text or `alt=""` for decoration;
- `aria-expanded` and `aria-controls` on disclosures;
- announced new-tab behavior where needed;
- 4.5:1 body-text contrast and 3:1 meaningful UI boundaries;
- no content hidden when reduced motion is enabled;
- no horizontal overflow at 320px;
- usable layouts at 200% zoom.

Test the mobile navigation with Tab, Shift+Tab, and Escape after changing the header.

## 9. Content honesty rules

Statuses mean:

| Status | Meaning |
|---|---|
| `confirmed` | Approved and safe to announce |
| `planning` | The direction exists; details are being developed |
| `tentative` | Proposed and may change |
| `tba` | No publishable detail yet |

Never publish:

- “first in the GCC/Gulf” or similar regional superlatives;
- a fixed closing date until approved;
- attendance targets as achieved facts;
- universal hybrid access;
- unconfirmed eligibility, team, workload, judging, hardware, dataset, finalist,
  recording, booth, or awards information;
- organizations, speakers, or mentors based only on informal discussions.

It is better to omit a detail than to publish a plausible guess.

## 10. Git and collaboration workflow

Before editing:

```bash
git status
git pull
```

Create a focused branch:

```bash
git switch -c update/short-description
```

After editing:

```bash
npm run build
git diff --check
git diff
git status
```

Commit only files related to your change. Do not discard another contributor's
uncommitted work.

A useful commit message is:

```text
Update Fall Fest registration details
```

## 11. Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`.

The workflow:

1. installs dependencies with `npm ci`;
2. determines the correct GitHub Pages base path;
3. runs the static build;
4. uploads `out/`;
5. deploys the Pages artifact.

The workflow also supports manual deployment through **Actions → Deploy to GitHub
Pages → Run workflow**.

For a representative project-page test on PowerShell:

```powershell
$env:BASE_PATH = "/Qiskit-Fall-Fest-2026-site"
npm.cmd run build
Remove-Item Env:BASE_PATH
```

On macOS/Linux:

```bash
BASE_PATH=/Qiskit-Fall-Fest-2026-site npm run build
```

Do not commit `.next/` or `out/`.

## 12. Definition of done

Before handing off any website update:

- [ ] The content is confirmed or clearly labelled as developing.
- [ ] Shared facts were changed in `src/content/`.
- [ ] Desktop and mobile layouts were checked.
- [ ] Both themes were checked.
- [ ] Keyboard focus still works.
- [ ] Images load and have correct alt text.
- [ ] There is no horizontal overflow at 320px.
- [ ] `npm run build` succeeds.
- [ ] `git diff --check` succeeds.
- [ ] The diff contains no unrelated files or secret information.

## 13. Further references

- `src/content/README.md` — concise content-editing reference
- `docs/superpowers/specs/2026-08-10-qiskit-fall-fest-site-design.md` — current
  product and design specification
- `CLAUDE.md` — repository rules and canonical facts for coding assistants
- `README.md` — quick setup and project summary

If a future instruction conflicts with an older document, confirm the new
information with the QCI organizing team and update every affected reference in the
same pull request.
