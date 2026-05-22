"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  computeLongestWeekdayStreak,
  computeWeekdayStreak,
} from "@/lib/streaks";
import {
  clearProgress,
  getCompletedDateKeys,
  getCompletedLessonNumbers,
  isLessonCompleted,
  isLessonFavorite,
  loadProgress,
  markLessonComplete,
  saveProgress,
  toggleFavorite,
  unmarkLessonComplete,
  type ProgressData,
} from "@/lib/progress-storage";

export function useProgress() {
  const [data, setData] = useState<ProgressData | null>(null);

  useEffect(() => {
    setData(loadProgress());

    const onStorage = (e: StorageEvent) => {
      if (e.key === "mythos-progress-v1") {
        setData(loadProgress());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: ProgressData) => {
    saveProgress(next);
    setData(next);
  }, []);

  const completedNumbers = useMemo(
    () => (data ? getCompletedLessonNumbers(data) : []),
    [data]
  );

  const completedSet = useMemo(
    () => new Set(completedNumbers),
    [completedNumbers]
  );

  const favoritesSet = useMemo(
    () => new Set(data?.favorites ?? []),
    [data]
  );

  const completedDateKeys = useMemo(
    () => (data ? getCompletedDateKeys(data) : new Set<string>()),
    [data]
  );

  const streak = useMemo(
    () => computeWeekdayStreak(completedDateKeys),
    [completedDateKeys]
  );

  const longestStreak = useMemo(
    () => computeLongestWeekdayStreak(completedDateKeys),
    [completedDateKeys]
  );

  const markComplete = useCallback(
    (lessonNumber: number) => {
      if (!data) return;
      persist(markLessonComplete(data, lessonNumber));
    },
    [data, persist]
  );

  const unmarkComplete = useCallback(
    (lessonNumber: number) => {
      if (!data) return;
      persist(unmarkLessonComplete(data, lessonNumber));
    },
    [data, persist]
  );

  const toggleComplete = useCallback(
    (lessonNumber: number) => {
      if (!data) return;
      if (isLessonCompleted(data, lessonNumber)) {
        persist(unmarkLessonComplete(data, lessonNumber));
      } else {
        persist(markLessonComplete(data, lessonNumber));
      }
    },
    [data, persist]
  );

  const toggleFavoriteLesson = useCallback(
    (lessonNumber: number) => {
      if (!data) return;
      persist(toggleFavorite(data, lessonNumber));
    },
    [data, persist]
  );

  const resetProgress = useCallback(() => {
    clearProgress();
    setData(loadProgress());
  }, []);

  const ready = data !== null;

  return {
    ready,
    completedNumbers,
    completedSet,
    favoritesSet,
    favorites: data?.favorites ?? [],
    streak,
    longestStreak,
    completedCount: completedNumbers.length,
    favoritesCount: data?.favorites.length ?? 0,
    isCompleted: (lessonNumber: number) =>
      data ? isLessonCompleted(data, lessonNumber) : false,
    isFavorite: (lessonNumber: number) =>
      data ? isLessonFavorite(data, lessonNumber) : false,
    markComplete,
    unmarkComplete,
    toggleComplete,
    toggleFavorite: toggleFavoriteLesson,
    resetProgress,
  };
}

export type ProgressContextValue = ReturnType<typeof useProgress>;
