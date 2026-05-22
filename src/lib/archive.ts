import type { LessonCard } from "@/types/lesson";
import { isLessonUnlocked } from "@/lib/lessons";

export type ArchiveView = "week" | "category";
export type ArchiveFilter =
  | "all"
  | "unlocked"
  | "locked"
  | "completed"
  | "favorites";

export const LESSON_CATEGORIES = [
  "cosmos",
  "olympians",
  "heroes",
  "monsters",
  "places",
  "concepts",
  "symbols",
  "themes",
  "culture",
] as const;

export type LessonCategory = (typeof LESSON_CATEGORIES)[number];

export type ArchiveFiltersState = {
  query: string;
  view: ArchiveView;
  availability: ArchiveFilter;
  week: number | null;
  category: LessonCategory | null;
  lessonType: string | null;
};

export const defaultArchiveFilters: ArchiveFiltersState = {
  query: "",
  view: "week",
  availability: "all",
  week: null,
  category: null,
  lessonType: null,
};

export function searchLessons(lessons: LessonCard[], query: string): LessonCard[] {
  const q = query.trim().toLowerCase();
  if (!q) return lessons;

  return lessons.filter((lesson) => {
    const haystack = [
      lesson.title,
      lesson.shortHook,
      lesson.takeaway,
      lesson.pronunciation ?? "",
      String(lesson.lessonNumber),
      lesson.category,
      lesson.lessonType,
      ...(lesson.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export type ProgressFilterSets = {
  completed: Set<number>;
  favorites: Set<number>;
};

export function filterLessons(
  lessons: LessonCard[],
  filters: ArchiveFiltersState,
  now = new Date(),
  progress?: ProgressFilterSets
): LessonCard[] {
  let result = lessons;

  if (filters.availability === "unlocked") {
    result = result.filter((l) => isLessonUnlocked(l, now));
  } else if (filters.availability === "locked") {
    result = result.filter((l) => !isLessonUnlocked(l, now));
  } else if (filters.availability === "completed") {
    result = progress
      ? result.filter((l) => progress.completed.has(l.lessonNumber))
      : [];
  } else if (filters.availability === "favorites") {
    result = progress
      ? result.filter((l) => progress.favorites.has(l.lessonNumber))
      : [];
  }

  if (filters.week !== null) {
    result = result.filter((l) => l.week === filters.week);
  }

  if (filters.category) {
    result = result.filter((l) => l.category === filters.category);
  }

  if (filters.lessonType) {
    result = result.filter((l) => l.lessonType === filters.lessonType);
  }

  result = searchLessons(result, filters.query);

  return result;
}

export function groupLessonsByWeek(lessons: LessonCard[]): Record<number, LessonCard[]> {
  return lessons.reduce<Record<number, LessonCard[]>>((acc, lesson) => {
    if (!acc[lesson.week]) acc[lesson.week] = [];
    acc[lesson.week].push(lesson);
    return acc;
  }, {});
}

export function groupLessonsByCategory(lessons: LessonCard[]): Record<string, LessonCard[]> {
  return lessons.reduce<Record<string, LessonCard[]>>((acc, lesson) => {
    const key = lesson.category || "other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(lesson);
    return acc;
  }, {});
}

export function getAvailableWeeks(lessons: LessonCard[]): number[] {
  return [...new Set(lessons.map((l) => l.week))].sort((a, b) => a - b);
}

export function getAvailableLessonTypes(lessons: LessonCard[]): string[] {
  return [...new Set(lessons.map((l) => l.lessonType))].sort();
}
