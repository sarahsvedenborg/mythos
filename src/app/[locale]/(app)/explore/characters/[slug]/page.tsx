import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LessonPortableText } from "@/components/portable-text";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { queryParams } from "@/lib/sanity-fetch";
import { client } from "@/sanity/lib/client";
import { CHARACTER_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Locale } from "@/i18n/routing";
import type { CharacterDetail } from "@/types/lesson";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string; locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const character = await client.fetch<CharacterDetail | null>(
    CHARACTER_BY_SLUG_QUERY,
    queryParams(locale as Locale, { slug })
  );
  if (!character) return { title: "Character not found" };
  return { title: character.name, description: `${character.name} — Greek mythology` };
}

export default async function CharacterPage({ params }: Props) {
  const { slug, locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations("explore");

  const character = await client.fetch<CharacterDetail | null>(
    CHARACTER_BY_SLUG_QUERY,
    queryParams(locale, { slug })
  );

  if (!character) notFound();

  const imageUrl = character.image?.asset
    ? urlFor(character.image).width(800).height(800).fit("crop").url()
    : null;

  return (
    <div>
      <Link
        href="/explore/characters"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-4 -ml-2 text-muted-foreground"
        )}
      >
        <ArrowLeft className="mr-1 size-4" aria-hidden />
        {t("charactersTitle")}
      </Link>

      <header className="mb-8 space-y-4">
        {imageUrl && (
          <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-2xl border border-border/60">
            <Image
              src={imageUrl}
              alt={character.name}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        )}
        <h1 className="font-heading text-center text-3xl text-marble">{character.name}</h1>
        <div className="flex justify-center">
          <Badge variant="outline" className="capitalize">
            {character.type}
          </Badge>
        </div>
        {character.symbols && character.symbols.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {character.symbols.map((symbol) => (
              <Badge key={symbol} className="bg-gold/10 text-gold">
                {symbol}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {character.description && character.description.length > 0 && (
        <section className="prose-myth mb-8">
          <LessonPortableText value={character.description} />
        </section>
      )}

      {(character.parents?.length || character.children?.length) ? (
        <section className="mb-8 grid gap-6 sm:grid-cols-2">
          {character.parents && character.parents.length > 0 && (
            <div>
              <h2 className="font-heading mb-3 text-sm uppercase tracking-widest text-gold">
                {t("parents")}
              </h2>
              <ul className="space-y-2">
                {character.parents.map((p) => (
                  <li key={p._id}>
                    <Link
                      href={`/explore/characters/${p.slug}`}
                      className="text-foreground/90 hover:text-gold"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {character.children && character.children.length > 0 && (
            <div>
              <h2 className="font-heading mb-3 text-sm uppercase tracking-widest text-gold">
                {t("children")}
              </h2>
              <ul className="space-y-2">
                {character.children.map((c) => (
                  <li key={c._id}>
                    <Link
                      href={`/explore/characters/${c.slug}`}
                      className="text-foreground/90 hover:text-gold"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ) : null}

      {character.relatedLessons && character.relatedLessons.length > 0 && (
        <section>
          <h2 className="font-heading mb-4 text-sm uppercase tracking-widest text-muted-foreground">
            {t("relatedLessons")}
          </h2>
          <ul className="space-y-2">
            {character.relatedLessons.map((lesson) => (
              <li key={lesson._id}>
                <Link
                  href={`/archive/${lesson.slug}`}
                  className="block rounded-lg border border-border/50 px-4 py-3 hover:border-gold/40"
                >
                  <span className="text-xs text-gold">#{lesson.lessonNumber}</span>
                  <p className="font-medium">{lesson.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
