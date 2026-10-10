# 💪 FitLog — Workout Library

**Train with intent. Log every set.**

A responsive gym companion built for Programming Hero's B14 Assignment 6. Explore workouts, inspect their instructions, build today's training plan, and save lifts for later.

## Technologies

- Next.js 15 and React 19, using the App Router
- Tailwind CSS 4 and DaisyUI 5
- Lucide React icons and React Hot Toast
- Self-hosted Inter / Oswald fonts
- Browser localStorage for persistence
- Node's built-in test runner

## Key features

1. Responsive dark-and-lime workout library based on the supplied design, with original repository artwork.
2. API-powered workout cards, loading skeletons, name/tag search, and detailed exercise pages.
3. Independent Today's Plan and Saved lists with live navigation counters.
4. Live exercise, minute, and calorie totals; duration/calorie/rating sorting.
5. Mark-as-done and remove actions with toast notifications.
6. Maximum of five **unfinished** lifts; completing a lift frees a slot. Completed entries remain visible until removed.
7. Duplicate prevention and persistent plan/saved data across reloads.
8. Custom 404, accessible labels, keyboard focus states, reduced-motion support, and direct-link refresh support.

## Run locally

Requires Node.js 20.9+ (Node 22 or 24 recommended).

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

```bash
npm test
npm run build
```

The production export is generated in `out/`. Serve that directory with any static web server; do not open its HTML with `file://`. `next start` is not used for a static export.

## Routes

| Route                     | Purpose                                            |
| ------------------------- | -------------------------------------------------- |
| `/`                       | Hero and workout library                           |
| `/workout/?id=WORKOUT_ID` | Workout details, including single-item API request |
| `/my-plan/`               | Today's Plan and Saved lists                       |
| `/my-plan/?tab=saved`     | Open the Saved tab directly                        |
| Unknown path              | Custom 404 page                                    |

A query-string ID lets any API workout work on static hosting without prebuilding a fixed set of IDs.

## Data and outage behaviour

The app requests these **assignment-provided** endpoints in order:

1. `https://api.abcz.workers.dev/api/fitlog`
2. `https://api.api-store.workers.dev/api/fitlog`

Details additionally request `BASE_URL/:id`. Requests time out individually and fall back automatically.

**Verification limitation:** both APIs returned Cloudflare rate-limit HTML during development. Therefore the real payload schema, full live dataset, external images, and CORS behaviour could not be verified. The adapter supports common list/data wrappers and field names, but must be checked against the actual response once the service recovers.

If both APIs fail, FitLog shows the last successful locally cached API response. With no cache, it shows **12 explicitly labelled offline sample workouts** from `lib/sample-workouts.mjs`. These are illustrative sample data, not a downloaded copy of the official API. The fallback illustration comes from the supplied Penpot file and is not an exercise-specific demonstration. A visible banner and Retry button make the outage clear. Sample IDs use `sample-` to avoid collisions with live IDs.

Plan and saved data are browser-local; they are not shared across devices and do not reset automatically at midnight. Counters and totals include completed plan entries until removed. The five-lift limit counts unfinished entries.

## Deployment

### Vercel

Import your own GitHub repository. Set **Framework Preset: Next.js**, build command `npm run build`, and output directory `out` if the dashboard asks. No environment variables or API keys are needed. Make sure the production URL is publicly accessible to your examiner.

### Netlify

Import your repository. The included `netlify.toml` sets `npm run build` and `out` automatically. Alternatively, build locally and drag the contents of `out` into Netlify's manual deploy area.

Avoid a catch-all rewrite to `/index.html`; the application exports separate routes and a real 404 page.

## Validation

- `npm test`: six automated checks cover duplicate prevention, five-active-lift cap, completion freeing a slot, totals/removal, sorting, normalization, and malformed storage.
- `npm run build`: production compilation and static export.
- Browser visual/interaction QA was not available in the build environment. Follow `SUBMISSION.md` before submitting.

## Submission links

Fill these with **your own public deployment and GitHub repository**, as required:

- **Live Link:** TO BE FILLED AFTER PUBLIC DEPLOYMENT
- **GitHub Repository Link:** TO BE FILLED AFTER PUSHING TO YOUR ACCOUNT

See `SUBMISSION.md` for steps that preserve the included commit history.

## Credits

Assignment specification and provided assets: [ProgrammingHero1/B14-A6-Fit-Log](https://github.com/ProgrammingHero1/B14-A6-Fit-Log). Original design colours, fonts, and extracted illustration informed this implementation. The implementation has not been pixel-compared in a browser.
