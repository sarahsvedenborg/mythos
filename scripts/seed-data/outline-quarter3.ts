/** PRD Quarter 3 outline — lessons 131–195 (weeks 27–39). */
import type { OutlineEntry } from "./outline";

function entry(
  lessonNumber: number,
  week: number,
  day: 1 | 2 | 3 | 4 | 5,
  category: string,
  title: string,
  slug: string
): OutlineEntry {
  const dayType = {
    1: "character",
    2: "story",
    3: "concept",
    4: "entity",
    5: "theme",
  } as const;
  return {
    lessonNumber,
    week,
    day,
    lessonType: dayType[day],
    category,
    title,
    slug,
  };
}

export const quarter3Outline: OutlineEntry[] = [
  // Week 27 — Famous Monsters
  entry(131, 27, 1, "monsters", "Medusa revisited", "medusa-revisited"),
  entry(132, 27, 2, "monsters", "The Hydra revisited", "hydra-revisited"),
  entry(133, 27, 3, "monsters", "Chimera revisited", "chimera-revisited"),
  entry(134, 27, 4, "monsters", "Scylla", "scylla"),
  entry(135, 27, 5, "monsters", "Charybdis", "charybdis"),

  // Week 28 — Hybrid Creatures
  entry(136, 28, 1, "monsters", "Centaurs", "centaurs"),
  entry(137, 28, 2, "monsters", "Satyrs", "satyrs"),
  entry(138, 28, 3, "monsters", "Harpies", "harpies"),
  entry(139, 28, 4, "monsters", "Sirens revisited", "sirens-revisited"),
  entry(140, 28, 5, "themes", "Mythical hybrids", "mythical-hybrids"),

  // Week 29 — Giants and Ancient Beings
  entry(141, 29, 1, "cosmos", "Cyclopes revisited", "cyclopes-revisited"),
  entry(142, 29, 2, "cosmos", "The Giants", "giants-gigantes"),
  entry(143, 29, 3, "cosmos", "Typhon", "typhon"),
  entry(144, 29, 4, "monsters", "Echidna", "echidna"),
  entry(145, 29, 5, "themes", "Chaos monsters", "chaos-monsters"),

  // Week 30 — Underworld Deep Dive
  entry(146, 30, 1, "cosmos", "Hades as ruler", "hades-as-ruler"),
  entry(147, 30, 2, "olympians", "Persephone", "persephone"),
  entry(148, 30, 3, "heroes", "The kidnapping myth", "persephone-kidnapping"),
  entry(149, 30, 4, "concepts", "Seasons explanation", "seasons-explanation"),
  entry(150, 30, 5, "culture", "Death in Greek belief", "death-in-greek-belief"),

  // Week 31 — Sacred Places
  entry(151, 31, 1, "places", "Olympus revisited", "olympus-revisited"),
  entry(152, 31, 2, "places", "Delphi revisited", "delphi-revisited"),
  entry(153, 31, 3, "places", "Crete revisited", "crete-revisited"),
  entry(154, 31, 4, "places", "Troy", "troy"),
  entry(155, 31, 5, "themes", "Sacred geography", "sacred-geography"),

  // Week 32 — Divine Objects
  entry(156, 32, 1, "symbols", "Hermes's sandals", "hermes-sandals"),
  entry(157, 32, 2, "symbols", "Athena's aegis", "athena-aegis"),
  entry(158, 32, 3, "symbols", "Poseidon's trident revisited", "trident-revisited"),
  entry(159, 32, 4, "symbols", "Pandora's jar", "pandoras-jar"),
  entry(160, 32, 5, "themes", "Mythological artifacts", "mythological-artifacts"),

  // Week 33 — Pandora
  entry(161, 33, 1, "heroes", "Pandora", "pandora"),
  entry(162, 33, 2, "heroes", "Creation of Pandora", "creation-of-pandora"),
  entry(163, 33, 3, "heroes", "Opening the jar", "opening-the-jar"),
  entry(164, 33, 4, "concepts", "Hope remains", "hope-remains"),
  entry(165, 33, 5, "themes", "Curiosity and consequences", "curiosity-and-consequences"),

  // Week 34 — Prometheus
  entry(166, 34, 1, "heroes", "Prometheus", "prometheus"),
  entry(167, 34, 2, "heroes", "Theft of fire", "theft-of-fire"),
  entry(168, 34, 3, "heroes", "Zeus's punishment", "prometheus-punishment"),
  entry(169, 34, 4, "heroes", "The eagle torment", "eagle-torment"),
  entry(170, 34, 5, "themes", "Fire as civilization", "fire-as-civilization"),

  // Week 35 — Narcissus and Echo
  entry(171, 35, 1, "heroes", "Narcissus", "narcissus"),
  entry(172, 35, 2, "heroes", "Echo", "echo"),
  entry(173, 35, 3, "symbols", "Reflection symbolism", "reflection-symbolism"),
  entry(174, 35, 4, "concepts", "Vanity in mythology", "vanity-in-mythology"),
  entry(175, 35, 5, "culture", "Modern word origins", "modern-word-origins"),

  // Week 36 — Pygmalion and Galatea
  entry(176, 36, 1, "heroes", "Pygmalion", "pygmalion"),
  entry(177, 36, 2, "heroes", "Galatea", "galatea"),
  entry(178, 36, 3, "olympians", "Aphrodite's blessing", "aphrodite-blessing-pygmalion"),
  entry(179, 36, 4, "concepts", "Art and creation", "art-and-creation"),
  entry(180, 36, 5, "themes", "Love and idealization", "love-and-idealization"),

  // Week 37 — Eros and Psyche
  entry(181, 37, 1, "olympians", "Eros", "eros"),
  entry(182, 37, 2, "heroes", "Psyche", "psyche"),
  entry(183, 37, 3, "heroes", "Impossible tasks", "psyche-tasks"),
  entry(184, 37, 4, "themes", "Divine romance", "divine-romance"),
  entry(185, 37, 5, "themes", "Transformation through love", "transformation-through-love"),

  // Week 38 — Muses and Inspiration
  entry(186, 38, 1, "cosmos", "The nine Muses", "nine-muses"),
  entry(187, 38, 2, "cosmos", "Calliope", "calliope"),
  entry(188, 38, 3, "cosmos", "Clio", "clio"),
  entry(189, 38, 4, "concepts", "Artistic inspiration", "artistic-inspiration"),
  entry(190, 38, 5, "themes", "Mythology and creativity", "mythology-and-creativity"),

  // Week 39 — Dreams and Prophecy
  entry(191, 39, 1, "cosmos", "Morpheus", "morpheus"),
  entry(192, 39, 2, "concepts", "Dream symbolism", "dream-symbolism"),
  entry(193, 39, 3, "heroes", "Cassandra", "cassandra"),
  entry(194, 39, 4, "concepts", "Ignored prophecies", "ignored-prophecies"),
  entry(195, 39, 5, "themes", "Seeing the future", "seeing-the-future"),
];
