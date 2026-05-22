import type { Locale } from "@/i18n/routing";

export function queryParams(locale: Locale, extra?: Record<string, unknown>) {
  return { locale, ...extra };
}
