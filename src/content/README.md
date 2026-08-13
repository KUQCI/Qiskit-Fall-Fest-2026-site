# Editing site content

Event facts and page copy live in this folder. Components should render these exports;
they should not duplicate dates, track descriptions, partner claims, or other event data.

After an edit, run `npm run build` with the development server stopped.

## Where things live

| Change | File |
|---|---|
| Event identity, opening time, venue, registration, contact, socials, home/footer/CTA copy | `event.ts` |
| Track names, broad descriptions, order, and Tracks page copy | `tracks.ts` |
| Three phases, sessions, and How It Works page copy | `schedule.ts` |
| Confirmed partners and the single in-development sponsorship package | `sponsors.ts` |
| Questions and cautious answers | `faq.ts` |
| Organizer, advisor, past events, R&D projects, and speakers | `team.ts` |
| Learning links and shared section copy | `resources.ts` |
| Public design assets and base-path-safe URLs | `assets.ts` |

## Registration

`event.registrationUrl` is `null` while registration is unavailable. Set it once to
activate every registration control that consumes the event configuration:

```ts
registrationUrl: "https://example.com/registration",
```

Keep `registrationNote` accurate alongside it.

## Statuses and content honesty

- `confirmed`: agreed and safe to announce.
- `planning`: the direction exists, while details are still being developed.
- `tentative`: a proposed programme detail that may change.
- `tba`: no publishable detail yet.

The six track cards intentionally omit levels, modes, algorithms, judging criteria,
partners, and prerequisites. Add those fields only after they are confirmed. Preserve
track slugs and codes because they can be used as anchors or keys even when the public
name changes.

Never list a sponsor, speaker, or partner department based only on a conversation.
Only IBM Quantum and Khalifa University currently appear in the confirmed partner list.

## Assets

Put supplied event media in `public/fall-fest-assets/`, then register it in `assets.ts`.
Use the exported `src` instead of a bare `/fall-fest-assets/...` URL. The helper adds
the GitHub Pages base path at build time and URL-encodes filenames containing spaces.

The original CR2/JPG event photos are preserved. Pages should use the web derivatives
`hackathon.jpg` and `bootcamp-web.jpg`. Partner displays should use
`ibm-quantum-wordmark.png` and the appropriate Khalifa University logo.

## Adding speakers or projects

The empty `speakers` array creates an honest announcement state. Add a `Speaker` only
after the person has agreed to be named. R&D cards use verified existing links; omit a
link rather than guessing a project URL.

Type definitions in `types.ts` make deliberately unconfirmed fields optional. If
something is not known, omission is safer than placeholder specificity.
