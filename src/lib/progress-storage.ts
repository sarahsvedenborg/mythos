/** Local-only progress persisted in the browser (Phase 3). */

export const PROGRESS_STORAGE_KEY = "mythos-progress-v1";

export type ProgressData = {
  version: 1;
  /** lessonNumber → ISO date (YYYY-MM-DD) when marked complete */
  completed: Record<number, string>;
  favorites: number[];
};

export const emptyProgress = (): ProgressData => ({
  version: 1,
  completed: {},
  favorites: [],
});

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseProgress(raw: string): ProgressData | null {
  try {
    const data = JSON.parse(raw) as Partial<ProgressData>;
    if (data.version !== 1 || typeof data.completed !== "object") return null;
    const completed: Record<number, string> = {};
    for (const [key, value] of Object.entries(data.completed ?? {})) {
      const num = Number(key);
      if (Number.isFinite(num) && typeof value === "string") {
        completed[num] = value;
      }
    }
    const favorites = Array.isArray(data.favorites)
      ? data.favorites.filter((n) => typeof n === "number" && Number.isFinite(n))
      : [];
    return { version: 1, completed, favorites };
  } catch {
    return null;
  }
}

export function loadProgress(): ProgressData {
  if (typeof window === "undefined") return emptyProgress();
  const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
  if (!raw) return emptyProgress();
  return parseProgress(raw) ?? emptyProgress();
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data));
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
}

export function getCompletedLessonNumbers(data: ProgressData): number[] {
  return Object.keys(data.completed)
    .map(Number)
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);
}

export function getCompletedDateKeys(data: ProgressData): Set<string> {
  return new Set(Object.values(data.completed));
}

export function isLessonCompleted(data: ProgressData, lessonNumber: number): boolean {
  return lessonNumber in data.completed;
}

export function isLessonFavorite(data: ProgressData, lessonNumber: number): boolean {
  return data.favorites.includes(lessonNumber);
}

export function markLessonComplete(
  data: ProgressData,
  lessonNumber: number,
  date = new Date()
): ProgressData {
  return {
    ...data,
    completed: {
      ...data.completed,
      [lessonNumber]: toDateKey(date),
    },
  };
}

export function unmarkLessonComplete(
  data: ProgressData,
  lessonNumber: number
): ProgressData {
  const { [lessonNumber]: _, ...completed } = data.completed;
  return { ...data, completed };
}

export function toggleFavorite(
  data: ProgressData,
  lessonNumber: number
): ProgressData {
  const favorites = data.favorites.includes(lessonNumber)
    ? data.favorites.filter((n) => n !== lessonNumber)
    : [...data.favorites, lessonNumber].sort((a, b) => a - b);
  return { ...data, favorites };
}
