/**
 * Seeds Week 1 lessons (1–5) in Norwegian (Bokmål).
 * Run: npm run seed:week1:no
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */
import { createClient } from "@sanity/client";
import { getUnlockDateForLesson } from "../src/lib/lessons";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const token = process.env.SANITY_API_WRITE_TOKEN;
const locale = "no";

if (!token) {
  console.error("Set SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-05-22",
  token,
  useCdn: false,
});

function block(text: string) {
  return {
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", text, marks: [] }],
  };
}

const week1No = [
  {
    lessonNumber: 1,
    week: 1,
    day: 1,
    lessonType: "character",
    category: "cosmos",
    title: "Kaos — begynnelsen på alt",
    slug: "kaos-begynnelsen",
    shortHook:
      "Før guder, titaner og mennesker fantes bare Kaos — det enorme, formløse utgangspunktet for det greske kosmos.",
    content: [
      block(
        "Gresk skapelse begynner ikke med en håndverkergud som former verden ut av ingenting. Den begynner med Kaos: et gapende tomrom, en urtidig blanding, den første tilstanden av eksistens. Fra Kaos kom Gaia (Jorden), Tartaros (det dype avgrunnen), Eros (begjær), Erebus (mørket) og Nyx (natten)."
      ),
      block(
        "Kaos er ikke ondt i moderne forstand. Det er potensial — uformet, grenseløst og eldre enn orden. Hver senere dynasti av guder, titaner og helter vil vokse fram av det Kaos gjorde mulig."
      ),
    ],
    whyItMatters:
      "Å forstå Kaos hjelper deg å lese gresk myte som en fortelling om orden som vokser fram av det formless — et tema som gjentas når sivilisasjon erstatter villmark.",
    takeaway:
      "Kaos er ikke ødeleggelse; det er den tomme scenen der hele den mytologiske verden vil tre fram.",
    pronunciation: "KAY-os",
    tags: ["skapelse", "kosmos", "urtid"],
  },
  {
    lessonNumber: 2,
    week: 1,
    day: 2,
    lessonType: "story",
    category: "cosmos",
    title: "Gaia og Uranus",
    slug: "gaia-og-uranus",
    shortHook:
      "Jord og Himmel blir det første guddommelige paret — og barna deres vil forandre alt.",
    content: [
      block(
        "Gaia, født fra Kaos, er selve Jorden: fjell, jord, den levende grunnen. Uranus er Himmelen, hennes like og partner. Sammen får de de første generasjonene av guddommelige vesener, inkludert de tolv titanene."
      ),
      block(
        "Unionen deres er både skapende og konfliktfylt. Uranus gjemmer noen av barna inne i Gaia, av frykt for deres makt. Dette sviket legger grunnlaget for det første store opprøret i myten — og mønsteret av sønner som styrter fedre."
      ),
    ],
    whyItMatters:
      "Gaia og Uranus etablerer Jord og Himmel som foreldre til alle senere makter — et kosmisk slektstre med røtter i den fysiske verden.",
    takeaway:
      "Ekteskapet mellom Jord og Himmel innleder mytens lange historie om makt, frykt og maktovertakelse.",
    pronunciation: "GUY-ah · yoo-RAY-nus",
    tags: ["skapelse", "titaner", "gaia"],
  },
  {
    lessonNumber: 3,
    week: 1,
    day: 3,
    lessonType: "concept",
    category: "cosmos",
    title: "Hva titaner er",
    slug: "hva-er-titaner",
    shortHook:
      "Titaner er ikke bare «store guder» — de er en eldre guddommelig generasjon mellom urkreftene og olympierne.",
    content: [
      block(
        "Titanene er barna av Gaia og Uranus: mektige, eldgamle guder som hersket før Zevs og olympierne. Navn som Kronos, Rhea, Okeanos og Hyperion hører til denne epoken."
      ),
      block(
        "I gresk tanke representerer titanenes tid en eldre orden — nærmere naturens rå krefter enn de polerte bygudene på Olympen. Når olympierne vinner i titanomachien, dramatiserer myten seieren til et nyere kosmisk regime."
      ),
    ],
    whyItMatters:
      "Å vite hvem som regnes som titaner gjør det lettere å lese myter om Kronos, Prometheus eller Atlas.",
    takeaway:
      "Titaner er guddomsgenerasjonen mellom det urtidige Kaos og de kjente olympiske gudene.",
    tags: ["titaner", "kosmos", "ordforråd"],
  },
  {
    lessonNumber: 4,
    week: 1,
    day: 4,
    lessonType: "entity",
    category: "cosmos",
    title: "Tartaros og underverdenen",
    slug: "tartaros-og-underverdenen",
    shortHook:
      "Ikke alle «underverdener» er like — Tartaros er det dypeste fengselet; Hades' rike er dit de fleste sjeler går.",
    content: [
      block(
        "Tartaros begynte som en urtidig avgrunn — et sted like gammelt som Gaia, dypere enn den levende jorden. Senere myter bruker det som fengsel for beseirede monstre og guddommer i opprør, inkludert titanene etter deres fall."
      ),
      block(
        "Underverdenen som Hades hersker over er en egen idé: de dødes generelle rike, krysset av elver som Styx og voktet av Kerberos. Tenk på Tartaros som maksimal dybde; underverdenen som den vanlige etterlivet."
      ),
    ],
    whyItMatters:
      "Heltereiser, straffer og monsterforvisninger avhenger ofte av hvilket «under» en myte mener.",
    takeaway:
      "Tartaros er det dypeste hullet; underverdenen er dit vanlige sjeler reiser etter døden.",
    tags: ["underverden", "tartaros", "hades"],
  },
  {
    lessonNumber: 5,
    week: 1,
    day: 5,
    lessonType: "theme",
    category: "cosmos",
    title: "Skjebne i gresk mytologi",
    slug: "skjebne-i-gresk-mytologi",
    shortHook:
      "Selv Zevs kan ikke bare ignorere skjebnen — men hva «skjebne» betyr i gresk myte er rikere enn bare forutbestemmelse.",
    content: [
      block(
        "Grekere forestilte seg skjebne (Moira, eller Moirai — Klotho, Lakhesis og Atropos) som kraften som spinner, måler og klipper livstråden. Profetier i myter uttrykker ofte det skjebnen allerede har vevd."
      ),
      block(
        "Dette utsletter ikke valg: helter handler fortsatt, gjør opprør og angrer. Tragedien lever i spenningen mellom menneskelige beslutninger og det som ikke kan unngås — som Ødipus og Akilles senere vil vise."
      ),
    ],
    whyItMatters:
      "Skjebne er ryggraden i gresk tragedie og forklarer hvorfor profetier i myter så ofte går i oppfyllelse på uventede måter.",
    takeaway:
      "Skjebne i gresk myte er grensen selv gudene respekterer — mønsteret helter utfordrer på egen risiko.",
    pronunciation: "MOY-rye",
    tags: ["skjebne", "moirai", "temaer"],
  },
];

async function seed() {
  for (const lesson of week1No) {
    const unlockDate = getUnlockDateForLesson(lesson.lessonNumber).toISOString();
    const doc = {
      _type: "lesson",
      locale,
      ...lesson,
      slug: { _type: "slug", current: lesson.slug },
      estimatedReadMinutes: 3,
      unlockDate,
      publishedAt: unlockDate,
    };

    const existing = await client.fetch<string | null>(
      `*[_type == "lesson" && lessonNumber == $n && locale == $locale][0]._id`,
      { n: lesson.lessonNumber, locale }
    );

    if (existing) {
      await client.patch(existing).set(doc).commit();
      console.log(`Updated [no] lesson ${lesson.lessonNumber}: ${lesson.title}`);
    } else {
      const created = await client.create(doc);
      console.log(`Created [no] lesson ${lesson.lessonNumber}: ${lesson.title} (${created._id})`);
    }
  }
  console.log("Week 1 Norwegian seed complete. Publish drafts in Studio if needed.");
}

seed().catch(console.error);
