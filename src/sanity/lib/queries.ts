import { defineQuery } from "next-sanity";

export const LESSON_CARD_FIELDS = `{
  _id,
  title,
  "slug": slug.current,
  lessonNumber,
  week,
  day,
  category,
  lessonType,
  shortHook,
  takeaway,
  pronunciation,
  estimatedReadMinutes,
  unlockDate,
  tags,
  image
}`;

export const LESSON_DETAIL_FIELDS = `{
  _id,
  title,
  "slug": slug.current,
  lessonNumber,
  week,
  day,
  category,
  lessonType,
  shortHook,
  content,
  whyItMatters,
  takeaway,
  pronunciation,
  estimatedReadMinutes,
  unlockDate,
  tags,
  image,
  "relatedCharacters": relatedCharacters[]->{
    _id,
    name,
    "slug": slug.current,
    type
  },
  "relatedLessons": relatedLessons[]->{
    _id,
    title,
    "slug": slug.current,
    lessonNumber,
    shortHook
  }
}`;

export const ALL_LESSONS_QUERY = defineQuery(
  `*[_type == "lesson"] | order(lessonNumber asc) ${LESSON_CARD_FIELDS}`
);

export const LESSON_BY_SLUG_QUERY = defineQuery(
  `*[_type == "lesson" && slug.current == $slug][0] ${LESSON_DETAIL_FIELDS}`
);

export const LESSON_BY_NUMBER_QUERY = defineQuery(
  `*[_type == "lesson" && lessonNumber == $lessonNumber][0] ${LESSON_DETAIL_FIELDS}`
);

export const CHARACTERS_QUERY = defineQuery(
  `*[_type == "character"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    type,
    symbols,
    image
  }`
);

export const CHARACTER_BY_SLUG_QUERY = defineQuery(
  `*[_type == "character" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    type,
    description,
    symbols,
    image,
    "parents": parents[]->{ _id, name, "slug": slug.current, type },
    "children": children[]->{ _id, name, "slug": slug.current, type },
    "relatedLessons": relatedLessons[]->{
      _id,
      title,
      "slug": slug.current,
      lessonNumber
    }
  }`
);
