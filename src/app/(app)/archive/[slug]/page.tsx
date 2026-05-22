import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LessonView } from "@/components/lesson-view";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isLessonUnlocked } from "@/lib/lessons";
import { client } from "@/sanity/lib/client";
import { LESSON_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { LessonDetail } from "@/types/lesson";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const lesson = await client.fetch<LessonDetail | null>(LESSON_BY_SLUG_QUERY, { slug });
  if (!lesson) return { title: "Lesson not found" };
  return {
    title: `${lesson.title} | Mythos`,
    description: lesson.shortHook,
    openGraph: {
      title: lesson.title,
      description: lesson.shortHook,
    },
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = await client.fetch<LessonDetail | null>(LESSON_BY_SLUG_QUERY, { slug });

  if (!lesson) notFound();

  if (!isLessonUnlocked(lesson)) {
    return (
      <div className="text-center py-16">
        <p className="font-heading text-xl text-marble">This lesson is still locked</p>
        <p className="mt-2 text-muted-foreground">
          It unlocks on {new Date(lesson.unlockDate).toLocaleDateString()}.
        </p>
        <Link
          href="/archive"
          className={cn(buttonVariants({ variant: "outline" }), "mt-6 inline-flex")}
        >
          Back to archive
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
        Archive
      </Link>
      <LessonView lesson={lesson} />
    </div>
  );
}
