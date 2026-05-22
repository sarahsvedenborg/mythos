"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { SearchInput } from "@/components/search-input";

export type ExploreListItem = {
  id: string;
  name: string;
  slug: string;
  meta?: string;
  href: string;
};

type Props = {
  items: ExploreListItem[];
  searchPlaceholder: string;
  emptyMessage: string;
};

export function ExploreList({ items, searchPlaceholder, emptyMessage }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.meta?.toLowerCase().includes(q) ?? false)
    );
  }, [items, query]);

  return (
    <div className="space-y-4">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
      />
      {filtered.length === 0 ? (
        <p className="text-muted-foreground">{emptyMessage}</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3 hover:border-gold/40"
              >
                <span className="font-medium">{item.name}</span>
                {item.meta ? (
                  <span className="text-xs capitalize text-muted-foreground">{item.meta}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
