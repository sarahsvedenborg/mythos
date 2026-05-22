import Link from "next/link";
import { Flame } from "lucide-react";
import { LessonCard } from "@/components/lesson-card";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTodaysLesson, isWeekend } from "@/lib/lessons";
import { client } from "@/sanity/lib/client";
import { ALL_LESSONS_QUERY } from "@/sanity/lib/queries";
import type { LessonCard as LessonCardType } from "@/types/lesson";

export const revalidate = 60;

export default async function TodayPage() {
  const lessons = await client.fetch<LessonCardType[]>(ALL_LESSONS_QUERY);
  const today = getTodaysLesson(lessons);
  const weekend = isWeekend();

  return (
    <div>
      <PageHeader
        title="Today's lesson"
        subtitle={
          weekend
            ? "Weekends are for review — browse the archive or revisit favorites."
            : "One myth at a time. Under three minutes."
        }
      />

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/5 px-4 py-3">
        <Flame className="size-5 text-gold" aria-hidden />
        <div>
          <p className="text-sm font-medium">Streak tracking</p>
          <p className="text-xs text-muted-foreground">Coming in Phase 3</p>
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
            Read lesson
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center">
          <p className="font-heading text-lg text-marble">No lesson published yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add lessons in Sanity Studio, or run the seed script for Week 1 samples.
          </p>
          <Link
            href="/studio"
            className={cn(buttonVariants({ variant: "outline" }), "mt-4 border-gold/40")}
          >
            Open Studio
          </Link>
        </div>
      )}
    </div>
  );
}
