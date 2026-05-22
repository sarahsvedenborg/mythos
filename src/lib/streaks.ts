import { isWeekend } from "@/lib/lessons";
import { toDateKey } from "@/lib/progress-storage";

const MS_PER_DAY = 86_400_000;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

function prevWeekday(date: Date): Date {
  let cursor = addDays(date, -1);
  while (isWeekend(cursor)) {
    cursor = addDays(cursor, -1);
  }
  return cursor;
}

/**
 * Weekday learning streak: consecutive Mon–Fri days with at least one completed lesson.
 * Weekends are neutral — they neither increment nor break the streak.
 */
export function computeWeekdayStreak(
  completedDateKeys: Set<string>,
  now = new Date()
): number {
  let streak = 0;
  let cursor = startOfDay(now);

  if (isWeekend(cursor)) {
    cursor = prevWeekday(cursor);
  } else if (!completedDateKeys.has(toDateKey(cursor))) {
    cursor = prevWeekday(cursor);
  }

  while (!isWeekend(cursor)) {
    const key = toDateKey(cursor);
    if (completedDateKeys.has(key)) {
      streak++;
      cursor = prevWeekday(cursor);
    } else {
      break;
    }
  }

  return streak;
}

/** Longest weekday streak in the user's completion history. */
export function computeLongestWeekdayStreak(completedDateKeys: Set<string>): number {
  if (completedDateKeys.size === 0) return 0;

  const sorted = [...completedDateKeys].sort();
  let longest = 0;
  let current = 0;
  let prev: Date | null = null;

  for (const key of sorted) {
    const [y, m, d] = key.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    if (isWeekend(date)) continue;

    if (prev === null) {
      current = 1;
    } else {
      let expected = addDays(prev, 1);
      while (isWeekend(expected) && expected <= date) {
        expected = addDays(expected, 1);
      }
      if (toDateKey(expected) === key) {
        current++;
      } else {
        current = 1;
      }
    }

    longest = Math.max(longest, current);
    prev = date;
  }

  return longest;
}
