import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReleasedLessons } from "@/lib/lessons";
import { client } from "@/sanity/lib/client";
import { ALL_LESSONS_QUERY } from "@/sanity/lib/queries";
import type { LessonCard } from "@/types/lesson";

export const revalidate = 60;

export default async function ProgressPage() {
  const lessons = await client.fetch<LessonCard[]>(ALL_LESSONS_QUERY);
  const released = getReleasedLessons(lessons);
  const total = 260;
  const pct = Math.round((released.length / total) * 100);

  return (
    <div>
      <PageHeader
        title="Progress"
        subtitle="Local streaks and completion tracking arrive in Phase 3."
      />

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-muted-foreground">Lessons unlocked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-4xl text-gold">
              {released.length}
              <span className="text-lg text-muted-foreground"> / {total}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{pct}% of the year curriculum</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-muted-foreground">Current streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-4xl text-marble">—</p>
            <p className="text-sm text-muted-foreground">Enable in Phase 3</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
