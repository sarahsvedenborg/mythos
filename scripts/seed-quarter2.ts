/**
 * Seeds Quarter 2 lessons 66–130 (weeks 14–26) in English and Norwegian.
 *
 * Run: npm run seed:quarter2
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */
import { block, createSeedClient, upsertLessons, type LessonSeed } from "./seed-lib";
import { quarter2Outline } from "./seed-data/outline-quarter2";
import { contentEn66to97 } from "./seed-data/content-en-66-97";
import { contentEn98to130 } from "./seed-data/content-en-98-130";
import { contentNo66to97 } from "./seed-data/content-no-66-97";
import { contentNo98to130 } from "./seed-data/content-no-98-130";
import type { LessonContent } from "./seed-data/content-en-6-35";

const contentEn: Record<number, LessonContent> = {
  ...contentEn66to97,
  ...contentEn98to130,
};

const contentNo: Record<number, LessonContent> = {
  ...contentNo66to97,
  ...contentNo98to130,
};

function buildLessons(locale: "en" | "no"): LessonSeed[] {
  const content = locale === "en" ? contentEn : contentNo;

  return quarter2Outline.map((outline) => {
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

  console.log(`Seeding ${enLessons.length} English lessons (66–130)...`);
  await upsertLessons(client, enLessons, "en");

  console.log(`Seeding ${noLessons.length} Norwegian lessons (66–130)...`);
  await upsertLessons(client, noLessons, "no");

  console.log(
    "Quarter 2 seed complete (lessons 66–130). Publish in Studio if drafts were created."
  );
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
