import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { client } from "@/sanity/lib/client";
import { CHARACTERS_QUERY } from "@/sanity/lib/queries";
import type { CharacterSummary } from "@/types/lesson";

const TYPE_MAP: Record<string, { filter: string; title: string }> = {
  gods: { filter: "god", title: "Gods" },
  heroes: { filter: "hero", title: "Heroes" },
  monsters: { filter: "monster", title: "Monsters" },
};

export const revalidate = 60;

type Props = { params: Promise<{ type: string }> };

export default async function ExploreTypePage({ params }: Props) {
  const { type } = await params;
  const config = TYPE_MAP[type];
  if (!config) notFound();

  const all = await client.fetch<CharacterSummary[]>(CHARACTERS_QUERY);
  const characters = all.filter((c) => c.type === config.filter);

  return (
    <div>
      <PageHeader title={config.title} subtitle={`${characters.length} entries`} />
      <ul className="space-y-2">
        {characters.map((c) => (
          <li key={c._id}>
            <Link
              href={`/explore/characters/${c.slug}`}
              className="block rounded-lg border border-border/50 px-4 py-3 hover:border-gold/40"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
