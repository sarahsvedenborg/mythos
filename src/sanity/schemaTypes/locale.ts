import { defineField } from "sanity";

export const LOCALES = [
  { title: "English", value: "en" },
  { title: "Norwegian (Bokmål)", value: "no" },
] as const;

export type AppLocale = (typeof LOCALES)[number]["value"];

export const localeField = defineField({
  name: "locale",
  title: "Language",
  type: "string",
  options: {
    list: LOCALES.map(({ title, value }) => ({ title, value })),
    layout: "radio",
  },
  initialValue: "en",
  validation: (rule) => rule.required(),
});
