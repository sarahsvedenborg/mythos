import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LessonPortableText } from "@/components/portable-text";
import { formatLessonType, formatWeekday } from "@/lib/lessons";
import { urlFor } from "@/sanity/lib/image";
import type { LessonDetail } from "@/types/lesson";

export function LessonView({ lesson }: { lesson: LessonDetail }) {
  const imageUrl = lesson.image?.asset
    ? urlFor(lesson.image).width(1200).height(630).fit("crop").url()
    : null;

  return (
    <article className="mx-auto max-w-2xl">
      <header className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-gold/15 text-gold border-gold/30">Lesson {lesson.lessonNumber}</Badge>
          <Badge variant="outline">{formatLessonType(lesson.lessonType)}</Badge>
          <Badge variant="outline">Week {lesson.week}</Badge>
        </div>
        <h1 className="font-heading text-3xl leading-tight text-marble sm:text-4xl">
          {lesson.title}
        </h1>
        {lesson.pronunciation && (
          <p className="text-sm italic text-muted-foreground">
            Pronunciation: {lesson.pronunciation}
          </p>
        )}
        <p className="text-lg text-gold/90">{lesson.shortHook}</p>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {formatWeekday(lesson.day)} · ~{lesson.estimatedReadMinutes ?? 3} min read
        </p>
      </header>

      {imageUrl && (
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border/60">
          <Image
            src={imageUrl}
            alt={lesson.image?.alt ?? lesson.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>
      )}

      <section className="prose-myth space-y-2">
        <h2 className="font-heading text-sm uppercase tracking-widest text-gold">The lesson</h2>
        <LessonPortableText value={lesson.content} />
      </section>

      {lesson.whyItMatters && (
        <section className="mt-8 rounded-2xl border border-border/60 bg-secondary/30 p-6">
          <h2 className="font-heading mb-3 text-sm uppercase tracking-widest text-gold">
            Why it matters
          </h2>
          <p className="leading-relaxed text-foreground/90">{lesson.whyItMatters}</p>
        </section>
      )}

      <section className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-6">
        <h2 className="font-heading mb-2 text-sm uppercase tracking-widest text-gold">
          Key takeaway
        </h2>
        <p className="font-heading text-lg leading-snug text-marble">{lesson.takeaway}</p>
      </section>

      {lesson.relatedLessons && lesson.relatedLessons.length > 0 && (
        <>
          <Separator className="my-8" />
          <section>
            <h2 className="font-heading mb-4 text-sm uppercase tracking-widest text-muted-foreground">
              Related lessons
            </h2>
            <ul className="space-y-3">
              {lesson.relatedLessons.map((related) => (
                <li key={related._id}>
                  <Link
                    href={`/archive/${related.slug}`}
                    className="block rounded-lg border border-border/50 p-4 transition-colors hover:border-gold/40"
                  >
                    <span className="text-xs text-gold">#{related.lessonNumber}</span>
                    <p className="font-medium">{related.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {related.shortHook}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </article>
  );
}
