import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Preferences and installation." />

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Install Mythos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Add Mythos to your iPhone home screen for a native, offline-ready experience.
            </p>
            <Link
              href="/install"
              className={cn(buttonVariants({ variant: "outline" }), "border-gold/40")}
            >
              Installation guide
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Content studio</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/studio" className={cn(buttonVariants({ variant: "ghost" }), "px-0")}>
              Open Sanity Studio →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
