import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/page-header";
import { queryParams } from "@/lib/sanity-fetch";
import { client } from "@/sanity/lib/client";
import { CHARACTERS_QUERY } from "@/sanity/lib/queries";
import type { Locale } from "@/i18n/routing";
import type { CharacterSummary } from "@/types/lesson";

const TYPE_MAP: Record<string, { filter: string; titleKey: "gods" | "heroes" | "monsters" }> =
  {
    gods: { filter: "god", titleKey: "gods" },
    heroes: { filter: "hero", titleKey: "heroes" },
    monsters: { filter: "monster", titleKey: "monsters" },
  };

export const revalidate = 60;

type Props = { params: Promise<{ type: string; locale: string }> };

export default async function ExploreTypePage({ params }: Props) {
  const { type, locale: localeParam } = await params;
  const config = TYPE_MAP[type];
  if (!config) notFound();

  const locale = localeParam as Locale;
  const t = await getTranslations("explore");
  const all = await client.fetch<CharacterSummary[]>(CHARACTERS_QUERY, queryParams(locale));
  const characters = all.filter((c) => c.type === config.filter);

  return (
    <div>
      <PageHeader
        title={t(config.titleKey)}
        subtitle={t("entriesCount", { count: characters.length })}
      />
      <ul className="space-y-2">
        {characters.map((c) => (
          <li key={c._id}>
            <Link
              href={`/explore/characters/${c.slug}`}
              className="block rounded-lg border border-border/50 px-4 py-3 hover:border-gold/40"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
