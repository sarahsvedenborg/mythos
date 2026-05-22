import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/page-header";

export default async function InstallPage() {
  const t = await getTranslations("install");

  const steps = [t("step1"), t("step2"), t("step3"), t("step4")];

  return (
    <div>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <ol className="list-decimal space-y-4 pl-5 text-foreground/90">
        {steps.map((step, i) => (
          <li key={i} className="leading-relaxed">
            {step}
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm text-muted-foreground">{t("footer")}</p>
    </div>
  );
}
