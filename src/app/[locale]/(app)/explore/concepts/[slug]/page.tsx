import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { queryParams } from "@/lib/sanity-fetch";
import { client } from "@/sanity/lib/client";
import { CONCEPT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { Locale } from "@/i18n/routing";

export const revalidate = 60;

type ConceptDetail = {
  _id: string;
  term: string;
  slug: string;
  definition: string;
  relatedLessons?: {
    _id: string;
    title: string;
    slug: string;
    lessonNumber: number;
    shortHook: string;
  }[];
};

type Props = { params: Promise<{ slug: string; locale: string }> };

export default async function ConceptPage({ params }: Props) {
  const { slug, locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations("explore");

  const concept = await client.fetch<ConceptDetail | null>(
    CONCEPT_BY_SLUG_QUERY,
    queryParams(locale, { slug })
  );

  if (!concept) notFound();

  return (
    <div>
      <Link
        href="/explore/concepts"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-4 -ml-2 text-muted-foreground"
        )}
      >
        <ArrowLeft className="mr-1 size-4" aria-hidden />
        {t("conceptsTitle")}
      </Link>

      <header className="mb-6">
        <h1 className="font-heading text-3xl text-marble">{concept.term}</h1>
      </header>

      <p className="leading-relaxed text-foreground/90">{concept.definition}</p>

      {concept.relatedLessons && concept.relatedLessons.length > 0 && (
        <section className="mt-8">
          <h2 className="font-heading mb-4 text-sm uppercase tracking-widest text-muted-foreground">
            {t("relatedLessons")}
          </h2>
          <ul className="space-y-2">
            {concept.relatedLessons.map((lesson) => (
              <li key={lesson._id}>
                <Link
                  href={`/archive/${lesson.slug}`}
                  className="block rounded-lg border border-border/50 px-4 py-3 hover:border-gold/40"
                >
                  <span className="text-xs text-gold">#{lesson.lessonNumber}</span>
                  <p className="font-medium">{lesson.title}</p>
                  <p className="line-clamp-1 text-sm text-muted-foreground">{lesson.shortHook}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
