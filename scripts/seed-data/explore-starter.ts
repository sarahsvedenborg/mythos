/** Explore starter content — 12 gods, 8 concepts, 6 places (lessons 1–65). */

export type CharacterStarter = {
  slug: string;
  type: "god";
  symbols: string[];
  description: string[];
  relatedLessonNumbers: number[];
  parentSlugs?: string[];
  childSlugs?: string[];
};

export type ConceptStarter = {
  slug: string;
  definition: string;
  relatedLessonNumbers: number[];
};

export type LocationStarter = {
  slug: string;
  myths: string[];
  description: string[];
  relatedLessonNumbers: number[];
};

const charactersEn: Record<string, Omit<CharacterStarter, "slug"> & { name: string }> = {
  zeus: {
    name: "Zeus",
    type: "god",
    symbols: ["thunderbolt", "eagle", "oak"],
    description: [
      "Zeus is king of the Olympian gods and ruler of the sky, weather, and justice. After leading the gods to victory in the Titanomachy, he took the throne on Mount Olympus and became the final authority in the Greek pantheon.",
      "Myths show him as powerful and strategic, but also prone to jealousy and transformation. His thunderbolt, forged by the Cyclopes, marks his supremacy over Titans and mortals alike.",
    ],
    relatedLessonNumbers: [21, 36, 41],
    childSlugs: ["athena", "apollo", "artemis", "ares", "hermes", "hephaestus"],
  },
  hera: {
    name: "Hera",
    type: "god",
    symbols: ["peacock", "crown", "pomegranate"],
    description: [
      "Hera is queen of the gods, goddess of marriage, women, and family. As Zeus's wife and sister, she presides over lawful union — yet myth often stresses her fierce jealousy toward Zeus's lovers and their children.",
      "She protects married women and punishes those who break oaths of marriage. Temples across Greece honored her as a patron of civic order and adulthood rites.",
    ],
    relatedLessonNumbers: [22, 41, 45],
  },
  poseidon: {
    name: "Poseidon",
    type: "god",
    symbols: ["trident", "horse", "bull"],
    description: [
      "Poseidon rules the sea, earthquakes, and horses. Brother of Zeus and Hades, he received the oceans when the cosmos was divided after the Titanomachy.",
      "Sailors and coastal cities prayed to him before voyages. His trident can stir storms or split the earth — and myths remember his rivalry with Athena over Athens.",
    ],
    relatedLessonNumbers: [23, 37, 42],
  },
  hades: {
    name: "Hades",
    type: "god",
    symbols: ["helm of darkness", "bident", "cerberus"],
    description: [
      "Hades is lord of the underworld and the dead — not a god of evil, but of the inevitable realm beneath the earth. His name was often avoided; Greeks spoke of Plouton, 'the wealthy one,' for the minerals below.",
      "He rarely leaves his domain. Persephone, the Furies, and Charon serve his order. Mortals who receive proper burial rites find a structured path into his kingdom.",
    ],
    relatedLessonNumbers: [24, 56, 58, 59],
  },
  demeter: {
    name: "Demeter",
    type: "god",
    symbols: ["sheaf of wheat", "torch", "poppy"],
    description: [
      "Demeter is goddess of grain, agriculture, and the fertility of the earth. Her grief when Persephone is taken to the underworld explains the seasons in one of Greece's most important mystery cults.",
      "Eleusinian Mysteries celebrated her power over life and death in the fields. She teaches that human survival depends on respecting the cycles of planting and harvest.",
    ],
    relatedLessonNumbers: [26],
  },
  athena: {
    name: "Athena",
    type: "god",
    symbols: ["owl", "olive tree", "aegis"],
    description: [
      "Athena is goddess of wisdom, strategic warfare, crafts, and cities. Born from Zeus's head fully armed, she embodies intelligence applied to action — not reckless battle lust.",
      "She favors heroes such as Odysseus and Perseus, and her contest with Poseidon for Athens gave the city the olive tree. The Parthenon rose in her honor.",
    ],
    relatedLessonNumbers: [28, 38, 42],
    parentSlugs: ["zeus"],
  },
  apollo: {
    name: "Apollo",
    type: "god",
    symbols: ["lyre", "bow", "laurel"],
    description: [
      "Apollo brings light, music, prophecy, and healing. Twin of Artemis, he oversees Delphi's oracle and the Muses' arts. He can strike plague or cure it with equal authority.",
      "As a god of measure and truth, he punishes excess — hubris before the gods often meets Apollo's bow or his oracle's grim clarity.",
    ],
    relatedLessonNumbers: [29, 43, 48],
    parentSlugs: ["zeus"],
  },
  artemis: {
    name: "Artemis",
    type: "god",
    symbols: ["bow", "deer", "crescent moon"],
    description: [
      "Artemis protects the wilderness, young women, and hunters. Virgin goddess of the moon's track, she moves through forests with her nymphs and punishes those who threaten them.",
      "Twin of Apollo, she embodies independence and natural law. Myths of Actaeon and Orion show her lethal boundary-keeping.",
    ],
    relatedLessonNumbers: [30, 43],
    parentSlugs: ["zeus"],
  },
  ares: {
    name: "Ares",
    type: "god",
    symbols: ["spear", "helmet", "vulture"],
    description: [
      "Ares is the god of war's violence — blood, chaos, and the frenzy of battle. Unlike Athena's disciplined strategy, Ares represents the raw terror of combat.",
      "Greeks honored him less warmly than Athena; Homer shows him wounded on the battlefield, a reminder that war serves no one unconditionally.",
    ],
    relatedLessonNumbers: [31],
    parentSlugs: ["zeus", "hera"],
  },
  aphrodite: {
    name: "Aphrodite",
    type: "god",
    symbols: ["dove", "rose", "shell"],
    description: [
      "Aphrodite is goddess of love, beauty, and desire. Born from sea foam or honored as Zeus's daughter in other traditions, she shapes unions divine and mortal.",
      "Her marriage to Hephaestus and affair with Ares fuel comic and tragic stories alike. She launches the Trojan War's cause through Paris's judgment.",
    ],
    relatedLessonNumbers: [32, 44],
  },
  hermes: {
    name: "Hermes",
    type: "god",
    symbols: ["caduceus", "winged sandals", "traveler's cap"],
    description: [
      "Hermes is messenger of the gods, guide of souls, and patron of travelers, merchants, and thieves. Quick-witted and eloquent, he moves between Olympus, earth, and the underworld.",
      "He invented the lyre, guarded herds, and escorted Persephone from Hades. His caduceus and sandals became enduring symbols of mediation and passage.",
    ],
    relatedLessonNumbers: [33],
    parentSlugs: ["zeus"],
  },
  hephaestus: {
    name: "Hephaestus",
    type: "god",
    symbols: ["hammer", "anvil", "forge"],
    description: [
      "Hephaestus is god of fire, metalwork, and craftsmen. Cast from Olympus for his lameness — or self-reliant despite it — he forges divine weapons in his volcanic workshop.",
      "The Cyclopes work under his direction; he built automatons and golden thrones. His skill balances raw force with patient craft.",
    ],
    relatedLessonNumbers: [34, 44],
    parentSlugs: ["zeus"],
  },
};

