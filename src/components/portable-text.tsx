import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-foreground/90 last:mb-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading mb-3 mt-6 text-xl text-gold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading mb-2 mt-4 text-lg text-marble">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gold/60 pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-marble">{children}</strong>,
    em: ({ children }) => <em className="text-gold/90">{children}</em>,
  },
};

export function LessonPortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
