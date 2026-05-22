/** PRD Quarter 2 outline — lessons 66–130 (weeks 14–26, Heroes). */
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

export const quarter2Outline: OutlineEntry[] = [
  // Week 14 — Perseus
  entry(66, 14, 1, "heroes", "Danaë", "danae"),
  entry(67, 14, 2, "heroes", "Birth of Perseus", "birth-of-perseus"),
  entry(68, 14, 3, "monsters", "Medusa", "medusa"),
  entry(69, 14, 4, "monsters", "Pegasus", "pegasus"),
  entry(70, 14, 5, "heroes", "Perseus saves Andromeda", "perseus-saves-andromeda"),

  // Week 15 — Heracles
  entry(71, 15, 1, "heroes", "Heracles", "heracles"),
  entry(72, 15, 2, "heroes", "Hera's hatred of Heracles", "hera-hatred-heracles"),
  entry(73, 15, 3, "monsters", "The Nemean Lion", "nemean-lion"),
  entry(74, 15, 4, "monsters", "The Lernaean Hydra", "lernaean-hydra"),
  entry(75, 15, 5, "themes", "The Twelve Labors", "twelve-labors"),

  // Week 16 — More Labors
  entry(76, 16, 1, "heroes", "The Ceryneian Hind", "ceryneian-hind"),
  entry(77, 16, 2, "heroes", "The Erymanthian Boar", "erymanthian-boar"),
  entry(78, 16, 3, "heroes", "The Augean Stables", "augean-stables"),
  entry(79, 16, 4, "monsters", "Heracles and Cerberus", "heracles-cerberus"),
  entry(80, 16, 5, "themes", "Heroism in Greek myth", "heroism-in-greek-myth"),

  // Week 17 — Theseus
  entry(81, 17, 1, "heroes", "King Minos", "king-minos"),
  entry(82, 17, 2, "monsters", "The Minotaur", "minotaur"),
  entry(83, 17, 3, "places", "The Labyrinth", "labyrinth"),
  entry(84, 17, 4, "symbols", "Ariadne's thread", "ariadnes-thread"),
  entry(85, 17, 5, "heroes", "Theseus as king", "theseus-as-king"),

  // Week 18 — Jason and the Argonauts
  entry(86, 18, 1, "heroes", "Jason", "jason"),
  entry(87, 18, 2, "heroes", "The Golden Fleece", "golden-fleece"),
  entry(88, 18, 3, "heroes", "Medea", "medea"),
  entry(89, 18, 4, "monsters", "Talos", "talos"),
  entry(90, 18, 5, "themes", "Adventure myths", "adventure-myths"),

  // Week 19 — Bellerophon
  entry(91, 19, 1, "heroes", "Bellerophon", "bellerophon"),
  entry(92, 19, 2, "monsters", "The Chimera", "chimera"),
  entry(93, 19, 3, "concepts", "Hubris of Bellerophon", "hubris-of-bellerophon"),
  entry(94, 19, 4, "concepts", "Monsters as symbols", "monsters-as-symbols"),
  entry(95, 19, 5, "themes", "Divine punishment", "divine-punishment"),

  // Week 20 — Atalanta
  entry(96, 20, 1, "heroes", "Atalanta", "atalanta"),
  entry(97, 20, 2, "heroes", "The Calydonian Boar Hunt", "calydonian-boar-hunt"),
  entry(98, 20, 3, "symbols", "The golden apples", "golden-apples-atalanta"),
  entry(99, 20, 4, "heroes", "Women heroes in myth", "women-heroes-in-myth"),
  entry(100, 20, 5, "themes", "Competition and pride", "competition-and-pride"),

  // Week 21 — Daedalus and Icarus
  entry(101, 21, 1, "heroes", "Daedalus", "daedalus"),
  entry(102, 21, 2, "heroes", "Wings of wax", "wings-of-wax"),
  entry(103, 21, 3, "heroes", "Fall of Icarus", "fall-of-icarus"),
  entry(104, 21, 4, "concepts", "Hubris revisited", "hubris-revisited"),
  entry(105, 21, 5, "themes", "Human ambition", "human-ambition"),

  // Week 22 — Orpheus
  entry(106, 22, 1, "heroes", "Orpheus", "orpheus"),
  entry(107, 22, 2, "heroes", "Eurydice", "eurydice"),
  entry(108, 22, 3, "heroes", "Orpheus in the Underworld", "orpheus-underworld"),
  entry(109, 22, 4, "concepts", "Looking back", "looking-back"),
  entry(110, 22, 5, "themes", "Love and loss", "love-and-loss"),

  // Week 23 — Oedipus
  entry(111, 23, 1, "heroes", "Prophecy of Oedipus", "prophecy-of-oedipus"),
  entry(112, 23, 2, "monsters", "The Sphinx", "sphinx"),
  entry(113, 23, 3, "heroes", "Solving the riddle", "sphinx-riddle"),
  entry(114, 23, 4, "concepts", "Tragic destiny", "tragic-destiny"),
  entry(115, 23, 5, "symbols", "Blindness symbolism", "blindness-symbolism"),

  // Week 24 — Trojan War Origins
  entry(116, 24, 1, "cosmos", "Eris", "eris"),
  entry(117, 24, 2, "heroes", "Judgment of Paris", "judgment-of-paris"),
  entry(118, 24, 3, "heroes", "Helen of Troy", "helen-of-troy"),
  entry(119, 24, 4, "heroes", "Menelaus", "menelaus"),
  entry(120, 24, 5, "themes", "Beginning of the Trojan War", "beginning-trojan-war"),

  // Week 25 — Achilles
  entry(121, 25, 1, "heroes", "Achilles", "achilles"),
  entry(122, 25, 2, "concepts", "The River Styx", "river-styx"),
  entry(123, 25, 3, "heroes", "Patroclus", "patroclus"),
  entry(124, 25, 4, "heroes", "Hector", "hector"),
  entry(125, 25, 5, "symbols", "Achilles' heel", "achilles-heel"),

  // Week 26 — Odysseus
  entry(126, 26, 1, "heroes", "Odysseus", "odysseus"),
  entry(127, 26, 2, "monsters", "Polyphemus the Cyclops", "polyphemus"),
  entry(128, 26, 3, "heroes", "Circe", "circe"),
  entry(129, 26, 4, "monsters", "The Sirens", "sirens"),
  entry(130, 26, 5, "themes", "Journey home themes", "journey-home-themes"),
];
