/** PRD Quarter 1 outline — lessons 6–65 (weeks 2–13). */
export type OutlineEntry = {
  lessonNumber: number;
  week: number;
  day: 1 | 2 | 3 | 4 | 5;
  lessonType: "character" | "story" | "concept" | "entity" | "theme";
  category: string;
  title: string;
  slug: string;
};

const dayType = {
  1: "character",
  2: "story",
  3: "concept",
  4: "entity",
  5: "theme",
} as const;

function entry(
  lessonNumber: number,
  week: number,
  day: 1 | 2 | 3 | 4 | 5,
  category: string,
  title: string,
  slug: string
): OutlineEntry {
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

export const quarter1Outline: OutlineEntry[] = [
  // Week 2 — Rise of the Titans
  entry(6, 2, 1, "cosmos", "Cronus", "cronus"),
  entry(7, 2, 2, "cosmos", "Cronus defeats Uranus", "cronus-defeats-uranus"),
  entry(8, 2, 3, "symbols", "The sickle symbol", "sickle-symbol"),
  entry(9, 2, 4, "cosmos", "Rhea", "rhea"),
  entry(10, 2, 5, "themes", "The Golden Age", "golden-age"),

  // Week 3 — Birth of the Olympians
  entry(11, 3, 1, "olympians", "Zeus as an infant", "zeus-as-an-infant"),
  entry(12, 3, 2, "olympians", "The swallowing of the gods", "swallowing-of-the-gods"),
  entry(13, 3, 3, "places", "Mount Olympus", "mount-olympus"),
  entry(14, 3, 4, "cosmos", "The Curetes warriors", "curetes-warriors"),
  entry(15, 3, 5, "concepts", "Prophecy and fear", "prophecy-and-fear"),

  // Week 4 — Titanomachy
  entry(16, 4, 1, "cosmos", "Titanomachy war overview", "titanomachy-overview"),
  entry(17, 4, 2, "cosmos", "Zeus frees the Cyclopes", "zeus-frees-cyclopes"),
  entry(18, 4, 3, "cosmos", "The Hundred-Handed Ones", "hundred-handed-ones"),
  entry(19, 4, 4, "symbols", "Zeus's thunderbolt", "zeus-thunderbolt"),
  entry(20, 4, 5, "themes", "Victory of the Olympians", "victory-olympians"),

  // Week 5 — The Olympian Order
  entry(21, 5, 1, "olympians", "Zeus", "zeus"),
  entry(22, 5, 2, "olympians", "Hera", "hera"),
  entry(23, 5, 3, "olympians", "Poseidon", "poseidon"),
  entry(24, 5, 4, "olympians", "Hades", "hades"),
  entry(25, 5, 5, "themes", "Division of the cosmos", "division-of-the-cosmos"),

  // Week 6 — Olympian Family
  entry(26, 6, 1, "olympians", "Demeter", "demeter"),
  entry(27, 6, 2, "olympians", "Hestia", "hestia"),
  entry(28, 6, 3, "olympians", "Athena", "athena"),
  entry(29, 6, 4, "olympians", "Apollo", "apollo"),
  entry(30, 6, 5, "olympians", "Artemis", "artemis"),

  // Week 7 — More Olympians
  entry(31, 7, 1, "olympians", "Ares", "ares"),
  entry(32, 7, 2, "olympians", "Aphrodite", "aphrodite"),
  entry(33, 7, 3, "olympians", "Hermes", "hermes"),
  entry(34, 7, 4, "olympians", "Hephaestus", "hephaestus"),
  entry(35, 7, 5, "olympians", "Dionysus", "dionysus"),

  // Week 8 — Divine Symbols
  entry(36, 8, 1, "symbols", "The lightning bolt", "lightning-bolt"),
  entry(37, 8, 2, "symbols", "The trident", "trident"),
  entry(38, 8, 3, "symbols", "The owl of Athena", "owl-of-athena"),
  entry(39, 8, 4, "symbols", "Ambrosia and nectar", "ambrosia-and-nectar"),
  entry(40, 8, 5, "symbols", "Sacred animals", "sacred-animals"),

  // Week 9 — Divine Relationships
  entry(41, 9, 1, "olympians", "Zeus and Hera", "zeus-and-hera"),
  entry(42, 9, 2, "olympians", "Athena and Poseidon rivalry", "athena-poseidon-rivalry"),
  entry(43, 9, 3, "olympians", "Apollo and Artemis twins", "apollo-artemis-twins"),
  entry(44, 9, 4, "olympians", "Hephaestus and Aphrodite", "hephaestus-aphrodite"),
  entry(45, 9, 5, "themes", "Divine jealousy", "divine-jealousy"),

  // Week 10 — Ancient Greek Beliefs
  entry(46, 10, 1, "culture", "Sacrifice rituals", "sacrifice-rituals"),
  entry(47, 10, 2, "culture", "Temples and worship", "temples-and-worship"),
  entry(48, 10, 3, "culture", "Oracles", "oracles"),
  entry(49, 10, 4, "places", "Delphi", "delphi"),
  entry(50, 10, 5, "concepts", "What hubris means", "what-is-hubris"),

  // Week 11 — The Fates
  entry(51, 11, 1, "cosmos", "Clotho", "clotho"),
  entry(52, 11, 2, "cosmos", "Lachesis", "lachesis"),
  entry(53, 11, 3, "cosmos", "Atropos", "atropos"),
  entry(54, 11, 4, "concepts", "The thread of life", "thread-of-life"),
  entry(55, 11, 5, "themes", "Destiny vs free will", "destiny-vs-free-will"),

  // Week 12 — The Underworld
  entry(56, 12, 1, "cosmos", "Charon", "charon"),
  entry(57, 12, 2, "cosmos", "Styx River", "styx-river"),
  entry(58, 12, 3, "monsters", "Cerberus", "cerberus"),
  entry(59, 12, 4, "places", "Elysium", "elysium"),
  entry(60, 12, 5, "themes", "Judgment after death", "judgment-after-death"),

  // Week 13 — Review and Integration
  entry(61, 13, 1, "olympians", "Olympians vs Titans", "olympians-vs-titans"),
  entry(62, 13, 2, "olympians", "Family tree overview", "family-tree-overview"),
  entry(63, 13, 3, "symbols", "Symbols recap", "symbols-recap"),
  entry(64, 13, 4, "concepts", "Divine powers comparison", "divine-powers-comparison"),
  entry(65, 13, 5, "culture", "Why mythology mattered", "why-mythology-mattered"),
];
