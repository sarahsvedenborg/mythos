import type { LessonCard } from "@/types/lesson";

const MS_PER_DAY = 86_400_000;

/** Curriculum start: first Monday lesson unlocks on this date (local midnight). */
export const CURRICULUM_START = new Date("2026-01-05T00:00:00");

export function getTodayStart(now = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isWeekend(date = new Date()): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/** Map calendar date to lesson number (1–260) for Mon–Fri only. */
export function getLessonNumberForDate(date: Date): number | null {
  if (isWeekend(date)) return null;

  const start = getTodayStart(CURRICULUM_START);
  const target = getTodayStart(date);
  const diffDays = Math.floor((target.getTime() - start.getTime()) / MS_PER_DAY);

  if (diffDays < 0) return null;

  let weekdays = 0;
  for (let i = 0; i <= diffDays; i++) {
    const d = new Date(start.getTime() + i * MS_PER_DAY);
    if (!isWeekend(d)) weekdays++;
  }

  if (weekdays < 1 || weekdays > 260) return null;
  return weekdays;
}

export function getUnlockDateForLesson(lessonNumber: number): Date {
  const start = getTodayStart(CURRICULUM_START);
  let weekdays = 0;
  let cursor = new Date(start);

  while (weekdays < lessonNumber) {
    if (!isWeekend(cursor)) weekdays++;
    if (weekdays < lessonNumber) {
      cursor = new Date(cursor.getTime() + MS_PER_DAY);
    }
  }

  return cursor;
}

export function isLessonUnlocked(
  lesson: Pick<LessonCard, "unlockDate" | "lessonNumber">,
  now = new Date()
): boolean {
  if (lesson.unlockDate) {
    return new Date(lesson.unlockDate) <= now;
  }
  const unlock = getUnlockDateForLesson(lesson.lessonNumber);
  return unlock <= now;
}

export function getReleasedLessons(lessons: LessonCard[], now = new Date()): LessonCard[] {
  return lessons.filter((lesson) => isLessonUnlocked(lesson, now));
}

export function getTodaysLesson(lessons: LessonCard[], now = new Date()): LessonCard | null {
  const released = getReleasedLessons(lessons, now);
  if (released.length === 0) return null;

  const lessonNumber = getLessonNumberForDate(now);
  if (lessonNumber) {
    const match = released.find((l) => l.lessonNumber === lessonNumber);
    if (match) return match;
  }

  return released[released.length - 1] ?? null;
}

export function formatWeekday(day: number): string {
  const names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return names[day - 1] ?? "";
}

export function formatLessonType(type: string): string {
  const labels: Record<string, string> = {
    character: "Character",
    story: "Story",
    concept: "Concept",
    entity: "Monster / Place",
    theme: "Theme",
  };
  return labels[type] ?? type;
}