const charactersNo: Record<string, Omit<CharacterStarter, "slug"> & { name: string }> = {
  zeus: {
    name: "Zevs",
    type: "god",
    symbols: ["lyn", "ørn", "eik"],
    description: [
      "Zevs er konge over de olympiske guder og hersker over himmel, vær og rettferdighet. Etter å ha ledet gudene til seier i titanomachia, tok han tronen på Olympen.",
      "Mytene viser ham som mektig og strategisk, men også sjalu. Lynet fra kyklopene markerer hans overlegenhet over titaner og mennesker.",
    ],
    relatedLessonNumbers: [21, 36, 41],
    childSlugs: ["athena", "apollo", "artemis", "ares", "hermes", "hephaestus"],
  },
  hera: {
    name: "Hera",
    type: "god",
    symbols: ["påfugl", "krone", "granateple"],
    description: [
      "Hera er gudinnen for ekteskap, kvinner og familie — dronning blant gudene. Som Zevs' hustru beskytter hun lovlige bånd, men mytene fremhever også hennes vrede mot hans elskerinner.",
      "Hun straffer dem som bryter ekteskapelige løfter og ble dyrket i templer over hele Hellas.",
    ],
    relatedLessonNumbers: [22, 41, 45],
  },
  poseidon: {
    name: "Poseidon",
    type: "god",
    symbols: ["trefork", "hest", "okse"],
    description: [
      "Poseidon hersker over havet, jordskjelv og hester. Som Zevs' bror fikk han havene da kosmos ble delt etter titanomachia.",
      "Sjøfolk og kystbyer ba til ham før reiser. Treforken kan røre stormer — og myten husker rivaliseringen med Athene om Athen.",
    ],
    relatedLessonNumbers: [23, 37, 42],
  },
  hades: {
    name: "Hades",
    type: "god",
    symbols: ["mørk hjelm", "bispenn", "kerberos"],
    description: [
      "Hades er herre over underverdenen og de døde — ikke ondskap, men det uunngåelige riket under jorden. Navnet ble ofte unngått; grekerne sa Plouton, «den rike».",
      "Han forlater sjelden sitt rike. Persefone, Erinnyene og Charon holder orden. Riktig begravelse åpner veien dit.",
    ],
    relatedLessonNumbers: [24, 56, 58, 59],
  },
  demeter: {
    name: "Demeter",
    type: "god",
    symbols: ["aks", "fakkel", "valmue"],
    description: [
      "Demeter er gudinnen for korn, jordbruk og jordens fruktbarhet. Sorgen når Persefone tas til underverdenen forklarer årstidene i eleusinske mysterier.",
      "Hun lærer at menneskelig liv følger såing og høst — respekt for jordens syklus.",
    ],
    relatedLessonNumbers: [26],
  },
  athena: {
    name: "Athene",
    type: "god",
    symbols: ["ugle", "oliventre", "aegis"],
    description: [
      "Athene er gudinnen for visdom, strategisk krigføring, håndverk og byer. Født fra Zevs' hode, fullt bevæpnet, står hun for intelligens i handling.",
      "Hun hjelper helter som Odyssevs og Persevs, og ga Athen oliventreet. Parthenon reiste seg til hennes ære.",
    ],
    relatedLessonNumbers: [28, 38, 42],
    parentSlugs: ["zeus"],
  },
  apollo: {
    name: "Apollon",
    type: "god",
    symbols: ["lyre", "bue", "laurbær"],
    description: [
      "Apollon bringer lys, musikk, spådom og healing. Tvilling til Artemis; han vokter Delfi og musenes kunster. Han kan sende pest eller helbrede.",
      "Som gud for mål og sannhet straffer han overmot — hybris møter ofte hans bue eller orakelets harde svar.",
    ],
    relatedLessonNumbers: [29, 43, 48],
    parentSlugs: ["zeus"],
  },
  artemis: {
    name: "Artemis",
    type: "god",
    symbols: ["bue", "hjort", "månesigd"],
    description: [
      "Artemis beskytter villmark, unge kvinner og jegere. Jomfrugudinne som beveger seg med nymfene og straffer dem som truer dem.",
      "Tvilling til Apollon; myter om Aktaion og Orion viser hennes grenser.",
    ],
    relatedLessonNumbers: [30, 43],
    parentSlugs: ["zeus"],
  },
  ares: {
    name: "Ares",
    type: "god",
    symbols: ["spyd", "hjelm", "gribb"],
    description: [
      "Ares er krigens vold — blod, kaos og kampens raseri. I motsetning til Athenes strategi står han for rå terror på slagmarken.",
      "Grekerne æret ham mindre varmt; Homer viser ham såret, en påminnelse om at krig tjener ingen ubetinget.",
    ],
    relatedLessonNumbers: [31],
    parentSlugs: ["zeus", "hera"],
  },
  aphrodite: {
    name: "Afrodite",
    type: "god",
    symbols: ["due", "rose", "skjell"],
    description: [
      "Afrodite er gudinnen for kjærlighet, skjønnhet og begjær. Hun former bånd mellom guder og mennesker.",
      "Ekteskapet med Hephaistos og affæren med Ares gir både komiske og tragiske myter. Paris' dom starter trojakrigen.",
    ],
    relatedLessonNumbers: [32, 44],
  },
  hermes: {
    name: "Hermes",
    type: "god",
    symbols: ["kaduceus", "vingesandaler", "reisecaps"],
    description: [
      "Hermes er gudenes budbringer, sjelenes v guide og beskytter av reisende, kjøpmenn og tyver. Han beveger seg mellom Olympen, jorden og underverdenen.",
      "Han oppfant lyren og eskorterte Persefone fra Hades. Kaduceus og sandaler ble varige symboler på formidling.",
    ],
    relatedLessonNumbers: [33],
    parentSlugs: ["zeus"],
  },
  hephaestus: {
    name: "Hephaistos",
    type: "god",
    symbols: ["hammer", "ambolt", "eske"],
    description: [
      "Hephaistos er gud for ild, metallarbeid og håndverk. Kastet fra Olympen for sin halthet — eller stolt til tross — smeder han i sitt vulkanske verksted.",
      "Kyklopene arbeider for ham; han bygde automater og gylne troner. Ferdighet balanserer rå makt.",
    ],
    relatedLessonNumbers: [34, 44],
    parentSlugs: ["zeus"],
  },
};

