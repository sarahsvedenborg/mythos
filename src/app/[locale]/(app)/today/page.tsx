import { getLocale, getTranslations } from "next-intl/server";
import { Flame } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LessonCard } from "@/components/lesson-card";
import { PageHeader } from "@/components/page-header";
import { TodayUnlockInfo } from "@/components/today-unlock-info";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTodaysLesson, isWeekend } from "@/lib/lessons";
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
  const today = getTodaysLesson(lessons);
  const weekend = isWeekend();

  return (
    <div>
      <PageHeader
        title={t("title")}
        subtitle={weekend ? t("subtitleWeekend") : t("subtitleWeekday")}
      />

      <TodayUnlockInfo lessons={lessons} hasTodayLesson={!!today} />

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/5 px-4 py-3">
        <Flame className="size-5 text-gold" aria-hidden />
        <div>
          <p className="text-sm font-medium">{t("streakTitle")}</p>
          <p className="text-xs text-muted-foreground">{t("streakComing")}</p>
        </div>
      </div>

      {today ? (
        <div className="space-y-4">
          <LessonCard lesson={today} />
          <Link
            href={`/archive/${today.slug}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full bg-gold text-background hover:bg-gold/90"
            )}
          >
            {t("readLesson")}
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center">
          <p className="font-heading text-lg text-marble">{t("emptyTitle")}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t("emptyBody")}</p>
          <a
            href="/studio"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-4 inline-flex border-gold/40"
            )}
          >
            {t("openStudio")}
          </a>
        </div>
      )}
    </div>
  );
}
