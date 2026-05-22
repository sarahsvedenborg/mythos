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

## Phase 2 (current)

- **Archive**: search, filters (week, category, type, locked/unlocked), week vs category views
- **Explore**: global search, character/concept/place detail pages, filtered god/hero/monster lists
- **Today**: next-unlock schedule with local timezone, weekend archive prompt

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

### Seed Week 1 sample lessons

```bash
npm run seed:week1      # English
npm run seed:week1:no   # Norwegian (Bokmål)
```

Then publish drafts in Studio (or use the API). Lessons 1–5 are available in both languages when seeded and published.

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
| **3** | Streaks, favorites, localStorage progress |
| **4** | Offline lesson cache, push notifications |
| **5** | Gamification, quizzes, audio |

## Tech notes

- **Build**: `npm run build` uses webpack (required for Serwist + Studio bundle).
- **PWA**: Service worker is disabled in development; install on iPhone via Safari → Share → Add to Home Screen.
- **Images**: Host on Sanity CDN; remote pattern configured in `next.config.ts`.

## License

Private — see repository owner.