const conceptsEn: Record<string, { term: string } & ConceptStarter> = {
  hubris: {
    term: "Hubris",
    slug: "hubris",
    definition:
      "Hubris is dangerous overconfidence — mortals or gods claiming honor, power, or knowledge beyond their rightful place. Greek myth treats it as a moral fault that invites divine correction (nemesis).",
    relatedLessonNumbers: [50],
  },
  prophecy: {
    term: "Prophecy and fear",
    slug: "prophecy-and-fear",
    definition:
      "Prophecy in Greek myth is often unavoidable yet feared: oracles speak truth, and rulers try to outrun fate — usually failing. Fear of what is foretold drives Cronus, Oedipus, and Achilles alike.",
    relatedLessonNumbers: [15],
  },
  "thread-of-life": {
    term: "The thread of life",
    slug: "thread-of-life",
    definition:
      "The Moirai spin, measure, and cut each mortal's thread — a metaphor for lifespan and destiny. The image ties fate to craft: life has length, texture, and an end no hero can refuse forever.",
    relatedLessonNumbers: [54],
  },
  "destiny-vs-free-will": {
    term: "Destiny vs free will",
    slug: "destiny-vs-free-will",
    definition:
      "Greek tragedy holds fate and choice together: characters act freely, yet oracles and the gods set boundaries. The tension defines heroes who fight the inevitable.",
    relatedLessonNumbers: [55],
  },
  sacrifice: {
    term: "Sacrifice rituals",
    slug: "sacrifice-rituals",
    definition:
      "Sacrifice (thysia) fed the gods smoke and share while binding community. Greeks offered animals, libations, and first fruits to maintain reciprocity (charis) between mortals and divinities.",
    relatedLessonNumbers: [46],
  },
  oracles: {
    term: "Oracles",
    slug: "oracles",
    definition:
      "Oracles are divine answers — often ambiguous — sought at sanctuaries like Delphi. They guided state decisions and personal crises; misunderstanding them is a recurring tragic theme.",
    relatedLessonNumbers: [48],
  },
  "divine-jealousy": {
    term: "Divine jealousy",
    slug: "divine-jealousy",
    definition:
      "Olympian jealousy shapes myth: Hera punishes Zeus's lovers, Athena rivals Poseidon, gods resent mortal fame. Jealousy enforces hierarchy and warns against competing with the divine.",
    relatedLessonNumbers: [45],
  },
  "judgment-after-death": {
    term: "Judgment after death",
    slug: "judgment-after-death",
    definition:
      "Greeks imagined souls judged or sorted after death — to Elysium, ordinary Hades, or punishment. Burial rites and moral reputation prepared the dead for Charon's crossing and the underworld's courts.",
    relatedLessonNumbers: [60],
  },
};

