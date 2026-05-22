/** Explore Quarter 3 content — 15 characters, 8 concepts, 6 places (lessons 131–195). */

import type { ConceptStarter, LocationStarter } from "./explore-starter";

export type { ConceptStarter, LocationStarter } from "./explore-starter";

export type CharacterStarter = {
  slug: string;
  type: "god" | "titan" | "hero" | "monster";
  symbols: string[];
  description: string[];
  relatedLessonNumbers: number[];
  parentSlugs?: string[];
  childSlugs?: string[];
};

const charactersEn: Record<string, Omit<CharacterStarter, "slug"> & { name: string }> = {
  medusa: {
    name: "Medusa",
    type: "monster",
    symbols: ["snake hair", "petrifying gaze", "Gorgon head"],
    description: [
      "Medusa is the most famous Gorgon — once a beautiful maiden, later a monster whose look turns living flesh to stone. In Hesiod she is mortal among her immortal sisters Stheno and Euryale; in Ovid, Athena transforms her after a violation in the goddess's temple.",
      "Perseus beheads her with a mirrored shield and gifts her head to Athena, who sets it on the aegis. Her face becomes an apotropaic emblem on temples and shields — terror turned into protection. Revisiting Medusa means separating the Perseus adventure from the enduring image of the petrifying gaze.",
    ],
    relatedLessonNumbers: [131, 68],
  },
  hydra: {
    name: "Hydra",
    type: "monster",
    symbols: ["many heads", "Lerna swamp", "regrowing heads"],
    description: [
      "The Lernaean Hydra lurked in the marshes of Lerna, offspring of Typhon and Echidna in Hesiod's monster genealogy. She bore many heads — one immortal, the rest venomous — and for each head Heracles cut off, two grew back until Iolaus cauterized the stumps with fire.",
      "Hera sent a giant crab to distract the hero while he fought. Her defeat supplies the poison for Heracles' arrows and models how Greek myth pairs impossible monsters with cooperative, clever solutions — a pest that spreads when attacked wrongly.",
    ],
    relatedLessonNumbers: [132, 74],
  },
  chimera: {
    name: "Chimera",
    type: "monster",
    symbols: ["lion-goat-serpent", "fire breath", "Pegasus"],
    description: [
      "Hesiod lists the Chimera among the children of Typhon and Echidna, kin to Cerberus, the Hydra, and the Sphinx. Homer describes her as lion in front, goat in the middle, serpent behind, breathing raging fire until Bellerophon slew her from Pegasus with Athena's golden bridle.",
      "Her composite body embodies broken natural boundaries — the same theme as other Typhon-born monsters heroes must restore to order. The name chimaira later meant an unreal mixture in Greek thought, and she stands for cosmic disorder made visible.",
    ],
    relatedLessonNumbers: [133, 92],
  },
  scylla: {
    name: "Scylla",
    type: "monster",
    symbols: ["six heads", "cliff cave", "sea straits"],
    description: [
      "Scylla lurks in a cliff-side cave, a monster who snatches sailors from passing ships — six heads that each take a man while the vessel races past. Circe warns Odysseus not to fight her but to hug the cliff and accept the lesser loss.",
      "Opposite Charybdis's whirlpool, she maps unavoidable harm onto real straits often identified with the Strait of Messina. Scylla represents loss the wisest captain cannot prevent — geography turned into moral and epic drama.",
    ],
    relatedLessonNumbers: [134],
  },
  typhon: {
    name: "Typhon",
    type: "monster",
    symbols: ["storm giant", "fire mountains", "hundred heads"],
    description: [
      "Typhon (Typhoeus) is the greatest storm giant of myth — son of Gaia and Tartarus in Hesiod, or Gaia's revenge after the Titans' fall. He challenged Zeus for cosmic rule, hurling fire and thunder back until the king of the gods struck him down with the thunderbolt.",
      "Buried under Etna or cast into Tartarus, he fathers with Echidna the brood of famous monsters: Cerberus, Hydra, Chimera, Sphinx, and more. Typhon names typhoons and stands for raw destructive nature against Olympian order after the Titanomachy.",
    ],
    relatedLessonNumbers: [143, 145],
  },
  echidna: {
    name: "Echidna",
    type: "monster",
    symbols: ["woman and serpent", "monster mother", "cave dwelling"],
    description: [
      "Echidna is half fair woman, half serpent — the mother of Greece's monster brood in Hesiod. With Typhon she parents Cerberus, the Lernaean Hydra, the Chimera, the Nemean Lion in some lists, the Sphinx, and other beasts that heroes meet across the tradition.",
      "She is rarely slain in epic; she is the enduring breeding ground of terrors. Greeks used her to group road hazards and labor-beasts under one genealogical roof — nearly every impossible foe traces back to her and Typhon.",
    ],
    relatedLessonNumbers: [144, 145],
  },
  persephone: {
    name: "Persephone",
    type: "god",
    symbols: ["pomegranate", "torch", "spring flowers"],
    description: [
      "Persephone (Kore, the Maiden) is daughter of Demeter and queen of the underworld beside Hades. The Homeric Hymn tells how Hades rose in his golden chariot and carried her off while she gathered flowers — a narcissus planted by Gaia at Zeus's bidding marked the trap.",
      "Her cyclical return to earth explains the seasons and anchors the Eleusinian Mysteries: initiates hoped for a better fate through her and her mother. She bridges maidenhood, marriage, and sovereignty over shades — making Hades' realm livable, not only grim.",
    ],
    relatedLessonNumbers: [147, 148, 149],
  },
  pandora: {
    name: "Pandora",
    type: "hero",
    symbols: ["jar (pithos)", "gifts of the gods", "hope (Elpis)"],
    description: [
      "Pandora ('all-gifted') is the first woman in Hesiod, fashioned by the gods after Prometheus gave mortals fire. Hephaestus molded her from earth and water; each Olympian added a gift — beauty, craft, and cunning speech — and Zeus sent her with a sealed jar to Epimetheus.",
      "When she opened the pithos, diseases, toil, and sorrows flew out; only Elpis (Hope) remained inside by the time she closed the lid. Her story opens the age of hardship in Works and Days and ties human suffering to divine punishment for Prometheus's rebellion.",
    ],
    relatedLessonNumbers: [161, 162, 163, 164, 165],
  },
  prometheus: {
    name: "Prometheus",
    type: "hero",
    symbols: ["fire", "chains", "eagle and liver"],
    description: [
      "Prometheus ('Forethought') is the Titan who sided with Zeus in the Titanomachy yet defied him for humanity's sake. He tricked Zeus at the sacrifice, stole fire from heaven, and taught mortals arts that lifted them above beasts — craft, astronomy, and medicine in many traditions.",
      "Zeus bound him to a Caucasus crag where an eagle ate his regenerating liver daily until Heracles freed him. Pandora, Epimetheus, and eternal torment follow his gift — Greek myth's enduring image of progress bought with suffering and divine anger.",
    ],
    relatedLessonNumbers: [166, 167, 168, 169, 170],
  },
  narcissus: {
    name: "Narcissus",
    type: "hero",
    symbols: ["pool", "narcissus flower", "reflection"],
    description: [
      "Narcissus (from narke, numbness) is the hunter so beautiful that those who desire him are ruined. Son of the river god Cephissus and the nymph Liriope, he spurns Echo and many suitors until Nemesis (or Aphrodite) leads him to a still pool where he mistakes his image for another youth.",
      "He wastes away staring, or falls into the water and drowns; a flower springs where he died. The story pairs with Echo's loss: one dies of unrequited love for others, the other for the self — giving Western culture its archetype of fatal self-absorption.",
    ],
    relatedLessonNumbers: [171, 173, 174],
  },
  echo: {
    name: "Echo",
    type: "hero",
    symbols: ["repeated speech", "fading voice", "mountain nymph"],
    description: [
      "Echo was once a lively speaker until she helped Zeus hide his affairs from Hera by distracting the queen with chatter. When Hera discovered the trick, she condemned Echo to repeat the ends of others' words and never initiate her own.",
      "She falls in love with Narcissus and follows him until only her voice remains — speech reduced to reflection, like his pool. Together the pair map two failures of communication: repetition without self, and gaze without other.",
    ],
    relatedLessonNumbers: [172],
  },
  eros: {
    name: "Eros",
    type: "god",
    symbols: ["bow and arrows", "wings", "torch"],
    description: [
      "Eros is the god of desire who sets gods, mortals, and heroes in motion. In early art he often appears as a winged youth with Aphrodite; Hesiod makes him one of the first forces after Chaos; Plato treats love as a ladder from body to truth.",
      "In the tale of Eros and Psyche he is bridegroom and divine husband — hidden identity, broken trust, and reunion after trials. Without Eros, Helen never sails, Medea never helps Jason, and Psyche never ascends to Olympus.",
    ],
    relatedLessonNumbers: [181, 184, 185],
  },
  psyche: {
    name: "Psyche",
    type: "hero",
    symbols: ["lamp", "butterfly soul", "impossible tasks"],
    description: [
      "Psyche ('soul') was a mortal princess so beautiful that people began to honor her above Aphrodite. The goddess sent Eros to punish her, but he fell in love and hid his identity in a magical palace until her sisters persuaded her to look at him with a lamp.",
      "A drop of hot oil woke the god; she wandered the world completing impossible tasks — sorting grain, golden fleece, water from Styx — before Zeus sanctioned marriage and apotheosis. Her arc raises the soul through ordeal, trust, and love to divine status.",
    ],
    relatedLessonNumbers: [182, 183, 184, 185],
  },
  cassandra: {
    name: "Cassandra",
    type: "hero",
    symbols: ["prophetic frenzy", "Trojan horse", "broken pledge"],
    description: [
      "Cassandra, daughter of Priam and Hecuba of Troy, received true prophecy from Apollo after promising herself to him, then broke the pledge. The god granted foresight but added disbelief — her cries of the wooden horse, Agamemnon's murder, and her own death went unheeded.",
      "Aeschylus stages her wild, accurate speech in Agamemnon. She embodies the prophetess ruined by divine spite and political denial — accurate warning that arrives too late to change fate, knowledge without power.",
    ],
    relatedLessonNumbers: [193, 194, 195],
  },
  morpheus: {
    name: "Morpheus",
    type: "god",
    symbols: ["human dream shape", "sleep", "night forms"],
    description: [
      "Morpheus ('Form') is the dream-god who appears in human guise in sleep — kings, friends, dead kin — in Ovid's house of Somnus among a thousand dream spirits. His brothers Phobetor and Phantasos take animal or object shapes instead.",
      "Greek religion also knew Oneiroi and dreams sent from Zeus or the dead. Morpheus personifies the believable dream — prophecy mistaken for mere night, or night-truth later acted on, as when Agamemnon's deceptive dream opens the Iliad's martial books.",
    ],
    relatedLessonNumbers: [191, 192],
  },
};

