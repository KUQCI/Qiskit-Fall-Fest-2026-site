# Editing the site content

Everything the site says about the event lives in this folder. You should not need to
open anything in `src/components/` or `src/app/` to keep the site up to date.

After any edit, run `npm run dev` and check it in the browser before pushing.

## Which file do I edit?

| I want to change... | Edit |
|---|---|
| Dates, venue, the registration link, the countdown, headline numbers | `event.ts` |
| A track's name, description, level, or format | `tracks.ts` |
| The opening day / hacking period / closing showcase agenda | `schedule.ts` |
| Sponsors, partners, sponsorship packages | `sponsors.ts` |
| Questions and answers | `faq.ts` |
| Organising team, advisor, speakers | `team.ts` |
| IBM Quantum and Qiskit learning links | `resources.ts` |

## The two things that matter most

### 1. Turning on registration

In `event.ts`, `registrationUrl` starts as `null`. While it is null, every Register
button on the site shows a disabled "Registration opens soon" state.

Set it to your real link and every button across every page goes live at once:

```ts
registrationUrl: "https://forms.gle/your-real-form-link",
```

### 2. The `status` field

Tracks, sessions, speakers, and partners each carry a `status`:

- `"confirmed"` — agreed in writing. Renders normally.
- `"tentative"` — planned but not final. Renders with a "Tentative" badge.
- `"tba"` — renders "Details coming soon" instead of the description.

This exists so the site can go live before everything is locked without saying
anything untrue. Use it rather than inventing content or deleting the section.

**Do not list a sponsor until they have agreed in writing.** Naming a company that is
still in conversation is a public claim they have not consented to.

## Adding things

Each file is a plain array. Copy an existing entry, change the values, done.

Adding a track — append to the array in `tracks.ts`:

```ts
{
  slug: "quantum-sensing",       // must be unique; becomes the anchor link
  code: "SENSE-07",
  title: "Quantum Sensing",
  summary: "One or two sentences shown on the card.",
  level: "intermediate",         // beginner | intermediate | advanced | all-levels
  format: "hybrid",              // in-person | online | hybrid
  status: "tentative",
}
```

Adding a sponsor — append to `partners` in `sponsors.ts`. Put the logo file in
`public/partners/` and reference it as `/partners/your-logo.svg`. If you leave `logo`
out, the site renders the name in a styled plate instead, which looks fine.

Adding a speaker — append to `speakers` in `team.ts`. While that array is empty the
section shows an honest "speakers being confirmed" message, so there is no rush.

## If something breaks

Your editor will underline the problem in red — usually a missing comma, a missing
required field, or a `status` value that is not one of the three allowed strings.
`npm run build` will also fail with the file and line number.

Fields marked optional in `types.ts` (with `?`) can be left out entirely. Omitting a
field is always safer than filling it with a guess.
