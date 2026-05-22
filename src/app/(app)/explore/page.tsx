import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { CHARACTERS_QUERY } from "@/sanity/lib/queries";
import type { CharacterSummary } from "@/types/lesson";

export const revalidate = 60;

const categories = [
  { href: "/explore/characters", label: "All characters", filter: null },
  { href: "/explore/gods", label: "Gods", filter: "god" },
  { href: "/explore/heroes", label: "Heroes", filter: "hero" },
  { href: "/explore/monsters", label: "Monsters", filter: "monster" },
];

export default async function ExplorePage() {
  const characters = await client.fetch<CharacterSummary[]>(CHARACTERS_QUERY);

  return (
    <div>
      <PageHeader
        title="Explore"
        subtitle="Characters, places, and concepts from the myths."
      />

      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {categories.map(({ href, label }) => (
          <Link key={href} href={href}>
            <Card className="transition-colors hover:border-gold/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{label}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Browse the pantheon
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {characters.length > 0 ? (
        <section>
          <h2 className="font-heading mb-4 text-lg text-gold">Featured</h2>
          <ul className="space-y-2">
            {characters.slice(0, 6).map((c) => (
              <li key={c._id}>
                <Link
                  href={`/explore/characters/${c.slug}`}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3 hover:border-gold/40"
                >
                  <span>{c.name}</span>
                  <span className="text-xs capitalize text-muted-foreground">{c.type}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-sm text-muted-foreground">
          Add characters in Studio to populate Explore.
        </p>
      )}
    </div>
  );
}
