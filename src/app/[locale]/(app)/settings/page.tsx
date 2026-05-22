import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default async function SettingsPage() {
  const t = await getTranslations("settings");

  return (
    <div>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("languageTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageSwitcher />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("installTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{t("installBody")}</p>
            <Link
              href="/install"
              className={cn(buttonVariants({ variant: "outline" }), "border-gold/40")}
            >
              {t("installGuide")}
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("studioTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <a href="/studio" className={cn(buttonVariants({ variant: "ghost" }), "px-0")}>
              {t("openStudio")}
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
