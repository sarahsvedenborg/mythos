"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarClock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatUnlockDate, getNextLockedLesson, isWeekend } from "@/lib/lessons";
import type { LessonCard } from "@/types/lesson";

type Props = {
  lessons: LessonCard[];
  hasTodayLesson: boolean;
};

export function TodayUnlockInfo({ lessons, hasTodayLesson }: Props) {
  const t = useTranslations("today");
  const locale = useLocale();
  const [timeZone, setTimeZone] = useState<string | undefined>();

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const nextLocked = useMemo(() => getNextLockedLesson(lessons), [lessons]);
  const weekend = isWeekend();

  if (weekend) {
    return (
      <div className="mb-6 rounded-2xl border border-border/60 bg-secondary/20 px-4 py-4">
        <p className="text-sm text-foreground/90">{t("weekendReview")}</p>
        <Link
          href="/archive"
          className="mt-2 inline-block text-sm font-medium text-gold hover:underline"
        >
          {t("browseArchive")}
        </Link>
      </div>
    );
  }

  if (!nextLocked) return null;

  const dateLabel = formatUnlockDate(nextLocked.unlockDate, locale, timeZone);

  return (
    <div className="mb-6 flex gap-3 rounded-2xl border border-border/60 bg-secondary/20 px-4 py-3">
      <CalendarClock className="size-5 shrink-0 text-gold" aria-hidden />
      <div className="min-w-0">
        {hasTodayLesson ? (
          <p className="text-sm text-foreground/90">{t("todayReady")}</p>
        ) : null}
        <p className="text-sm text-muted-foreground">
          {t("nextUnlock", { title: nextLocked.title, date: dateLabel })}
        </p>
        {timeZone ? (
          <p className="mt-1 text-xs text-muted-foreground/80">
            {t("timezoneNote", { zone: timeZone })}
          </p>
        ) : null}
      </div>
    </div>
  );
}
