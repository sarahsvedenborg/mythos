import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { ExploreList } from "@/components/explore-list";
import { queryParams } from "@/lib/sanity-fetch";
import { client } from "@/sanity/lib/client";
import { LOCATIONS_QUERY } from "@/sanity/lib/queries";
import type { Locale } from "@/i18n/routing";
import type { LocationSummary } from "@/types/lesson";

export const revalidate = 60;

export default async function PlacesPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("explore");
  const locations = await client.fetch<LocationSummary[]>(
    LOCATIONS_QUERY,
    queryParams(locale)
  );

  const items = locations.map((loc) => ({
    id: loc._id,
    name: loc.name,
    slug: loc.slug,
    meta: loc.myths?.[0],
    href: `/explore/places/${loc.slug}`,
  }));

  return (
    <div>
      <PageHeader
        title={t("placesTitle")}
        subtitle={t("placesCount", { count: locations.length })}
      />
      <ExploreList
        items={items}
        searchPlaceholder={t("searchPlaces")}
        emptyMessage={t("noPlaces")}
      />
    </div>
  );
}
