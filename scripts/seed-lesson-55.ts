/**
 * Restore lesson 55 (Destiny vs free will) in EN and NO.
 * Run: npx tsx --env-file=.env.local scripts/seed-lesson-55.ts
 */
import { block, createSeedClient, upsertLessons, type LessonSeed } from "./seed-lib";
import { contentEn36to65 } from "./seed-data/content-en-36-65";
import { contentNo36to65 } from "./seed-data/content-no-36-65";

const outline = {
  lessonNumber: 55,
  week: 11,
  day: 5 as const,
  lessonType: "theme" as const,
  category: "themes",
  title: "Destiny vs free will",
  slug: "destiny-vs-free-will",
};

function build(locale: "en" | "no"): LessonSeed {
  const body = locale === "en" ? contentEn36to65[55] : contentNo36to65[55];
  return {
    ...outline,
    title: locale === "en" ? outline.title : "Skjebne mot fri vilje",
    slug: outline.slug,
    shortHook: body.shortHook,
    content: body.paragraphs.map((p) => block(p)),
    whyItMatters: body.whyItMatters,
    takeaway: body.takeaway,
    pronunciation: body.pronunciation,
    tags: body.tags,
  };
}

async function main() {
  const client = createSeedClient();
  await upsertLessons(client, [build("en")], "en");
  await upsertLessons(client, [build("no")], "no");
  console.log("Lesson 55 restored (en + no). Publish in Studio if needed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
