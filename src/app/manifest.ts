import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mythos — Greek Mythology",
    short_name: "Mythos",
    description: "Learn Greek mythology daily with short weekday lessons.",
    start_url: "/today",
    display: "standalone",
    background_color: "#0a0e1a",
    theme_color: "#0a0e1a",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
