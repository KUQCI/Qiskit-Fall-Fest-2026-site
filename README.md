# Qiskit Fall Fest 2026

Website for Qiskit Fall Fest 2026, hosted by the Quantum Computing Initiative and
Club (QCI) at Khalifa University in Abu Dhabi. The event opens on 19 October 2026
at 6:00 PM UAE time, followed by an approximately two-week challenge period;
closing showcase date(s) are still to be announced.

## Running it

```bash
npm install
npm run dev
```

Opens on http://localhost:4321.

```bash
npm run build
```

Builds a fully static site into `out/`. No server required — it can be hosted on
GitHub Pages, Vercel, Netlify, or KU web hosting by uploading that folder.

## Editing content

**You do not need to touch any component to keep this site up to date.**
Everything the site says lives in `src/content/`. See
[`src/content/README.md`](src/content/README.md) for the full guide.

Most common edits:

| Task | File |
|---|---|
| Turn on registration | `src/content/event.ts` → set `registrationUrl` |
| Change dates or venue | `src/content/event.ts` |
| Add or edit a track | `src/content/tracks.ts` |
| Update the agenda | `src/content/schedule.ts` |
| Add a sponsor | `src/content/sponsors.ts` |
| Add a speaker | `src/content/team.ts` |
| Add an FAQ | `src/content/faq.ts` |

### The `status` field

Tracks, sessions, speakers, and partners carry an explicit content status such as
`"confirmed"`, `"planning"`, `"tentative"`, or `"tba"`. This lets the site publish
confirmed facts while clearly labelling work that is still developing.

**Do not list a sponsor until they have agreed in writing.**

## Project structure

```
src/
  content/      Event data — the only files most edits touch
  components/   Presentational components; never hardcode event data here
  app/          Routes (App Router, static export)
docs/
  UI-REVIEW.md  6-pillar visual audit
  superpowers/specs/   Design spec
```

## Design system

Tokens live in `src/app/globals.css`. Never hardcode a colour in a component — add or
use a token so both the dark and light themes stay correct.

- **Palette** — navy/gold from the QCI seal, with Qiskit purple as a co-brand accent.
  Dark is the default; light is a toggle.
- **Type** — IBM Plex Sans and IBM Plex Mono.
- **Motion** — a restrained ambient quantum field, live countdown, short scroll
  reveals, and an optional fine-pointer cursor. Motion is removed under
  `prefers-reduced-motion` without hiding content.

Both themes pass WCAG AA contrast (verified, 0 failures).

## Still to do before launch

Tracked in `src/content/` as `TODO(team)` comments:

- Set the registration URL
- Confirm track requirements, formats, challenges, and participation rules
- Confirm the closing showcase date or dates
- Add speakers and mentors only after they agree to be announced
- Replace the sponsorship development notice when packages are approved
