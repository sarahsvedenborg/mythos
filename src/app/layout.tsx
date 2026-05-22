import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const heading = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Mythos — Learn Greek Mythology Daily",
    template: "%s | Mythos",
  },
  description:
    "A calm, collectible daily app for learning Greek mythology — gods, heroes, monsters, and myths in under three minutes.",
  applicationName: "Mythos",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mythos",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mythos",
    title: "Mythos — Learn Greek Mythology Daily",
    description: "Daily micro-lessons on Greek gods, heroes, and myths.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${heading.variable} ${sans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
