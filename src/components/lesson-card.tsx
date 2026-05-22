"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Lock, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LessonCard as LessonCardType } from "@/types/lesson";
import { cn } from "@/lib/utils";

type Props = {
  lesson: LessonCardType;
  locked?: boolean;
  href?: string;
};

export function LessonCard({ lesson, locked = false, href }: Props) {
  const t = useTranslations("lessonTypes");
  const tLesson = useTranslations("lesson");
  const tArchive = useTranslations("archive");
  const target = href ?? (locked ? undefined : `/archive/${lesson.slug}`);

  const card = (
    <Card
      className={cn(
        "border-border/60 bg-card/80 backdrop-blur transition-colors",
        !locked && target && "hover:border-gold/40 hover:bg-card",
        locked && "opacity-60"
      )}
    >
      <CardHeader className="gap-2 pb-2">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline" className="border-gold/30 text-gold">
            #{lesson.lessonNumber}
          </Badge>
          {locked ? (
            <Lock className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          ) : (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" aria-hidden />
              {tLesson("minRead", { minutes: lesson.estimatedReadMinutes ?? 3 })}
            </span>
          )}
        </div>
        <CardTitle className="font-heading text-lg leading-snug">{lesson.title}</CardTitle>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {t(lesson.lessonType as "character")} · {tArchive("week", { week: lesson.week })}
        </p>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">{lesson.shortHook}</p>
      </CardContent>
    </Card>
  );

  if (!target) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        {card}
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Link
        href={target}
        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        {card}
      </Link>
    </motion.div>
  );
}