const charactersNo: Record<string, Omit<CharacterStarter, "slug"> & { name: string }> = {
  medusa: {
    name: "Medusa",
    type: "monster",
    symbols: ["slangehår", "forsteining", "gorgonhode"],
    description: [
      "Medusa er den mest berømte gorgonen — en gang vakker, senere et monster hvis blikk gjør levende kjøtt til stein. Hos Hesiod er hun dødelig blant søstrene Stheno og Euryale; hos Ovid forvandler Athene henne etter en krenkelse i gudinnens tempel.",
      "Persevs halshugger henne med et speilskjold og gir hodet til Athene, som setter det på aegis. Ansiktet blir et apotropaisk tegn på templer og skjold — skrekk gjort til vern. Å gjenbesøke Medusa er å skille eventyret fra det vedvarende bildet av det forsteiningse blikket.",
    ],
    relatedLessonNumbers: [131, 68],
  },
  hydra: {
    name: "Hydra",
    type: "monster",
    symbols: ["mange hoder", "Lerna-myra", "voksende hoder"],
    description: [
      "Den lernaiske hydraen lurte i Lerna-myraene, avkom av Tyfon og Echidna i Hesiods slektstre. Hun hadde mange hoder — ett udødelig, resten giftige — og for hvert hode Herakles kuttet av, vokste to til Iolaos brente stumpene med ild.",
      "Hera sendte en kjempekrabbe for å distrahere helten. Seieren ga gift til Herakles' piler og viser hvordan gresk myte krever list og samarbeid mot umulige uhyrer — fare som forsterkes av feil angrep.",
    ],
    relatedLessonNumbers: [132, 74],
  },
  chimera: {
    name: "Kimæren",
    type: "monster",
    symbols: ["løve-geit-slange", "ildpust", "Pegasus"],
    description: [
      "Hesiod fører kimæren til Tyfon og Echidna, i slekt med Kerberos, hydraen og sfinksen. Homeros beskriver henne som løve foran, geit på midten, slange bak, med raseri av ild til Bellerofon drepte henne fra Pegasus med Athenes gylne grime.",
      "Det sammensatte legemet bryter naturens grenser — samme tema som andre tyfonbårne monstre helter må gjenopprette. Navnet kimæra ble senere bilde på uvirkelig blanding og kosmisk uorden gjort synlig.",
    ],
    relatedLessonNumbers: [133, 92],
  },
  scylla: {
    name: "Skylla",
    type: "monster",
    symbols: ["seks hoder", "klippehule", "farvann"],
    description: [
      "Skylla bor i en klippehule og snapper sjøfolk fra skip som passerer — seks hoder tar hver sin mann mens fartøyet skynder forbi. Kirke advarer Odyssevs mot å kjempe henne; heller ta tapet ved klippen.",
      "Motsatt Kharybdis' virvel kartlegger hun uunngåelig skade på strender ofte knyttet til Messinastdet. Skylla er tap selv den klokeste kapteinen ikke kan hindre — geografi gjort til moral og epos.",
    ],
    relatedLessonNumbers: [134],
  },
  typhon: {
    name: "Tyfon",
    type: "monster",
    symbols: ["stormkjempe", "vulkan", "mange hoder"],
    description: [
      "Tyfon (Typhoeus) er mytens største stormkjempe — i Hesiod sønn av Gaia og Tartaros, i andre tradisjoner Gaiaas hevn etter titanenes fall. Han utfordret Zevs om kosmisk herredømme til kongen av guder felte ham med lynet.",
      "Begravet under Etna eller kastet i Tartaros, får han med Echidna avkom som Kerberos, hydra, kimæren og sfinksen. Tyfon navngir tyfoner og står for rå natur mot olympisk orden etter titanomachien.",
    ],
    relatedLessonNumbers: [143, 145],
  },
  echidna: {
    name: "Echidna",
    type: "monster",
    symbols: ["kvinne og slange", "monster-mor", "hule"],
    description: [
      "Echidna er halvt vakker kvinne, halvt slange — mor til Hellas monsterflokk hos Hesiod. Med Tyfon føder hun Kerberos, den lernaiske hydraen, kimæren, det nemeiske løvet i noen lister, sfinksen og andre beister helter møter.",
      "Hun drepes sjelden i epos; hun er den vedvarende kilden til uhyrer. Grekerne brukte henne til å samle fare under ett slektstre — nesten hver umulig fiende går tilbake til henne og Tyfon.",
    ],
    relatedLessonNumbers: [144, 145],
  },
  persephone: {
    name: "Persefone",
    type: "god",
    symbols: ["granateple", "fakkel", "vårblomster"],
    description: [
      "Persefone (Kore, jomfruen) er Demeters datter og dronning i underverdenen ved Hades' side. I den homeriske hymnen bærer Hades henne bort mens hun plukker blomster — en narkiss plantet av Gaia på Zevs' befaling markerer fellen.",
      "Hennes sykliske retur til jorden forklarer årstidene og eleusinske mysterier: innviede håpet på bedre skjebne gjennom henne og moren. Hun binder jomfrudom, ekteskap og makt over skygger — og gjør Hades' rike levende, ikke bare skummelt.",
    ],
    relatedLessonNumbers: [147, 148, 149],
  },
  pandora: {
    name: "Pandora",
    type: "hero",
    symbols: ["krukke (pithos)", "gudenes gaver", "håp (Elpis)"],
    description: [
      "Pandora («alle-gaven») er den første kvinnen hos Hesiod, smidd av gudene etter at Prometheus ga menneskene ild. Hephaistos formet henne av jord og vann; hver olympier la inn en gave — skjønnhet, list og tale — og Zevs sendte henne med en forseglet krukke til Epimethevs.",
      "Da hun åpnet pithos, fløy sykdom, slit og sorg ut; bare Elpis (håpet) ble igjen da hun lukket lokket. Historien åpner tidsalderen av menneskelig lidelse i Verker og dager og knytter plager til straff for Promethevs opprør.",
    ],
    relatedLessonNumbers: [161, 162, 163, 164, 165],
  },
  prometheus: {
    name: "Prometheus",
    type: "hero",
    symbols: ["ild", "lenker", "ørn og lever"],
    description: [
      "Prometheus («Foruttenkeren») er titanen som støttet Zevs i titanomachien, men trosset ham for menneskenes skyld. Han lurt Zevs ved offeret, stjal ild fra himmelen og lærte dødelige kunster som løftet dem over dyrenes liv.",
      "Zevs bandt ham til Kaukasus der en ørn åt hans lever daglig til Herakles befriet ham. Pandora, Epimethevs og evig lidelse følger gaven — mytens bilde på fremskritt kjøpt med guddommelig vrede.",
    ],
    relatedLessonNumbers: [166, 167, 168, 169, 170],
  },
  narcissus: {
    name: "Narkissos",
    type: "hero",
    symbols: ["dam", "narkissblomst", "speilbilde"],
    description: [
      "Narkissos (av narke, bedøvelse) er jegeren så vakker at de som ønsker ham, går under. Sønn av elveguden Kefissos og nymfen Liriope; han avviser Ekko og mange friere til Nemesis (eller Afrodite) leder ham til en stille dam der han tar speilet for en annen ung mann.",
      "Han visner bort i stirring, eller faller i vannet og drukner; en blomst springer opp der han døde. Myten parer Ekkos tap: den ene dør av ensidig kjærlighet til andre, den andre til seg selv — arketypen på fatal selvopptatthet.",
    ],
    relatedLessonNumbers: [171, 173, 174],
  },
  echo: {
    name: "Ekko",
    type: "hero",
    symbols: ["gjentagelse", "stemme alene", "fjellnymfe"],
    description: [
      "Ekko var en gang livlig taler til hun hjalp Zevs skjule sine affærer for Hera ved å distrahere dronningen med prat. Da Hera oppdaget trikset, dømte hun Ekko til å gjenta andres ord og aldri begynne sin egen tale.",
      "Hun forelsker seg i Narkissos og følger ham til bare stemmen er igjen — tale redusert til ekko, som hans dam. Sammen kartlegger de to former for mislykket kommunikasjon: gjentakelse uten selv, og blikk uten den andre.",
    ],
    relatedLessonNumbers: [172],
  },
  eros: {
    name: "Eros",
    type: "god",
    symbols: ["bue og piler", "vinger", "fakkel"],
    description: [
      "Eros er begjærets gud som setter guder, mennesker og helter i bevegelse. I tidlig kunst er han ofte en ung, vinget gud ved Afrodites side; hos Hesiod er han en av de første kreftene etter Kaos; hos Platon er kjærlighet en stige fra kropp til sannhet.",
      "I Eros og Psykhe er han brudgom og guddommelig ektemann — skjult identitet, brutt tillit og gjenforening etter prøvelser. Uten Eros seiler ikke Helen, Medea hjelper ikke Jason, og Psykhe stiger ikke til Olympen.",
    ],
    relatedLessonNumbers: [181, 184, 185],
  },
  psyche: {
    name: "Psykhe",
    type: "hero",
    symbols: ["lampe", "sjel som sommerfugl", "umulige oppgaver"],
    description: [
      "Psykhe («sjel») var en dødelig prinsesse så vakker at folk æret henne fremfor Afrodite. Gudinnen sendte Eros for å straffe henne, men han forelsket seg og skjulte seg i et palass til søstrene overtalte henne til å se ham med en lampe.",
      "En dråpe het olje våknet guden; hun vandret verden og fullførte umulige oppgaver — sortere korn, gyllen ull, vann fra Styx — før Zevs godkjente ekteskap og apotheose. Hennes reise løfter sjelen gjennom prøvelse, tillit og kjærlighet.",
    ],
    relatedLessonNumbers: [182, 183, 184, 185],
  },
  cassandra: {
    name: "Kassandra",
    type: "hero",
    symbols: ["profetisk ekstase", "trojansk hest", "brutt løfte"],
    description: [
      "Kassandra, datter av Priam og Hekuba i Troja, fikk sanne profetier av Apollon etter å ha lovet seg til ham, så brøt løftet. Guden ga innsikt men også van tro — rop om trehesten, Agamemnons drap og hennes egen død ble ikke hørt.",
      "Aiskhylos dramatiserer hennes ville, treffsikre tale i Agamemnon. Hun er profetinnen ødelagt av guddommelig nag og politisk fornektelse — kunnskap uten makt, advarsel for sent.",
    ],
    relatedLessonNumbers: [193, 194, 195],
  },
  morpheus: {
    name: "Morfeus",
    type: "god",
    symbols: ["menneskelig drømmeform", "søvn", "nattens bilder"],
    description: [
      "Morfeus («Form») er drømmenes gud som viser seg i menneskelig skikk i søvn — konger, venner, døde slektninger — i Ovids hus hos Somnus blant tusen drømmeånder. Brødrene Phobetor og Phantasos tar dyre- eller tingformer.",
      "Gresk religion kjente også Oneiroi og drømmer sendt fra Zevs eller de døde. Morfeus legemliggjør den troverdige drømmen — spådom forvekslet med natt, eller nattens sannhet som senere handles på, som Agamemnons villedende drøm i Iliaden.",
    ],
    relatedLessonNumbers: [191, 192],
  },
};

