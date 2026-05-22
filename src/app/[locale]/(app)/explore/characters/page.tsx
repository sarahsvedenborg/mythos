import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/page-header";
import { queryParams } from "@/lib/sanity-fetch";
import { client } from "@/sanity/lib/client";
import { CHARACTERS_QUERY } from "@/sanity/lib/queries";
import type { Locale } from "@/i18n/routing";
import type { CharacterSummary } from "@/types/lesson";

export const revalidate = 60;

export default async function CharactersPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("explore");
  const characters = await client.fetch<CharacterSummary[]>(
    CHARACTERS_QUERY,
    queryParams(locale)
  );

  return (
    <div>
      <PageHeader
        title={t("charactersTitle")}
        subtitle={t("charactersCount", { count: characters.length })}
      />
      <ul className="space-y-2">
        {characters.map((c) => (
          <li key={c._id}>
            <Link
              href={`/explore/characters/${c.slug}`}
              className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3 hover:border-gold/40"
            >
              <span className="font-medium">{c.name}</span>
              <span className="text-xs capitalize text-muted-foreground">{c.type}</span>
            </Link>
          </li>
        ))}
      </ul>
      {characters.length === 0 && (
        <p className="text-muted-foreground">{t("noCharacters")}</p>
      )}
    </div>
  );
}
