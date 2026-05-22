"use client";

import { Flame, Heart, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useProgressContext } from "@/components/progress-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  releasedCount: number;
  curriculumPct: number;
};

export function ProgressDashboard({ releasedCount, curriculumPct }: Props) {
  const t = useTranslations("progress");
  const {
    ready,
    streak,
    longestStreak,
    completedCount,
    favoritesCount,
  } = useProgressContext();

  if (!ready) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="h-24 animate-pulse bg-muted/20 pt-6" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-muted-foreground">
            {t("lessonsUnlocked")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-heading text-4xl text-gold">
            {releasedCount}
            <span className="text-lg text-muted-foreground"> / 260</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("ofCurriculum", { pct: curriculumPct })}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base text-muted-foreground">
            {t("currentStreak")}
          </CardTitle>
          <Flame className="size-4 text-gold" aria-hidden />
        </CardHeader>
        <CardContent>
          <p className="font-heading text-4xl text-marble">{streak}</p>
          <p className="text-sm text-muted-foreground">
            {streak > 0 ? t("streakHint") : t("streakEmpty")}
          </p>
          {longestStreak > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              {t("longestStreak", { count: longestStreak })}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base text-muted-foreground">
              <CheckCircle2 className="size-4" aria-hidden />
              {t("completed")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-3xl text-marble">{completedCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base text-muted-foreground">
              <Heart className="size-4 text-gold" aria-hidden />
              {t("favorites")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-3xl text-marble">{favoritesCount}</p>
          </CardContent>
        </Card>
      </div>

      {favoritesCount > 0 && (
        <Link
          href="/archive?filter=favorites"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full border-gold/40"
          )}
        >
          {t("viewFavorites")}
        </Link>
      )}

      <p className="text-center text-xs text-muted-foreground">{t("localNote")}</p>
    </div>
  );
}