const conceptsNo: Record<string, { term: string } & ConceptStarter> = {
  hubris: {
    term: "Hybris",
    slug: "hubris",
    definition:
      "Hybris er farlig overmot — mennesker eller guder som tar ære, makt eller kunnskap utover sin plass. Gresk myte ser det som moralsk feil som inviterer guddommelig korreksjon (nemesis).",
    relatedLessonNumbers: [50],
  },
  prophecy: {
    term: "Profeti og frykt",
    slug: "prophecy-and-fear",
    definition:
      "Profeti i gresk myte er ofte uunngåelig, men fryktet: orakler sier sannheten, og herskere prøver å flykte fra skjebnen — og mislykkes. Frykten driver Kronos, Ødipus og Akilles.",
    relatedLessonNumbers: [15],
  },
  "thread-of-life": {
    term: "Livstråden",
    slug: "thread-of-life",
    definition:
      "Moirai spinner, måler og klipper hver dødeliges tråd — et bilde på livslengde og skjebne. Livet har lengde, tekstur og en ende ingen helt kan utsette for alltid.",
    relatedLessonNumbers: [54],
  },
  "destiny-vs-free-will": {
    term: "Skjebne mot fri vilje",
    slug: "destiny-vs-free-will",
    definition:
      "Gresk tragedie holder skjebne og valg sammen: skikkelser handler fritt, men orakler og guder setter grenser. Spenningen definerer helter som kjemper mot det uunngåelige.",
    relatedLessonNumbers: [55],
  },
  sacrifice: {
    term: "Offerritualer",
    slug: "sacrifice-rituals",
    definition:
      "Offer (thysia) ga gudene røyk og andel mens det bandt samfunnet. Grekere ofret dyr, libasjoner og førstegrøde for gjensidighet (charis) mellom mennesker og guder.",
    relatedLessonNumbers: [46],
  },
  oracles: {
    term: "Orakler",
    slug: "oracles",
    definition:
      "Orakler er guddommelige svar — ofte tvetydige — søkt ved helligdommer som Delfi. De styrte staters beslutninger; å misforstå dem er et gjentakende tragisk tema.",
    relatedLessonNumbers: [48],
  },
  "divine-jealousy": {
    term: "Guddommelig sjalusi",
    slug: "divine-jealousy",
    definition:
      "Olympisk sjalusi former myter: Hera straffer Zevs' elskerinner, Athene rivaliserer med Poseidon. Sjalusi opprettholder hierarki og advarer mot å konkurrere med det guddommelige.",
    relatedLessonNumbers: [45],
  },
  "judgment-after-death": {
    term: "Dom etter døden",
    slug: "judgment-after-death",
    definition:
      "Grekerne så for seg sjeler dømt eller sortert — til Elysium, vanlig Hades eller straff. Begravelsesritualer og rykte forberedte de døde for Charons ferje.",
    relatedLessonNumbers: [60],
  },
};