const conceptsEn: Record<string, { term: string } & ConceptStarter> = {
  "mythical-hybrids": {
    term: "Mythical hybrids",
    slug: "mythical-hybrids",
    definition:
      "Mythical hybrids in Greek lore are beings that mix species — centaurs, satyrs, the Chimera, Scylla — marking broken natural boundaries. When categories blur, myth sends a hero or god to restore order, or in Dionysus's case to bless the blur as sacred release.",
    relatedLessonNumbers: [140],
  },
  "chaos-monsters": {
    term: "Chaos monsters",
    slug: "chaos-monsters",
    definition:
      "Chaos monsters descend from Typhon and Echidna in Hesiod — Cerberus, Hydra, Chimera, Sphinx, and more — as offspring of earth's anger and storm. Heroes defeat them in sequence to affirm Olympian order after cosmic rebellion.",
    relatedLessonNumbers: [145],
  },
  "seasons-myth": {
    term: "The seasons myth",
    slug: "seasons-myth",
    definition:
      "The seasons myth explains winter and spring through Persephone's abduction and divided year: Demeter's grief withers the earth until mother and daughter reunite. Eleusinian Mysteries turned the cycle into hope for initiates facing death.",
    relatedLessonNumbers: [149],
  },
  "death-beliefs-q3": {
    term: "Death beliefs (Q3)",
    slug: "death-beliefs-q3",
    definition:
      "Greek death beliefs in this quarter stress shades in Hades, proper burial, Charon's coin, and rare better realms like Elysium. Mystery cults and hero cult promised a improved lot; remembrance and libations kept the name alive without bodily resurrection.",
    relatedLessonNumbers: [150],
  },
  "sacred-geography": {
    term: "Sacred geography",
    slug: "sacred-geography",
    definition:
      "Sacred geography maps Greece through holy mountains, oracles, and cities tied to gods and heroes — Olympus, Delphi, Crete, Troy, Eleusis. Pilgrimage and festival turned landscape into shared story, not neutral background.",
    relatedLessonNumbers: [155],
  },
  "hope-elpis": {
    term: "Hope (Elpis)",
    slug: "hope-elpis",
    definition:
      "Elpis (Hope) is what remains in Pandora's jar when evils escape — debated as Zeus's consolation or another plague because it keeps mortals enduring uncertainty. The image anchors Western talk of Pandora and human resilience.",
    relatedLessonNumbers: [164],
  },
  "vanity-myth": {
    term: "Vanity in myth",
    slug: "vanity-myth",
    definition:
      "Vanity in mythology is beauty or pride without regard for others — Narcissus's refusals, Helen's launch of ships, Ajax's empty glory. Gods answer with nemesis: the community and cosmos demand shame and regard beyond the self's image.",
    relatedLessonNumbers: [174],
  },
  "dream-symbolism": {
    term: "Dream symbolism",
    slug: "dream-symbolism",
    definition:
      "Dream symbolism in Greek sources treats night visions as divine messages, psychological signs, or deceptions — ivory and horn gates, incubation at sanctuaries, interpreters like Artemidorus. Serpents, water, ladders, and dead kin recur as codes, not literal pictures alone.",
    relatedLessonNumbers: [192],
  },
};

