import { getLocale, getTranslations } from "next-intl/server";
import { LessonCard } from "@/components/lesson-card";
import { PageHeader } from "@/components/page-header";
import { getReleasedLessons, isLessonUnlocked } from "@/lib/lessons";
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
  const locked = lessons.filter((l) => !isLessonUnlocked(l));

  const byWeek = released.reduce<Record<number, LessonCardType[]>>((acc, lesson) => {
    if (!acc[lesson.week]) acc[lesson.week] = [];
    acc[lesson.week].push(lesson);
    return acc;
  }, {});

  const weeks = Object.keys(byWeek)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle", { released: released.length, locked: locked.length })}
      />

      {weeks.length === 0 ? (
        <p className="text-muted-foreground">{t("empty")}</p>
      ) : (
        <div className="space-y-10">
          {weeks.map((week) => (
            <section key={week}>
              <h2 className="font-heading mb-4 text-lg text-gold">
                {t("week", { week })}
              </h2>
              <div className="space-y-3">
                {byWeek[week]
                  .sort((a, b) => a.lessonNumber - b.lessonNumber)
                  .map((lesson) => (
                    <LessonCard key={lesson._id} lesson={lesson} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {locked.length > 0 && (
        <section className="mt-12">
          <h2 className="font-heading mb-4 text-lg text-muted-foreground">{t("locked")}</h2>
          <div className="space-y-3">
            {locked.slice(0, 8).map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} locked />
            ))}
            {locked.length > 8 && (
              <p className="text-center text-sm text-muted-foreground">
                {t("lockedMore", { count: locked.length - 8 })}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