const locationsEn: Record<string, { name: string } & LocationStarter> = {
  olympus: {
    name: "Mount Olympus",
    slug: "mount-olympus",
    myths: ["Home of the Olympian gods", "Zeus's throne"],
    description: [
      "Mount Olympus in Thessaly was imagined as the gods' celestial home — above the clouds, unreachable by ordinary mortals. It is not Hades below, but the seat of Zeus and the Olympian court.",
      "Pilgrims and poets pointed to the peak as symbolic; worship happened at foothill sanctuaries. Olympus names the order that replaced Titan rule.",
    ],
    relatedLessonNumbers: [13, 61],
  },
  delphi: {
    name: "Delphi",
    slug: "delphi",
    myths: ["Oracle of Apollo", "Center of the world (omphalos)"],
    description: [
      "Delphi on Mount Parnassus housed Apollo's oracle, where the Pythia spoke riddling prophecy. Greeks considered it the earth's navel — a pan-Hellenic meeting point for questions of war, colony, and law.",
      "The sanctuary grew rich with treasuries from city-states. 'Know thyself' and 'nothing in excess' were inscribed as wisdom for visitors.",
    ],
    relatedLessonNumbers: [49, 48],
  },
  elysium: {
    name: "Elysium",
    slug: "elysium",
    myths: ["Blessed afterlife for heroes", "Islands of the blessed"],
    description: [
      "Elysium (or the Elysian Fields) is the pleasant realm reserved for exceptional souls — heroes, initiates, or those favored by the gods. Homer places it at the world's edge, free of toil.",
      "It contrasts with gray Hades and punitive Tartarus. Hope for a noble afterlife shaped Greek ideas of virtue and fame.",
    ],
    relatedLessonNumbers: [59, 60],
  },
  underworld: {
    name: "The Underworld",
    slug: "the-underworld",
    myths: ["Realm of Hades", "Crossing the Styx"],
    description: [
      "The Greek underworld is Hades' kingdom — not Christian hell, but the collective dwelling of the dead. Souls travel with Charon's ferry; Cerberus guards the gates.",
      "Heroes descend in living quests (Orpheus, Heracles). Proper burial and funeral rites were essential to arrive with honor.",
    ],
    relatedLessonNumbers: [24, 56, 57, 58],
  },
  tartarus: {
    name: "Tartarus",
    slug: "tartarus",
    myths: ["Prison of the Titans", "Deep pit below Hades"],
    description: [
      "Tartarus is the deepest abyss — originally a primordial region, later the jail for defeated Titans and punishments for mortal offenders like Sisyphus and Tantalus.",
      "Distance from earth to Tartarus was mythically immeasurable. It expresses cosmic layering: sky, earth, Hades, then pit.",
    ],
    relatedLessonNumbers: [1, 16, 20],
  },
  crete: {
    name: "Crete",
    slug: "crete",
    myths: ["Birthplace of Zeus (Dikte cave)", "Minos and the Minotaur"],
    description: [
      "Crete in myth is a cradle of kings and monsters: Zeus hidden in caves, Minos ruling with Poseidon's bull, the Labyrinth holding the Minotaur. The Curetes clashed shields to hide the infant god's cries.",
      "Archaeology later linked Knossos to labyrinth legends. Crete bridges divine childhood and heroic age.",
    ],
    relatedLessonNumbers: [11, 14],
  },
};

