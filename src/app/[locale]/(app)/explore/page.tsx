import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { queryParams } from "@/lib/sanity-fetch";
import { client } from "@/sanity/lib/client";
import { CHARACTERS_QUERY } from "@/sanity/lib/queries";
import type { Locale } from "@/i18n/routing";
import type { CharacterSummary } from "@/types/lesson";

export const revalidate = 60;

export default async function ExplorePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("explore");
  const characters = await client.fetch<CharacterSummary[]>(
    CHARACTERS_QUERY,
    queryParams(locale)
  );

  const categories = [
    { href: "/explore/characters" as const, label: t("allCharacters") },
    { href: "/explore/gods" as const, label: t("gods") },
    { href: "/explore/heroes" as const, label: t("heroes") },
    { href: "/explore/monsters" as const, label: t("monsters") },
  ];

  return (
    <div>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {categories.map(({ href, label }) => (
          <Link key={href} href={href}>
            <Card className="transition-colors hover:border-gold/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{label}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {t("browsePantheon")}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {characters.length > 0 ? (
        <section>
          <h2 className="font-heading mb-4 text-lg text-gold">{t("featured")}</h2>
          <ul className="space-y-2">
            {characters.slice(0, 6).map((c) => (
              <li key={c._id}>
                <Link
                  href={`/explore/characters/${c.slug}`}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3 hover:border-gold/40"
                >
                  <span>{c.name}</span>
                  <span className="text-xs capitalize text-muted-foreground">{c.type}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-sm text-muted-foreground">{t("empty")}</p>
      )}
    </div>
  );
}
