# Mythos — Learn Greek Mythology Daily

A mobile-first Progressive Web App for daily Greek mythology micro-lessons. Built with **Next.js 16**, **Sanity CMS**, **Tailwind CSS**, **shadcn/ui**, and **Framer Motion**.

## Languages

- **English** (`/en/...`) and **Norwegian Bokmål** (`/no/...`)
- UI strings via `next-intl` (`messages/en.json`, `messages/no.json`)
- Sanity content filtered by `locale` field on each document
- Language switcher in **Settings**

## Phase 1

- Next.js App Router with dark, mythology-inspired UI
- Embedded Sanity Studio at `/studio`
- Content types: `lesson`, `character`, `concept`, `location`
- Lesson rendering with Portable Text
- PWA manifest + Serwist service worker (production)

## Phase 2

- **Archive**: search, filters (week, category, type, locked/unlocked), week vs category views
- **Explore**: global search, character/concept/place detail pages, filtered god/hero/monster lists
- **Today**: next-unlock schedule with local timezone, weekend archive prompt

## Phase 3

- **localStorage** progress (`mythos-progress-v1`): completed lessons + favorites
- **Weekday streak** on Today and Progress (weekends are neutral)
- **Lesson actions**: mark as read, add to favorites on each lesson page
- **Archive filters**: Completed, Favorites (`/archive?filter=favorites`)
- **Settings**: clear local progress

## Sanity project

| | |
|---|---|
| **Project** | Mythos - Greek Mythology |
| **Project ID** | `mff8k4rr` |
| **Dataset** | `production` |

Manage content at [sanity.io/manage](https://www.sanity.io/manage) or locally at [http://localhost:3000/studio](http://localhost:3000/studio).

## Quick start

```bash
cp .env.example .env.local
# Add SANITY_API_WRITE_TOKEN from sanity.io/manage → API → Tokens (Editor)

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to **Today**.

### Seed lessons into Sanity

```bash
npm run seed:week1      # Week 1 (lessons 1–5) — English
npm run seed:week1:no   # Week 1 (lessons 1–5) — Norwegian
npm run seed:quarter1   # Weeks 2–13 (lessons 6–65) — English + Norwegian
```

Requires `SANITY_API_WRITE_TOKEN` in `.env.local`. Publish any drafts in Studio after seeding.

| Range | Weeks | Lessons |
|-------|-------|---------|
| Week 1 scripts | 1 | 1–5 |
| Quarter 1 script | 2–13 | 6–65 |

### Deploy schema changes

```bash
npm run sanity:deploy
```

## Curriculum

- **260 weekday lessons** (52 weeks × 5 days)
- Curriculum start date: **5 January 2026** (configurable in `src/lib/lessons.ts`)
- Monday = Character · Tuesday = Story · Wednesday = Concept · Thursday = Entity · Friday = Theme

Full outline is in the product PRD.

## Roadmap (from PRD)

| Phase | Focus |
|-------|--------|
| **2** | Done — archive search/filters, explore detail pages, unlock polish |
| **3** | Done — streaks, favorites, localStorage progress |
| **4** | Offline lesson cache, push notifications |
| **5** | Gamification, quizzes, audio |

## App icon (PWA / home screen)

Icons live in **`public/icons/`**:

| File | Size | Used for |
|------|------|----------|
| `apple-touch-icon.png` | 180×180 | iPhone home screen (Safari “Add to Home Screen”) |
| `icon-192.png` | 192×192 | PWA manifest, browser tab |
| `icon-512.png` | 512×512 | PWA manifest (splash / install) |

Paths are wired in `src/app/manifest.ts` and `src/app/layout.tsx`.

**To change the icon:** replace those three PNGs (same filenames), redeploy, then on iPhone **remove the old home-screen shortcut and add it again** — iOS often caches the old icon.

Design tips: square art, simple symbol, safe padding (~10%) for maskable crop; match `theme_color` `#0a0e1a` in the manifest for a seamless edge.

## Tech notes

- **Build**: `npm run build` uses webpack (required for Serwist + Studio bundle).
- **PWA**: Service worker is disabled in development; install on iPhone via Safari → Share → Add to Home Screen.
- **Images**: Host on Sanity CDN; remote pattern configured in `next.config.ts`.

## License

Private — see repository owner.