const conceptsNo: Record<string, { term: string } & ConceptStarter> = {
  "mythical-hybrids": {
    term: "Mytiske hybrider",
    slug: "mythical-hybrids",
    definition:
      "Mytiske hybrider i gresk myte blander arter — kentaurer, satyrer, kimæren, Skylla — og markerer bristede naturgrenser. Når kategoriene glipper, sender myten helt eller gud for å gjenopprette orden, eller Dionysos for å hellige blurringen.",
    relatedLessonNumbers: [140],
  },
  "chaos-monsters": {
    term: "Kaosmonstre",
    slug: "chaos-monsters",
    definition:
      "Kaosmonstre stammer fra Tyfon og Echidna hos Hesiod — Kerberos, hydra, kimære, sfinks og flere — som avkom av jordens vrede og storm. Helter beseirer dem i rekke for å bekrefte olympisk orden etter kosmisk opprør.",
    relatedLessonNumbers: [145],
  },
  "seasons-myth": {
    term: "Årstidsmyten",
    slug: "seasons-myth",
    definition:
      "Årstidsmyten forklarer vinter og vår gjennom Persefones bortføring og delt år: Demeters sorg visner jorden til mor og datter gjenforenes. Eleusinske mysterier gjorde syklusen til håp for innviede som møtte døden.",
    relatedLessonNumbers: [149],
  },
  "death-beliefs-q3": {
    term: "Dødstro (Q3)",
    slug: "death-beliefs-q3",
    definition:
      "Gresk dødstro i denne perioden understreker skygger i Hades, riktig begravelse, Charons mynt og sjeldne bedre riker som Elysium. Mysterier og heltekult lovet bedre lodd; minne og libasjoner holdt navnet levende uten oppstandelse av kroppen.",
    relatedLessonNumbers: [150],
  },
  "sacred-geography": {
    term: "Hellig geografi",
    slug: "sacred-geography",
    definition:
      "Hellig geografi kartlegger Hellas gjennom fjell, orakler og byer knyttet til guder og helter — Olympen, Delfi, Kreta, Troja, Eleusis. Pilgrimsreiser og festivaler gjorde landskapet til felles historie, ikke nøytral bakgrunn.",
    relatedLessonNumbers: [155],
  },
  "hope-elpis": {
    term: "Håp (Elpis)",
    slug: "hope-elpis",
    definition:
      "Elpis (håpet) er det som blir i Pandoras krukke når plagene flyr ut — tolket som Zevs' trøst eller ny plage fordi det holder mennesker i uvisshet. Bildet forankrer vestlig tale om Pandora og utholdenhet.",
    relatedLessonNumbers: [164],
  },
  "vanity-myth": {
    term: "Hovmod i myte",
    slug: "vanity-myth",
    definition:
      "Hovmod i myte er skjønnhet eller stolthet uten hensyn til andre — Narkissos' avvisninger, Helens skip, Ajax' tomme ære. Gudene svarer med nemesis: fellesskap og kosmos krever skam og respekt utover selvets speil.",
    relatedLessonNumbers: [174],
  },
  "dream-symbolism": {
    term: "Drømmesymbolikk",
    slug: "dream-symbolism",
    definition:
      "Drømmesymbolikk i greske kilder leser nattens bilder som guddommelige budskap, psykologiske tegn eller lureri — elfenbens- og hornporter, inkubasjon ved helligdommer, tolker som Artemidoros. Slanger, vann, stiger og døde slektninger er koder, ikke bare bokstavelige scener.",
    relatedLessonNumbers: [192],
  },
};

