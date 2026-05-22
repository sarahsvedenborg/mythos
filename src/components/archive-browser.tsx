"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { LessonCard } from "@/components/lesson-card";
import { FilterChips } from "@/components/filter-chips";
import { SearchInput } from "@/components/search-input";
import {
  defaultArchiveFilters,
  filterLessons,
  getAvailableLessonTypes,
  getAvailableWeeks,
  groupLessonsByCategory,
  groupLessonsByWeek,
  LESSON_CATEGORIES,
  type ArchiveFilter,
  type ArchiveFiltersState,
  type ArchiveView,
  type LessonCategory,
} from "@/lib/archive";
import { isLessonUnlocked } from "@/lib/lessons";
import type { LessonCard as LessonCardType } from "@/types/lesson";

type Props = {
  lessons: LessonCardType[];
  releasedCount: number;
  lockedCount: number;
};

export function ArchiveBrowser({ lessons, releasedCount, lockedCount }: Props) {
  const t = useTranslations("archive");
  const tTypes = useTranslations("lessonTypes");
  const tCategories = useTranslations("categories");

  const [filters, setFilters] = useState<ArchiveFiltersState>(defaultArchiveFilters);

  const filtered = useMemo(
    () => filterLessons(lessons, filters),
    [lessons, filters]
  );

  const byWeek = useMemo(() => groupLessonsByWeek(filtered), [filtered]);
  const byCategory = useMemo(() => groupLessonsByCategory(filtered), [filtered]);

  const weeks = useMemo(() => getAvailableWeeks(lessons), [lessons]);
  const lessonTypes = useMemo(() => getAvailableLessonTypes(lessons), [lessons]);

  const viewOptions: { value: ArchiveView; label: string }[] = [
    { value: "week", label: t("viewWeek") },
    { value: "category", label: t("viewCategory") },
  ];

  const availabilityOptions: { value: ArchiveFilter; label: string }[] = [
    { value: "all", label: t("filterAll") },
    { value: "unlocked", label: t("filterUnlocked") },
    { value: "locked", label: t("filterLocked") },
  ];

  const weekOptions: { value: string; label: string }[] = [
    { value: "all", label: t("allWeeks") },
    ...weeks.map((w) => ({ value: String(w), label: t("week", { week: w }) })),
  ];

  const categoryOptions: { value: string; label: string }[] = [
    { value: "all", label: t("allCategories") },
    ...LESSON_CATEGORIES.filter((c) => lessons.some((l) => l.category === c)).map((c) => ({
      value: c,
      label: tCategories(c),
    })),
  ];

  const typeOptions: { value: string; label: string }[] = [
    { value: "all", label: t("allTypes") },
    ...lessonTypes.map((type) => ({
      value: type,
      label: tTypes(type as "character"),
    })),
  ];

  const showLockedSection =
    filters.availability !== "unlocked" &&
    filters.query === "" &&
    filters.week === null &&
    filters.category === null &&
    filters.lessonType === null;

  const lockedPreview = lessons.filter((l) => !isLessonUnlocked(l));

  return (
    <div className="space-y-6">
      <SearchInput
        value={filters.query}
        onChange={(query) => setFilters((f) => ({ ...f, query }))}
        placeholder={t("searchPlaceholder")}
        aria-label={t("searchPlaceholder")}
      />

      <FilterChips
        label={t("viewBy")}
        options={viewOptions}
        value={filters.view}
        onChange={(view) => setFilters((f) => ({ ...f, view }))}
      />

      <FilterChips
        label={t("availability")}
        options={availabilityOptions}
        value={filters.availability}
        onChange={(availability) => setFilters((f) => ({ ...f, availability }))}
      />

      <FilterChips<string>
        label={t("weekFilter")}
        options={weekOptions}
        value={filters.week === null ? "all" : String(filters.week)}
        onChange={(v) =>
          setFilters((f) => ({
            ...f,
            week: v === "all" ? null : Number(v),
          }))
        }
      />

      <FilterChips<string>
        label={t("categoryFilter")}
        options={categoryOptions}
        value={filters.category ?? "all"}
        onChange={(v) =>
          setFilters((f) => ({
            ...f,
            category: v === "all" ? null : (v as LessonCategory),
          }))
        }
      />

      <FilterChips<string>
        label={t("typeFilter")}
        options={typeOptions}
        value={filters.lessonType ?? "all"}
        onChange={(v) =>
          setFilters((f) => ({
            ...f,
            lessonType: v === "all" ? null : v,
          }))
        }
      />

      <p className="text-sm text-muted-foreground">
        {t("results", { count: filtered.length, released: releasedCount, locked: lockedCount })}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
          {t("noResults")}
        </p>
      ) : filters.view === "week" ? (
        <div className="space-y-10">
          {Object.keys(byWeek)
            .map(Number)
            .sort((a, b) => b - a)
            .map((week) => (
              <section key={week}>
                <h2 className="font-heading mb-4 text-lg text-gold">{t("week", { week })}</h2>
                <div className="space-y-3">
                  {byWeek[week]
                    .sort((a, b) => a.lessonNumber - b.lessonNumber)
                    .map((lesson) => (
                      <LessonCard
                        key={lesson._id}
                        lesson={lesson}
                        locked={!isLessonUnlocked(lesson)}
                      />
                    ))}
                </div>
              </section>
            ))}
        </div>
      ) : (
        <div className="space-y-10">
          {Object.keys(byCategory)
            .sort()
            .map((category) => (
              <section key={category}>
                <h2 className="font-heading mb-4 text-lg text-gold">
                  {tCategories(category as LessonCategory)}
                </h2>
                <div className="space-y-3">
                  {byCategory[category]
                    .sort((a, b) => a.lessonNumber - b.lessonNumber)
                    .map((lesson) => (
                      <LessonCard
                        key={lesson._id}
                        lesson={lesson}
                        locked={!isLessonUnlocked(lesson)}
                      />
                    ))}
                </div>
              </section>
            ))}
        </div>
      )}

      {showLockedSection && lockedPreview.length > 0 && (
        <section className="mt-4 border-t border-border/60 pt-10">
          <h2 className="font-heading mb-4 text-lg text-muted-foreground">{t("locked")}</h2>
          <div className="space-y-3">
            {lockedPreview.slice(0, 6).map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} locked />
            ))}
            {lockedPreview.length > 6 && (
              <p className="text-center text-sm text-muted-foreground">
                {t("lockedMore", { count: lockedPreview.length - 6 })}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
