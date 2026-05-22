import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LessonPortableText } from "@/components/portable-text";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { queryParams } from "@/lib/sanity-fetch";
import { client } from "@/sanity/lib/client";
import { LOCATION_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { PortableTextBlock } from "@portabletext/types";
import type { Locale } from "@/i18n/routing";

export const revalidate = 60;

type LocationDetail = {
  _id: string;
  name: string;
  slug: string;
  description?: PortableTextBlock[];
  myths?: string[];
  image?: { asset?: { _ref: string } };
  relatedLessons?: {
    _id: string;
    title: string;
    slug: string;
    lessonNumber: number;
    shortHook: string;
  }[];
};

type Props = { params: Promise<{ slug: string; locale: string }> };

export default async function PlacePage({ params }: Props) {
  const { slug, locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations("explore");

  const location = await client.fetch<LocationDetail | null>(
    LOCATION_BY_SLUG_QUERY,
    queryParams(locale, { slug })
  );

  if (!location) notFound();

  const imageUrl = location.image?.asset
    ? urlFor(location.image).width(1200).height(630).fit("crop").url()
    : null;

  return (
    <div>
      <Link
        href="/explore/places"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-4 -ml-2 text-muted-foreground"
        )}
      >
        <ArrowLeft className="mr-1 size-4" aria-hidden />
        {t("placesTitle")}
      </Link>

      <header className="mb-6 space-y-4">
        <h1 className="font-heading text-3xl text-marble">{location.name}</h1>
        {location.myths && location.myths.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {location.myths.map((myth) => (
              <li
                key={myth}
                className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
              >
                {myth}
              </li>
            ))}
          </ul>
        )}
      </header>

      {imageUrl && (
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border/60">
          <Image src={imageUrl} alt={location.name} fill className="object-cover" sizes="100vw" />
        </div>
      )}

      {location.description && location.description.length > 0 && (
        <section className="prose-myth mb-8">
          <LessonPortableText value={location.description} />
        </section>
      )}

      {location.relatedLessons && location.relatedLessons.length > 0 && (
        <section>
          <h2 className="font-heading mb-4 text-sm uppercase tracking-widest text-muted-foreground">
            {t("relatedLessons")}
          </h2>
          <ul className="space-y-2">
            {location.relatedLessons.map((lesson) => (
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
