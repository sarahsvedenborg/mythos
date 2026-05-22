"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/** Updates document lang for localized routes (root layout defaults to en). */
export function SetHtmlLang() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
