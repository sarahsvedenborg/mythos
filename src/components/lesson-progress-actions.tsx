"use client";

import { Check, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useProgressContext } from "@/components/progress-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  lessonNumber: number;
};

export function LessonProgressActions({ lessonNumber }: Props) {
  const t = useTranslations("lesson");
  const { ready, isCompleted, isFavorite, toggleComplete, toggleFavorite } =
    useProgressContext();

  if (!ready) return null;

  const completed = isCompleted(lessonNumber);
  const favorite = isFavorite(lessonNumber);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Button
        type="button"
        variant={completed ? "default" : "outline"}
        className={cn(
          "flex-1 gap-2",
          completed && "bg-gold text-background hover:bg-gold/90"
        )}
        onClick={() => toggleComplete(lessonNumber)}
        aria-pressed={completed}
      >
        <Check className="size-4" aria-hidden />
        {completed ? t("markedComplete") : t("markComplete")}
      </Button>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "flex-1 gap-2",
          favorite && "border-gold/50 text-gold"
        )}
        onClick={() => toggleFavorite(lessonNumber)}
        aria-pressed={favorite}
      >
        <Heart
          className={cn("size-4", favorite && "fill-current")}
          aria-hidden
        />
        {favorite ? t("favorited") : t("addFavorite")}
      </Button>
    </div>
  );
}
