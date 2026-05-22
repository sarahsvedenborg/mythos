import { defineField, defineType } from "sanity";
import { localeField } from "./locale";

const categories = [
  { title: "Cosmos & Titans", value: "cosmos" },
  { title: "Olympians", value: "olympians" },
  { title: "Heroes", value: "heroes" },
  { title: "Monsters", value: "monsters" },
  { title: "Places", value: "places" },
  { title: "Concepts", value: "concepts" },
  { title: "Symbols", value: "symbols" },
  { title: "Themes", value: "themes" },
  { title: "Culture", value: "culture" },
];

const lessonTypes = [
  { title: "Character", value: "character" },
  { title: "Story", value: "story" },
  { title: "Concept", value: "concept" },
  { title: "Monster / Place / Relationship", value: "entity" },
  { title: "Theme / Legacy", value: "theme" },
];

export const lesson = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    localeField,
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lessonNumber",
      title: "Lesson number (1–260)",
      type: "number",
      validation: (rule) => rule.required().min(1).max(260),
    }),
    defineField({
      name: "week",
      title: "Week (1–52)",
      type: "number",
      validation: (rule) => rule.required().min(1).max(52),
    }),
    defineField({
      name: "day",
      title: "Weekday (1=Mon … 5=Fri)",
      type: "number",
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categories },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lessonType",
      title: "Lesson type",
      type: "string",
      options: { list: lessonTypes },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortHook",
      title: "Short hook",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "content",
      title: "Main content",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whyItMatters",
      title: "Why it matters",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "takeaway",
      title: "Key takeaway",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pronunciation",
      title: "Pronunciation guide",
      type: "string",
    }),
    defineField({
      name: "estimatedReadMinutes",
      title: "Estimated read time (minutes)",
      type: "number",
      initialValue: 3,
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: "relatedCharacters",
      title: "Related characters",
      type: "array",
      of: [{ type: "reference", to: [{ type: "character" }] }],
    }),
    defineField({
      name: "relatedLessons",
      title: "Related lessons",
      type: "array",
      of: [{ type: "reference", to: [{ type: "lesson" }] }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "image",
      title: "Illustration",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "unlockDate",
      title: "Unlock date",
      type: "datetime",
      description: "When this lesson becomes available (weekday releases)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
  ],
  orderings: [
    {
      title: "Lesson number",
      name: "lessonNumberAsc",
      by: [{ field: "lessonNumber", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      lessonNumber: "lessonNumber",
      week: "week",
      day: "day",
      locale: "locale",
      media: "image",
    },
    prepare({ title, lessonNumber, week, day, locale, media }) {
      const lang = locale === "no" ? "NO" : "EN";
      return {
        title: `${lessonNumber}. ${title}`,
        subtitle: `${lang} · Week ${week} · Day ${day}`,
        media,
      };
    },
  },
});