const locationsNo: Record<string, { name: string } & LocationStarter> = {
  olympus: {
    name: "Olympen",
    slug: "mount-olympus",
    myths: ["Olympiske guders hjem", "Zevs' trone"],
    description: [
      "Olympen i Thessalia var gudenes himmelske hjem — over skyene, u nåelig for vanlige mennesker. Det er ikke Hades under, men Zevs' hoff.",
      "Pilgrimene og poetene pekte på toppen som symbol; dyrking skjedde ved helligdommer i foten.",
    ],
    relatedLessonNumbers: [13, 61],
  },
  delphi: {
    name: "Delfi",
    slug: "delphi",
    myths: ["Apollons orakel", "Verdens navle (omphalos)"],
    description: [
      "Delfi ved Parnassos huset Apollons orakel, der Pythia talte gåtefulle profetier. Grekere så det som jordens navle — et panhellensk møtepunkt for krig, koloni og lov.",
      "«Kjenn deg selv» og «ingenting i overflod» sto inngravert som visdom.",
    ],
    relatedLessonNumbers: [49, 48],
  },
  elysium: {
    name: "Elysium",
    slug: "elysium",
    myths: ["Salig liv etter døden", "De saliges øyer"],
    description: [
      "Elysium er riket for usedvanlige sjeler — helter, innviede eller gudenes favoritter. Homer plasserer det ved verdens ende, uten slit.",
      "Det står i kontrast til grå Hades og straffende Tartaros.",
    ],
    relatedLessonNumbers: [59, 60],
  },
  underworld: {
    name: "Underverdenen",
    slug: "the-underworld",
    myths: ["Hades' rike", "Over Styx"],
    description: [
      "Den greske underverdenen er Hades' kongerike — alle de dødes samlede bolig. Sjelene ferjes med Charon; Kerberos vokter porten.",
      "Helter reiser ned levende (Orfeus, Herakles). Riktig begravelse var avgjørende.",
    ],
    relatedLessonNumbers: [24, 56, 57, 58],
  },
  tartarus: {
    name: "Tartaros",
    slug: "tartarus",
    myths: ["Titanenes fengsel", "Avgrunn under Hades"],
    description: [
      "Tartaros er den dypeste avgrunnen — opprinnelig et urkraftig rom, senere fengsel for beseirede titaner og straff for Sisyphos og Tantalos.",
      "Avstanden fra jord til Tartaros var uendelig i myten. Det uttrykker kosmisk lagdeling.",
    ],
    relatedLessonNumbers: [1, 16, 20],
  },
  crete: {
    name: "Kreta",
    slug: "crete",
    myths: ["Zevs' fødested (Dikte-hulen)", "Minos og minotauros"],
    description: [
      "Kreta er vuggen for konger og monstre: Zevs skjult i huler, Minos med Poseidons okse, labyrinten med minotauros. Kuretene slo skjold for å skjule babygudens gråt.",
      "Knossos knyttes til labyrint-legenden. Kreta binder guddommelig barndom og heroisk tid.",
    ],
    relatedLessonNumbers: [11, 14],
  },
};

export const exploreStarter = {
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
