/**
 * Seeds Quarter 1 lessons 6–65 (weeks 2–13) in English and Norwegian.
 * Week 1 (lessons 1–5) is handled by seed:week1 and seed:week1:no.
 *
 * Run: npm run seed:quarter1
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */
import { block, createSeedClient, upsertLessons, type LessonSeed } from "./seed-lib";
import { quarter1Outline } from "./seed-data/outline";
import { contentEn6to35 } from "./seed-data/content-en-6-35";
import { contentEn36to65 } from "./seed-data/content-en-36-65";
import { contentNo6to35 } from "./seed-data/content-no-6-35";
import { contentNo36to65 } from "./seed-data/content-no-36-65";
import type { LessonContent } from "./seed-data/content-en-6-35";

const contentEn: Record<number, LessonContent> = {
  ...contentEn6to35,
  ...contentEn36to65,
};

const contentNo: Record<number, LessonContent> = {
  ...contentNo6to35,
  ...contentNo36to65,
};

function buildLessons(locale: "en" | "no"): LessonSeed[] {
  const content = locale === "en" ? contentEn : contentNo;

  return quarter1Outline.map((outline) => {
    const body = content[outline.lessonNumber];
    if (!body) {
      throw new Error(`Missing ${locale} content for lesson ${outline.lessonNumber}`);
    }

    return {
      lessonNumber: outline.lessonNumber,
      week: outline.week,
      day: outline.day,
      lessonType: outline.lessonType,
      category: outline.category,
      title: outline.title,
      slug: outline.slug,
      shortHook: body.shortHook,
      content: body.paragraphs.map((p) => block(p)),
      whyItMatters: body.whyItMatters,
      takeaway: body.takeaway,
      pronunciation: body.pronunciation,
      tags: body.tags,
    };
  });
}

async function seed() {
  const client = createSeedClient();
  const enLessons = buildLessons("en");
  const noLessons = buildLessons("no");

  console.log(`Seeding ${enLessons.length} English lessons (6–65)...`);
  await upsertLessons(client, enLessons, "en");

  console.log(`Seeding ${noLessons.length} Norwegian lessons (6–65)...`);
  await upsertLessons(client, noLessons, "no");

  console.log(
    "Quarter 1 seed complete (lessons 6–65). Publish in Studio if drafts were created."
  );
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
