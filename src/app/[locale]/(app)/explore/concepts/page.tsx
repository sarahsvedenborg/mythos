import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { ExploreList } from "@/components/explore-list";
import { queryParams } from "@/lib/sanity-fetch";
import { client } from "@/sanity/lib/client";
import { CONCEPTS_QUERY } from "@/sanity/lib/queries";
import type { Locale } from "@/i18n/routing";
import type { ConceptSummary } from "@/types/lesson";

export const revalidate = 60;

export default async function ConceptsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("explore");
  const concepts = await client.fetch<ConceptSummary[]>(CONCEPTS_QUERY, queryParams(locale));

  const items = concepts.map((c) => ({
    id: c._id,
    name: c.term,
    slug: c.slug,
    meta: undefined,
    href: `/explore/concepts/${c.slug}`,
  }));

  return (
    <div>
      <PageHeader
        title={t("conceptsTitle")}
        subtitle={t("conceptsCount", { count: concepts.length })}
      />
      <ExploreList
        items={items}
        searchPlaceholder={t("searchConcepts")}
        emptyMessage={t("noConcepts")}
      />
    </div>
  );
}
