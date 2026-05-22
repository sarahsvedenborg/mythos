import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { ProgressDashboard } from "@/components/progress-dashboard";
import { getReleasedLessons } from "@/lib/lessons";
import { queryParams } from "@/lib/sanity-fetch";
import { client } from "@/sanity/lib/client";
import { ALL_LESSONS_QUERY } from "@/sanity/lib/queries";
import type { Locale } from "@/i18n/routing";
import type { LessonCard } from "@/types/lesson";

export const revalidate = 60;

export default async function ProgressPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("progress");
  const lessons = await client.fetch<LessonCard[]>(ALL_LESSONS_QUERY, queryParams(locale));
  const released = getReleasedLessons(lessons);
  const pct = Math.round((released.length / 260) * 100);

  return (
    <div>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <ProgressDashboard releasedCount={released.length} curriculumPct={pct} />
    </div>
  );
}