const locationsEn: Record<string, { name: string } & LocationStarter> = {
  troy: {
    name: "Troy",
    slug: "troy",
    myths: ["Trojan War", "Wooden horse", "Priam's city"],
    description: [
      "Troy (Ilion) in myth lies in the Troad near the Hellespont — a city built by divine and royal lines, ruled by Priam when Paris's judgment brought Helen and the Achaean fleet. Ten years of war, Achilles' wrath, Hector's fall, and the wooden horse ended in sack and slaughter.",
      "Homer made Troy the stage of the Iliad and the memory Greeks shared across poleis. Archaeology later sought Hisarlik; for antiquity the place was story-laden soil where heroes, gods, and fate met at the wall.",
    ],
    relatedLessonNumbers: [154],
  },
  eleusis: {
    name: "Eleusis",
    slug: "eleusis",
    myths: ["Eleusinian Mysteries", "Demeter's search", "Initiation rites"],
    description: [
      "Eleusis northwest of Athens is where Demeter sought Persephone and where the great Mysteries promised initiates hope beyond ordinary death. The Telesterion housed secret rites whose content was not written down — only alluded to in art and praise.",
      "Pilgrims walked the Sacred Way from Athens; kings and slaves could be initiated alike. Eleusis ties landscape to the seasons myth: grief, search, and reunion made the plain holy for centuries.",
    ],
    relatedLessonNumbers: [149, 148],
  },
  "strait-of-messina": {
    name: "Strait of Messina",
    slug: "strait-of-messina",
    myths: ["Scylla and Charybdis", "Odysseus's passage", "Lesser loss"],
    description: [
      "The narrow strait between Sicily and the Italian mainland was identified in antiquity with Odysseus's deadly passage between Scylla's cliff and Charybdis's whirlpool. Sailors faced a choice: lose six men to snapping heads or risk the whole ship in the maw.",
      "Myth mapped real navigation fear onto moral drama — Circe's advice, the hero's decision to hug the cliff. The geography became a proverb for choosing the lesser harm when no safe route exists.",
    ],
    relatedLessonNumbers: [134, 135, 127],
  },
  knossos: {
    name: "Knossos",
    slug: "knossos",
    myths: ["Minos's palace", "Labyrinth", "Theseus and the Minotaur"],
    description: [
      "Knossos on Crete is the palace center of King Minos in myth — where Daedalus built the Labyrinth to hold the Minotaur and where Theseus entered with Ariadne's thread. Bronze Age archaeology uncovered vast courts that Greeks read back into legend.",
      "The city links monster, craft, and tribute: Athenian youths sent to the beast, Talos the bronze guardian, Europa's bull. Knossos stands for structured power, maze, and the hero's descent into order and terror alike.",
    ],
    relatedLessonNumbers: [153, 81, 82],
  },
  "mount-parnassus": {
    name: "Mount Parnassus",
    slug: "mount-parnassus",
    myths: ["Delphi's mountain", "Python slain", "Muses' slopes"],
    description: [
      "Mount Parnassus rises above the Gulf of Corinth, crowned by Delphi where Apollo slew Python and took the oracle. Greeks called the shrine the earth's navel (omphalos); the Pythia spoke from its slopes while pilgrims climbed for war, colony, and law.",
      "The mountain also sheltered Corycian cave and poetic tradition placing the Muses nearby. Parnassus names the meeting of prophecy, music, and pan-Hellenic identity — stone and vapor turned into public truth.",
    ],
    relatedLessonNumbers: [152, 48],
  },
  colchis: {
    name: "Colchis",
    slug: "colchis",
    myths: ["Golden Fleece", "Jason's quest", "Aeëtes and Medea"],
    description: [
      "Colchis at the eastern edge of the Greek world — often imagined on the Black Sea — is where Jason and the Argonauts sought the Golden Fleece hung in a sacred grove. King Aeëtes set fire-breathing bulls, dragon's teeth, and an sleepless dragon as barriers.",
      "Medea's magic let Jason win and flee, betraying her father. Colchis expands the map of adventure beyond a single polis: foreign king, witch-priestess, and the price of heroic ambition when oaths break homeward.",
    ],
    relatedLessonNumbers: [87, 88],
  },
};

