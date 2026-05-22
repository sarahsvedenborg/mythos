import { defineField, defineType } from "sanity";

const characterTypes = [
  { title: "God", value: "god" },
  { title: "Titan", value: "titan" },
  { title: "Hero", value: "hero" },
  { title: "Monster", value: "monster" },
  { title: "Mortal", value: "mortal" },
  { title: "Creature", value: "creature" },
];

export const character = defineType({
  name: "character",
  title: "Character",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: characterTypes },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "symbols",
      title: "Symbols",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "parents",
      title: "Parents",
      type: "array",
      of: [{ type: "reference", to: [{ type: "character" }] }],
    }),
    defineField({
      name: "children",
      title: "Children",
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
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "type", media: "image" },
  },
});
