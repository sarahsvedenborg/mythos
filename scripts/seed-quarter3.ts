/**
 * Seeds Quarter 3 lessons 131–195 (weeks 27–39) in English and Norwegian.
 *
 * Run: npm run seed:quarter3
 */
import { block, createSeedClient, upsertLessons, type LessonSeed } from "./seed-lib";
import { quarter3Outline } from "./seed-data/outline-quarter3";
import { contentEn131to163 } from "./seed-data/content-en-131-163";
import { contentEn164to195 } from "./seed-data/content-en-164-195";
import { contentNo131to163 } from "./seed-data/content-no-131-163";
import { contentNo164to195 } from "./seed-data/content-no-164-195";
import type { LessonContent } from "./seed-data/content-en-6-35";

const contentEn: Record<number, LessonContent> = {
  ...contentEn131to163,
  ...contentEn164to195,
};

const contentNo: Record<number, LessonContent> = {
  ...contentNo131to163,
  ...contentNo164to195,
};

function buildLessons(locale: "en" | "no"): LessonSeed[] {
  const content = locale === "en" ? contentEn : contentNo;

  return quarter3Outline.map((outline) => {
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

  console.log(`Seeding ${enLessons.length} English lessons (131–195)...`);
  await upsertLessons(client, enLessons, "en");

  console.log(`Seeding ${noLessons.length} Norwegian lessons (131–195)...`);
  await upsertLessons(client, noLessons, "no");

  console.log(
    "Quarter 3 seed complete (lessons 131–195). Publish in Studio if drafts were created."
  );
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
