/**
 * Seeds Week 1 lessons (1–5) into Sanity.
 * Run: npx tsx scripts/seed-week1.ts
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */
import { createClient } from "@sanity/client";
import { getUnlockDateForLesson } from "../src/lib/lessons";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Set SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-05-22",
  token,
  useCdn: false,
});

function block(text: string) {
  return {
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", text, marks: [] }],
  };
}

const week1 = [
  {
    lessonNumber: 1,
    week: 1,
    day: 1,
    lessonType: "character",
    category: "cosmos",
    title: "Chaos — the beginning of everything",
    slug: "chaos-beginning",
    shortHook: "Before gods, titans, or mortals, there was only Chaos — the vast, formless opening of the Greek cosmos.",
    content: [
      block(
        "Greek creation does not start with a craftsman god shaping the world from nothing. It starts with Chaos: a yawning gap, a primordial mixture, the first state of existence. Out of Chaos came Gaia (Earth), Tartarus (the deep abyss), Eros (desire), Erebus (darkness), and Nyx (night)."
      ),
      block(
        "Chaos is not evil in the modern sense. It is potential — unformed, unlimited, and older than order. Every later dynasty of gods, titans, and heroes will emerge from what Chaos made possible."
      ),
    ],
    whyItMatters:
      "Understanding Chaos helps you read Greek myth as a story of order emerging from formlessness — a theme that repeats whenever civilization replaces wilderness.",
    takeaway: "Chaos is not destruction; it is the empty stage on which the entire mythological world will appear.",
    pronunciation: "KAY-os",
    tags: ["creation", "cosmos", "primordial"],
  },
  {
    lessonNumber: 2,
    week: 1,
    day: 2,
    lessonType: "story",
    category: "cosmos",
    title: "Gaia and Uranus",
    slug: "gaia-and-uranus",
    shortHook: "Earth and Sky become the first divine couple — and their children will change everything.",
    content: [
      block(
        "Gaia, born from Chaos, is Earth itself: mountains, soil, the living ground. Uranus is the Sky, her equal and partner. Together they produce the first generations of divine beings, including the twelve Titans."
      ),
      block(
        "Their union is both creative and troubled. Uranus hides some of their children inside Gaia, fearing their power. This betrayal sets the stage for the first great rebellion in myth — and the pattern of sons overthrowing fathers."
      ),
    ],
    whyItMatters: "Gaia and Uranus establish Earth and Sky as the parents of all later powers — a cosmic family tree rooted in the physical world.",
    takeaway: "The marriage of Earth and Sky begins Greek myth's long story of power, fear, and succession.",
    pronunciation: "GUY-ah · yoo-RAY-nus",
    tags: ["creation", "titans", "gaia"],
  },
  {
    lessonNumber: 3,
    week: 1,
    day: 3,
    lessonType: "concept",
    category: "cosmos",
    title: "What Titans are",
    slug: "what-are-titans",
    shortHook: "Titans are not just 'big gods' — they are an earlier divine generation between primordial beings and the Olympians.",
    content: [
      block(
        "The Titans are the children of Gaia and Uranus: powerful, ancient deities who ruled before Zeus and the Olympians. Names like Cronus, Rhea, Oceanus, and Hyperion belong to this age."
      ),
      block(
        "In Greek thought, the Titan era represents an older order — closer to nature's raw forces than to the polished city gods of Olympus. When the Olympians win the Titanomachy, myth dramatizes the triumph of a newer cosmic regime."
      ),
    ],
    whyItMatters: "Knowing who counts as a Titan prevents confusion when reading myths about Cronus, Prometheus, or Atlas.",
    takeaway: "Titans are the divine generation between primordial Chaos and the familiar Olympian gods.",
    tags: ["titans", "cosmos", "vocabulary"],
  },
  {
    lessonNumber: 4,
    week: 1,
    day: 4,
    lessonType: "entity",
    category: "cosmos",
    title: "Tartarus and the Underworld",
    slug: "tartarus-underworld",
    shortHook: "Not all 'underworlds' are the same — Tartarus is the deepest prison; Hades' realm is where most souls go.",
    content: [
      block(
        "Tartarus began as a primordial abyss — a place as old as Gaia, deeper than the living earth. Later myths use it as a prison for defeated monsters and rebellious gods, including the Titans after their fall."
      ),
      block(
        "The Underworld ruled by Hades is a separate idea: the general realm of the dead, crossed by rivers like Styx and guarded eventually by Cerberus. Think of Tartarus as maximum depth; the Underworld as the common afterlife."
      ),
    ],
    whyItMatters: "Hero journeys, punishments, and monster-banishments often depend on which 'below' a myth means.",
    takeaway: "Tartarus is the deepest pit; the Underworld is where ordinary souls travel after death.",
    tags: ["underworld", "tartarus", "hades"],
  },
  {
    lessonNumber: 5,
    week: 1,
    day: 5,
    lessonType: "theme",
    category: "cosmos",
    title: "Fate in Greek mythology",
    slug: "fate-in-greek-mythology",
    shortHook: "Even Zeus cannot simply ignore Fate — but what 'fate' means in Greek myth is richer than destiny alone.",
    content: [
      block(
        "Greeks imagined Fate (Moira, or the Moirai — Clotho, Lachesis, and Atropos) as the force that spins, measures, and cuts the thread of life. Prophecies in myth often express what Fate has already woven."
      ),
      block(
        "This does not erase choice: heroes still act, rebel, and regret. Tragedy thrives in the tension between human decision and what cannot be avoided — as Oedipus and Achilles will later show."
      ),
    ],
    whyItMatters: "Fate is the backbone of Greek tragedy and explains why prophecies in myth so often come true in unexpected ways.",
    takeaway: "Fate in Greek myth is the limit even gods respect — the pattern heroes challenge at their peril.",
    pronunciation: "MOY-rye",
    tags: ["fate", "moirai", "themes"],
  },
];

async function seed() {
  for (const lesson of week1) {
    const unlockDate = getUnlockDateForLesson(lesson.lessonNumber).toISOString();
    const doc = {
      _type: "lesson",
      locale: "en",
      ...lesson,
      slug: { _type: "slug", current: lesson.slug },
      estimatedReadMinutes: 3,
      unlockDate,
      publishedAt: unlockDate,
    };

    const existing = await client.fetch<string | null>(
      `*[_type == "lesson" && lessonNumber == $n && (locale == $locale || (!defined(locale) && $locale == "en"))][0]._id`,
      { n: lesson.lessonNumber, locale: "en" }
    );

    if (existing) {
      await client.patch(existing).set(doc).commit();
      console.log(`Updated lesson ${lesson.lessonNumber}: ${lesson.title}`);
    } else {
      await client.create(doc);
      console.log(`Created lesson ${lesson.lessonNumber}: ${lesson.title}`);
    }
  }
  console.log("Week 1 seed complete. Publish documents in Studio if needed.");
}

seed().catch(console.error);
