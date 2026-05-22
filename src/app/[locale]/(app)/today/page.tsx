import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { StreakDisplay } from "@/components/streak-display";
import { TodayLesson } from "@/components/today-lesson";
import { TodayUnlockInfo } from "@/components/today-unlock-info";
import { isWeekend } from "@/lib/lessons";
import { queryParams } from "@/lib/sanity-fetch";
import { client } from "@/sanity/lib/client";
import { ALL_LESSONS_QUERY } from "@/sanity/lib/queries";
import type { Locale } from "@/i18n/routing";
import type { LessonCard as LessonCardType } from "@/types/lesson";

export const revalidate = 60;

export default async function TodayPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("today");
  const lessons = await client.fetch<LessonCardType[]>(
    ALL_LESSONS_QUERY,
    queryParams(locale)
  );
  const weekend = isWeekend();

  return (
    <div>
      <PageHeader
        title={t("title")}
        subtitle={weekend ? t("subtitleWeekend") : t("subtitleWeekday")}
      />

      <TodayUnlockInfo lessons={lessons} />

      <StreakDisplay />

      <TodayLesson lessons={lessons} />
    </div>
  );
}
