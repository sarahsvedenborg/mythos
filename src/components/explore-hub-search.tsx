"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { SearchInput } from "@/components/search-input";
import { searchLessons } from "@/lib/archive";
import type { CharacterSummary, LessonCard } from "@/types/lesson";

type Props = {
  lessons: LessonCard[];
  characters: CharacterSummary[];
  searchPlaceholder: string;
  lessonsLabel: string;
  charactersLabel: string;
  noResults: string;
};

export function ExploreHubSearch({
  lessons,
  characters,
  searchPlaceholder,
  lessonsLabel,
  charactersLabel,
  noResults,
}: Props) {
  const [query, setQuery] = useState("");

  const lessonResults = useMemo(
    () => (query.trim() ? searchLessons(lessons, query).slice(0, 6) : []),
    [lessons, query]
  );

  const characterResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return characters
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q) ||
          (c.symbols?.some((s) => s.toLowerCase().includes(q)) ?? false)
      )
      .slice(0, 6);
  }, [characters, query]);

  const hasQuery = query.trim().length > 0;
  const hasResults = lessonResults.length > 0 || characterResults.length > 0;

  return (
    <div className="mb-8">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
      />

      {hasQuery && (
        <div className="mt-4 space-y-6 rounded-xl border border-border/60 bg-secondary/20 p-4">
          {!hasResults ? (
            <p className="text-sm text-muted-foreground">{noResults}</p>
          ) : (
            <>
              {lessonResults.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {lessonsLabel}
                  </h3>
                  <ul className="space-y-2">
                    {lessonResults.map((lesson) => (
                      <li key={lesson._id}>
                        <Link
                          href={`/archive/${lesson.slug}`}
                          className="block rounded-lg border border-border/50 px-3 py-2 hover:border-gold/40"
                        >
                          <span className="text-xs text-gold">#{lesson.lessonNumber}</span>
                          <p className="text-sm font-medium">{lesson.title}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {characterResults.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {charactersLabel}
                  </h3>
                  <ul className="space-y-2">
                    {characterResults.map((c) => (
                      <li key={c._id}>
                        <Link
                          href={`/explore/characters/${c.slug}`}
                          className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2 hover:border-gold/40"
                        >
                          <span className="text-sm font-medium">{c.name}</span>
                          <span className="text-xs capitalize text-muted-foreground">{c.type}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
