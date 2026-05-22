"use client";

import { useTranslations } from "next-intl";
import { useProgressContext } from "@/components/progress-provider";
import { Button } from "@/components/ui/button";

export function ClearProgressButton() {
  const t = useTranslations("settings");
  const { ready, resetProgress, completedCount, favoritesCount } =
    useProgressContext();

  if (!ready || (completedCount === 0 && favoritesCount === 0)) {
    return null;
  }

  const handleClear = () => {
    if (window.confirm(t("clearProgressConfirm"))) {
      resetProgress();
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full border-destructive/40 text-destructive hover:bg-destructive/10"
      onClick={handleClear}
    >
      {t("clearProgress")}
    </Button>
  );
}
