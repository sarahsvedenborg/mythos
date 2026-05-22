import { getLocale, getTranslations } from "next-intl/server";
import { ArchiveBrowser } from "@/components/archive-browser";
import { PageHeader } from "@/components/page-header";
import { getReleasedLessons } from "@/lib/lessons";
import { queryParams } from "@/lib/sanity-fetch";
import { client } from "@/sanity/lib/client";
import { ALL_LESSONS_QUERY } from "@/sanity/lib/queries";
import type { Locale } from "@/i18n/routing";
import type { LessonCard as LessonCardType } from "@/types/lesson";

export const revalidate = 60;

export default async function ArchivePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("archive");
  const lessons = await client.fetch<LessonCardType[]>(
    ALL_LESSONS_QUERY,
    queryParams(locale)
  );
  const released = getReleasedLessons(lessons);
  const lockedCount = lessons.length - released.length;

  return (
    <div>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle", { released: released.length, locked: lockedCount })}
      />
      <ArchiveBrowser
        lessons={lessons}
        releasedCount={released.length}
        lockedCount={lockedCount}
      />
    </div>
  );
}
