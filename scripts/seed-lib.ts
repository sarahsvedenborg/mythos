import { createClient } from "@sanity/client";
import { getUnlockDateForLesson } from "../src/lib/lessons";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const token = process.env.SANITY_API_WRITE_TOKEN;

export function createSeedClient() {
  if (!token) {
    console.error("Set SANITY_API_WRITE_TOKEN in .env.local");
    process.exit(1);
  }
  return createClient({
    projectId,
    dataset,
    apiVersion: "2025-05-22",
    token,
    useCdn: false,
  });
}

export function block(text: string) {
  return {
    _type: "block" as const,
    style: "normal" as const,
    markDefs: [] as [],
    children: [{ _type: "span" as const, text, marks: [] as [] }],
  };
}

export type LessonSeed = {
  lessonNumber: number;
  week: number;
  day: number;
  lessonType: "character" | "story" | "concept" | "entity" | "theme";
  category: string;
  title: string;
  slug: string;
  shortHook: string;
  content: ReturnType<typeof block>[];
  whyItMatters: string;
  takeaway: string;
  pronunciation?: string;
  tags: string[];
};

export async function upsertLessons(
  client: ReturnType<typeof createSeedClient>,
  lessons: LessonSeed[],
  locale: "en" | "no"
) {
  for (const lesson of lessons) {
    const unlockDate = getUnlockDateForLesson(lesson.lessonNumber).toISOString();
    const doc = {
      _type: "lesson",
      locale,
      ...lesson,
      slug: { _type: "slug", current: lesson.slug },
      estimatedReadMinutes: 3,
      unlockDate,
      publishedAt: unlockDate,
    };

    const existing = await client.fetch<string | null>(
      `*[_type == "lesson" && lessonNumber == $n && locale == $locale][0]._id`,
      { n: lesson.lessonNumber, locale }
    );

    if (existing) {
      await client.patch(existing).set(doc).commit();
      console.log(`Updated [${locale}] #${lesson.lessonNumber}: ${lesson.title}`);
    } else {
      await client.create(doc);
      console.log(`Created [${locale}] #${lesson.lessonNumber}: ${lesson.title}`);
    }
  }
}
