/**
 * Seeds Explore content for Quarter 3 (lessons 131–195).
 * Adds 15 characters, 8 concepts, 6 places (EN + NO) and patches starter entries.
 *
 * Run: npm run seed:explore-quarter3
 */
import { createSeedClient } from "./seed-lib";
import {
  appendLessonRefs,
  linkCharacterRelations,
  upsertCharacter,
  upsertConcept,
  upsertLocation,
  type Locale,
} from "./seed-explore-lib";
import { exploreQuarter3, exploreQuarter3Patches } from "./seed-data/explore-quarter3";

async function applyPatches(client: ReturnType<typeof createSeedClient>, locale: Locale) {
  for (const [slug, numbers] of Object.entries(exploreQuarter3Patches.location)) {
    await appendLessonRefs(client, locale, "location", slug, [...numbers]);
  }
  for (const [slug, value] of Object.entries(exploreQuarter3Patches.character)) {
    if (Array.isArray(value)) {
      await appendLessonRefs(client, locale, "character", slug, value);
    }
  }
}

async function linkPersephoneHades(
  client: ReturnType<typeof createSeedClient>,
  locale: Locale
) {
  const patch = exploreQuarter3Patches.character.persephone;
  if (!patch || Array.isArray(patch)) return;
  const data = exploreQuarter3.charactersEn.persephone;
  await linkCharacterRelations(client, locale, "persephone", {
    ...data,
    slug: "persephone",
    parentSlugs: patch.parentSlugs,
  });
}

async function seedLocale(client: ReturnType<typeof createSeedClient>, locale: Locale) {
  console.log(`\n--- ${locale.toUpperCase()} ---`);
  const characters =
    locale === "en" ? exploreQuarter3.charactersEn : exploreQuarter3.charactersNo;
  const concepts = locale === "en" ? exploreQuarter3.conceptsEn : exploreQuarter3.conceptsNo;
  const locations =
    locale === "en" ? exploreQuarter3.locationsEn : exploreQuarter3.locationsNo;

  for (const slug of exploreQuarter3.characterSlugs) {
    await upsertCharacter(client, locale, slug, characters[slug]);
  }
  await linkPersephoneHades(client, locale);

  for (const slug of exploreQuarter3.conceptSlugs) {
    await upsertConcept(client, locale, slug, concepts[slug]);
  }
  for (const slug of exploreQuarter3.locationSlugs) {
    await upsertLocation(client, locale, slug, locations[slug]);
  }

  await applyPatches(client, locale);
}

async function main() {
  const client = createSeedClient();
  await seedLocale(client, "en");
  await seedLocale(client, "no");
  console.log(
    "\nExplore Quarter 3 complete (15 characters, 8 concepts, 6 places × 2 locales + patches). Publish in Studio if needed."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
