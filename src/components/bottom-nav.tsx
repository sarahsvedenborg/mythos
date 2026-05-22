"use client";

import { useTranslations } from "next-intl";
import { BookOpen, Compass, Home, BarChart3, Settings } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const links = [
    { href: "/today" as const, label: t("today"), icon: Home },
    { href: "/archive" as const, label: t("archive"), icon: BookOpen },
    { href: "/explore" as const, label: t("explore"), icon: Compass },
    { href: "/progress" as const, label: t("progress"), icon: BarChart3 },
    { href: "/settings" as const, label: t("settings"), icon: Settings },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
      aria-label="Main"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-2 py-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg px-2 text-xs transition-colors",
                  active ? "text-gold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-5" aria-hidden />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
