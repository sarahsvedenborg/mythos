import { block, createSeedClient } from "./seed-lib";
import type {
  CharacterStarter,
  ConceptStarter,
  LocationStarter,
} from "./seed-data/explore-starter";

export type Locale = "en" | "no";

export { block };

export async function lessonRefs(
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
    .map((r) => ({
      _type: "reference" as const,
      _ref: r._id,
      _key: `lesson-${r.lessonNumber}`,
    }));
}

export async function appendLessonRefs(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale,
  docType: "character" | "concept" | "location",
  slug: string,
  addNumbers: number[]
) {
  const doc = await client.fetch<{ _id: string; relatedLessons?: { lessonNumber: number }[] } | null>(
    `*[_type == $docType && locale == $locale && slug.current == $slug][0]{
      _id,
      "relatedLessons": relatedLessons[]->{ "lessonNumber": lessonNumber }
    }`,
    { docType, locale, slug }
  );
  if (!doc) {
    console.log(`Skip patch (not found) [${locale}] ${docType}: ${slug}`);
    return;
  }
  const existing = doc.relatedLessons?.map((l) => l.lessonNumber) ?? [];
  const merged = [...new Set([...existing, ...addNumbers])].sort((a, b) => a - b);
  const refs = await lessonRefs(client, locale, merged);
  await client.patch(doc._id).set({ relatedLessons: refs }).commit();
  console.log(`Patched [${locale}] ${docType} ${slug}: lessons ${merged.join(", ")}`);
}

export async function characterIdBySlug(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale,
  slug: string
) {
  return client.fetch<string | null>(
    `*[_type == "character" && locale == $locale && slug.current == $slug][0]._id`,
    { locale, slug }
  );
}

export async function upsertCharacter(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale,
  slug: string,
  data: CharacterStarter & { name: string }
) {
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

export async function linkCharacterRelations(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale,
  slug: string,
  data: CharacterStarter
) {
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

export async function upsertConcept(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale,
  slug: string,
  data: ConceptStarter & { term: string }
) {
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

export async function upsertLocation(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale,
  slug: string,
  data: LocationStarter & { name: string }
) {
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
