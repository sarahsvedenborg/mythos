"use client";

import { Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import { useProgressContext } from "@/components/progress-provider";

export function StreakDisplay() {
  const t = useTranslations("today");
  const { ready, streak } = useProgressContext();

  if (!ready) {
    return (
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/5 px-4 py-3">
        <Flame className="size-5 text-gold/50" aria-hidden />
        <div className="h-8 w-32 animate-pulse rounded bg-muted/40" />
      </div>
    );
  }

  return (
    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/5 px-4 py-3">
      <Flame className="size-5 text-gold" aria-hidden />
      <div>
        <p className="text-sm font-medium">{t("streakTitle")}</p>
        <p className="text-xs text-muted-foreground">
          {streak > 0
            ? t("streakActive", { count: streak })
            : t("streakEmpty")}
        </p>
      </div>
      <p
        className="ml-auto font-heading text-2xl text-gold tabular-nums"
        aria-label={t("streakCountAria", { count: streak })}
      >
        {streak}
      </p>
    </div>
  );
}
