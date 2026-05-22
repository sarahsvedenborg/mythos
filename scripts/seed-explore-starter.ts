/**
 * Seeds Explore starter: 12 gods, 8 concepts, 6 places (EN + NO).
 * Links related lessons 1–65 where they exist in Sanity.
 *
 * Run: npm run seed:explore-starter
 */
import { block, createSeedClient } from "./seed-lib";
import { exploreStarter } from "./seed-data/explore-starter";

type Locale = "en" | "no";

async function lessonRefs(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale,
  numbers: number[]
) {
  if (numbers.length === 0) return [];
  const rows = await client.fetch<{ _id: string; lessonNumber: number }[]>(
    `*[_type == "lesson" && locale == $locale && lessonNumber in $numbers]{ _id, lessonNumber }`,
    { locale, numbers }
  );
  const order = new Map(numbers.map((n, i) => [n, i]));
  return rows
    .sort((a, b) => (order.get(a.lessonNumber) ?? 0) - (order.get(b.lessonNumber) ?? 0))
    .map((r) => ({ _type: "reference" as const, _ref: r._id, _key: `lesson-${r.lessonNumber}` }));
}

async function characterIdBySlug(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale,
  slug: string
) {
  return client.fetch<string | null>(
    `*[_type == "character" && locale == $locale && slug.current == $slug][0]._id`,
    { locale, slug }
  );
}

async function upsertCharacter(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale,
  slug: string
) {
  const data =
    locale === "en" ? exploreStarter.charactersEn[slug] : exploreStarter.charactersNo[slug];

  const relatedLessons = await lessonRefs(client, locale, data.relatedLessonNumbers);

  const doc = {
    _type: "character" as const,
    locale,
    name: data.name,
    slug: { _type: "slug" as const, current: slug },
    type: data.type,
    symbols: data.symbols,
    description: data.description.map((p) => block(p)),
    relatedLessons,
  };

  const existing = await characterIdBySlug(client, locale, slug);
  if (existing) {
    await client.patch(existing).set(doc).commit();
    console.log(`Updated [${locale}] character: ${data.name}`);
    return existing;
  }
  const created = await client.create(doc);
  console.log(`Created [${locale}] character: ${data.name}`);
  return created._id;
}

async function linkCharacterRelations(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale,
  slug: string
) {
  const data =
    locale === "en" ? exploreStarter.charactersEn[slug] : exploreStarter.charactersNo[slug];
  const id = await characterIdBySlug(client, locale, slug);
  if (!id) return;

  const parents = [];
  for (const p of data.parentSlugs ?? []) {
    const ref = await characterIdBySlug(client, locale, p);
    if (ref) parents.push({ _type: "reference" as const, _ref: ref, _key: `parent-${p}` });
  }

  const children = [];
  for (const c of data.childSlugs ?? []) {
    const ref = await characterIdBySlug(client, locale, c);
    if (ref) children.push({ _type: "reference" as const, _ref: ref, _key: `child-${c}` });
  }

  if (parents.length || children.length) {
    await client
      .patch(id)
      .set({
        ...(parents.length ? { parents } : {}),
        ...(children.length ? { children } : {}),
      })
      .commit();
  }
}

async function upsertConcept(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale,
  slug: string
) {
  const data =
    locale === "en" ? exploreStarter.conceptsEn[slug] : exploreStarter.conceptsNo[slug];
  const relatedLessons = await lessonRefs(client, locale, data.relatedLessonNumbers);

  const doc = {
    _type: "concept" as const,
    locale,
    term: data.term,
    slug: { _type: "slug" as const, current: slug },
    definition: data.definition,
    relatedLessons,
  };

  const existing = await client.fetch<string | null>(
    `*[_type == "concept" && locale == $locale && slug.current == $slug][0]._id`,
    { locale, slug }
  );

  if (existing) {
    await client.patch(existing).set(doc).commit();
    console.log(`Updated [${locale}] concept: ${data.term}`);
  } else {
    await client.create(doc);
    console.log(`Created [${locale}] concept: ${data.term}`);
  }
}

async function upsertLocation(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale,
  slug: string
) {
  const data =
    locale === "en" ? exploreStarter.locationsEn[slug] : exploreStarter.locationsNo[slug];
  const relatedLessons = await lessonRefs(client, locale, data.relatedLessonNumbers);

  const doc = {
    _type: "location" as const,
    locale,
    name: data.name,
    slug: { _type: "slug" as const, current: slug },
    myths: data.myths,
    description: data.description.map((p) => block(p)),
    relatedLessons,
  };

  const existing = await client.fetch<string | null>(
    `*[_type == "location" && locale == $locale && slug.current == $slug][0]._id`,
    { locale, slug }
  );

  if (existing) {
    await client.patch(existing).set(doc).commit();
    console.log(`Updated [${locale}] place: ${data.name}`);
  } else {
    await client.create(doc);
    console.log(`Created [${locale}] place: ${data.name}`);
  }
}

async function seedLocale(client: ReturnType<typeof createSeedClient>, locale: Locale) {
  console.log(`\n--- ${locale.toUpperCase()} ---`);

  for (const slug of exploreStarter.characterSlugs) {
    await upsertCharacter(client, locale, slug);
  }
  for (const slug of exploreStarter.characterSlugs) {
    await linkCharacterRelations(client, locale, slug);
  }
  for (const slug of exploreStarter.conceptSlugs) {
    await upsertConcept(client, locale, slug);
  }
  for (const slug of exploreStarter.locationSlugs) {
    await upsertLocation(client, locale, slug);
  }
}

async function main() {
  const client = createSeedClient();
  await seedLocale(client, "en");
  await seedLocale(client, "no");
  console.log(
    "\nExplore starter complete (12 gods, 8 concepts, 6 places × 2 locales). Publish in Studio if needed."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
