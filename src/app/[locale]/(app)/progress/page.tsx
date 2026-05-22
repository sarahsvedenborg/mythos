import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const total = 260;
  const pct = Math.round((released.length / total) * 100);

  return (
    <div>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-muted-foreground">
              {t("lessonsUnlocked")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-4xl text-gold">
              {released.length}
              <span className="text-lg text-muted-foreground"> / {total}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("ofCurriculum", { pct })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-muted-foreground">
              {t("currentStreak")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-4xl text-marble">—</p>
            <p className="text-sm text-muted-foreground">{t("phase3")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
