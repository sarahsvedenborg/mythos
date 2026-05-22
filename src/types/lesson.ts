import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  asset?: { _ref: string };
  alt?: string;
};

export type LessonCard = {
  _id: string;
  title: string;
  slug: string;
  lessonNumber: number;
  week: number;
  day: number;
  category: string;
  lessonType: string;
  shortHook: string;
  takeaway: string;
  pronunciation?: string;
  estimatedReadMinutes?: number;
  unlockDate: string;
  tags?: string[];
  image?: SanityImage;
};

export type LessonDetail = LessonCard & {
  content: PortableTextBlock[];
  whyItMatters?: string;
  relatedCharacters?: {
    _id: string;
    name: string;
    slug: string;
    type: string;
  }[];
  relatedLessons?: {
    _id: string;
    title: string;
    slug: string;
    lessonNumber: number;
    shortHook: string;
  }[];
};

export type CharacterSummary = {
  _id: string;
  name: string;
  slug: string;
  type: string;
  symbols?: string[];
  image?: SanityImage;
};
