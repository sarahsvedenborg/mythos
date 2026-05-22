import { defineField, defineType } from "sanity";

export const concept = defineType({
  name: "concept",
  title: "Concept",
  type: "document",
  fields: [
    defineField({
      name: "term",
      title: "Term",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "term", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "definition",
      title: "Definition",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedLessons",
      title: "Related lessons",
      type: "array",
      of: [{ type: "reference", to: [{ type: "lesson" }] }],
    }),
  ],
  preview: {
    select: { title: "term", subtitle: "definition" },
  },
});
