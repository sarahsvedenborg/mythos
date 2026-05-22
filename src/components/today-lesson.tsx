"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LessonCard } from "@/components/lesson-card";
import { useProgressContext } from "@/components/progress-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getEarliestIncompleteLesson, getReleasedLessons } from "@/lib/lessons";
import type { LessonCard as LessonCardType } from "@/types/lesson";

type Props = {
  lessons: LessonCardType[];
};

export function TodayLesson({ lessons }: Props) {
  const t = useTranslations("today");
  const { ready, completedSet } = useProgressContext();

  const released = useMemo(() => getReleasedLessons(lessons), [lessons]);

  const featured = useMemo(() => {
    if (!ready) return null;
    return getEarliestIncompleteLesson(lessons, completedSet);
  }, [lessons, completedSet, ready]);

  if (!ready) {
    return (
      <div className="space-y-4">
        <div className="h-40 animate-pulse rounded-2xl bg-muted/30" />
        <div className="h-11 animate-pulse rounded-xl bg-muted/30" />
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
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
    );
  }

  if (featured) {
    return (
      <div className="space-y-4">
        <LessonCard lesson={featured} />
        <Link
          href={`/archive/${featured.slug}`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full bg-gold text-background hover:bg-gold/90"
          )}
        >
          {t("readLesson")}
        </Link>
      </div>
    );
  }

  if (released.length > 0) {
    return (
      <div className="rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center">
        <p className="font-heading text-lg text-marble">{t("caughtUpTitle")}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t("caughtUpBody")}</p>
        <Link
          href="/archive"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-4 inline-flex border-gold/40"
          )}
        >
          {t("browseArchive")}
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed border-border p-8 text-center">
      <p className="font-heading text-lg text-marble">{t("emptyTitle")}</p>
      <p className="mt-2 text-sm text-muted-foreground">{t("emptyBody")}</p>
    </div>
  );
}

/** Whether Today has an incomplete unlocked lesson to show. */
export function useTodayHasLesson(lessons: LessonCardType[]): boolean | null {
  const { ready, completedSet } = useProgressContext();
  return useMemo(() => {
    if (!ready) return null;
    return getEarliestIncompleteLesson(lessons, completedSet) !== null;
  }, [lessons, completedSet, ready]);
}