const locationsNo: Record<string, { name: string } & LocationStarter> = {
  troy: {
    name: "Troja",
    slug: "troy",
    myths: ["Trojakrigen", "Trojansk hest", "Priams by"],
    description: [
      "Troja (Ilion) ligger i myten i Troas ved Hellespont — byen Priam regjerte da Paris' dom hentet Helen og akhaernes flåte. Ti års krig, Akilles' vrede, Hektors fall og trehesten endte i plyndring og sorg.",
      "Homer gjorde Troja til Iliadens scene og felles minne i Hellas. Arkeologi søkte senere Hisarlik; for antikken var stedet historiebelagt jord der helter, guder og skjebne møttes ved muren.",
    ],
    relatedLessonNumbers: [154],
  },
  eleusis: {
    name: "Eleusis",
    slug: "eleusis",
    myths: ["Eleusinske mysterier", "Demeters søken", "Innvielsesritualer"],
    description: [
      "Eleusis nordvest for Athen er der Demeter søkte Persefone og de store mysteriene lovet innviede håp utover vanlig død. Telesterion huset hemmelige riter som ikke ble skrevet ned — bare antydet i kunst og lovprisning.",
      "Pilegrimene gikk den hellige vei fra Athen; konger og slaver kunne innvies. Eleusis knytter landskap til årstidsmyten: sorg, søken og gjenforening gjorde sletten hellig i århundrer.",
    ],
    relatedLessonNumbers: [149, 148],
  },
  "strait-of-messina": {
    name: "Messinstredet",
    slug: "strait-of-messina",
    myths: ["Skylla og Kharybdis", "Odyssevs' farvann", "Det minste tapet"],
    description: [
      "Det smale sundet mellom Sicilia og det italienske fastlandet ble i antikken knyttet til Odyssevs' farlige passasje mellom Skyllas klippe og Kharybdis' virvel. Sjøfolk måtte velge: miste seks menn til gapende hoder eller risikere hele skipet.",
      "Myten kartla virkelig navigasjonsfrykt som moralsk drama — Kirkes råd, helten som klamret seg til klippen. Geografien ble et ordtak for å velge det minste onde når ingen trygg rute finnes.",
    ],
    relatedLessonNumbers: [134, 135, 127],
  },
  knossos: {
    name: "Knossos",
    slug: "knossos",
    myths: ["Minos' palass", "Labyrinten", "Theseus og minotauros"],
    description: [
      "Knossos på Kreta er kong Minos' palssenter i myten — der Daidalos bygde labyrinten for minotauros og Theseus gikk inn med Ariadnes tråd. Bronsealderens utgravninger ga store gårdsplasser grekerne leste tilbake i legenden.",
      "Byen binder monster, håndverk og tributt: athenske ungdommer til beistet, Talos, Europas okse. Knossos står for strukturert makt, labyrint og helten som går ned i orden og skrekk.",
    ],
    relatedLessonNumbers: [153, 81, 82],
  },
  "mount-parnassus": {
    name: "Parnassos",
    slug: "mount-parnassus",
    myths: ["Delfis fjell", "Python drept", "Musenes skråninger"],
    description: [
      "Parnassos ruver over Korintbukta, kronet av Delfi der Apollon drepte Python og tok orakelet. Grekerne kalte helligdommen jordens navle (omphalos); Pythia talte fra skråningene mens pilegrimene kom for krig, koloni og lov.",
      "Fjellet skjulte også Corycian-hulen og tradisjonen om musene i nærheten. Parnassos navngir møtet mellom spådom, musikk og panhellensk identitet — stein og damp gjort til offentlig sannhet.",
    ],
    relatedLessonNumbers: [152, 48],
  },
  colchis: {
    name: "Kolchis",
    slug: "colchis",
    myths: ["Det gylne skinnet", "Jasons tokt", "Aietes og Medea"],
    description: [
      "Kolchis ved verdens østre kant — ofte ved Svartehavet — er der Jason og argonautene søkte det gylne skinnet i en hellig lund. Kong Aietes satte ildpustende okser, draktann og en våken drage som hindringer.",
      "Medeas magi lot Jason vinne og flykte og forrådte faren. Kolchis utvider eventyrkartet: fremmed konge, prestinne-heks og prisen for heroisk ambisjon når løfter brytes hjemover.",
    ],
    relatedLessonNumbers: [87, 88],
  },
};

export const exploreQuarter3 = {
  characterSlugs: Object.keys(charactersEn),
  charactersEn,
  charactersNo,
  conceptSlugs: Object.keys(conceptsEn),
  conceptsEn,
  conceptsNo,
  locationSlugs: Object.keys(locationsEn),
  locationsEn,
  locationsNo,
};

export const exploreQuarter3Patches = {
  character: {
    hades: [146, 147],
    persephone: { parentSlugs: ["hades"] },
  },
  location: {
    olympus: [151],
    delphi: [152],
    crete: [153],
    underworld: [146, 147, 148, 150],
  },
} as const;
