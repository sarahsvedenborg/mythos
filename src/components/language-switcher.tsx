"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: Locale) {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-muted-foreground">{t("label")}</p>
      <div
        className="inline-flex rounded-lg border border-border/60 p-1"
        role="group"
        aria-label={t("label")}
      >
        {routing.locales.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            className={cn(
              "min-h-10 rounded-md px-4 text-sm font-medium transition-colors",
              locale === code
                ? "bg-gold text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-pressed={locale === code}
          >
            {t(code)}
          </button>
        ))}
      </div>
    </div>
  );
}
