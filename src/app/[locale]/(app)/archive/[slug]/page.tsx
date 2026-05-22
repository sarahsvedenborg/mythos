import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LessonProgressActions } from "@/components/lesson-progress-actions";
import { LessonView } from "@/components/lesson-view";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isLessonUnlocked } from "@/lib/lessons";
import { queryParams } from "@/lib/sanity-fetch";
import { client } from "@/sanity/lib/client";
import { LESSON_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { Locale } from "@/i18n/routing";
import type { LessonDetail } from "@/types/lesson";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string; locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const lesson = await client.fetch<LessonDetail | null>(
    LESSON_BY_SLUG_QUERY,
    queryParams(locale as Locale, { slug })
  );
  if (!lesson) return { title: "Lesson not found" };
  return {
    title: lesson.title,
    description: lesson.shortHook,
    openGraph: {
      title: lesson.title,
      description: lesson.shortHook,
    },
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug, locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations("lesson");
  const dateLocale = locale === "no" ? "nb-NO" : "en-US";

  const lesson = await client.fetch<LessonDetail | null>(
    LESSON_BY_SLUG_QUERY,
    queryParams(locale, { slug })
  );

  if (!lesson) notFound();

  if (!isLessonUnlocked(lesson)) {
    return (
      <div className="py-16 text-center">
        <p className="font-heading text-xl text-marble">{t("lockedTitle")}</p>
        <p className="mt-2 text-muted-foreground">
          {t("lockedBody", {
            date: new Date(lesson.unlockDate).toLocaleDateString(dateLocale, {
              dateStyle: "long",
            }),
          })}
        </p>
        <Link
          href="/archive"
          className={cn(buttonVariants({ variant: "outline" }), "mt-6 inline-flex")}
        >
          {t("backToArchive")}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/archive"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-4 -ml-2 text-muted-foreground"
        )}
      >
        <ArrowLeft className="mr-1 size-4" aria-hidden />
        {t("archive")}
      </Link>
      <LessonView lesson={lesson} />
      <LessonProgressActions lessonNumber={lesson.lessonNumber} />
    </div>
  );
}
