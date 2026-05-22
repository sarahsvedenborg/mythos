import { PageHeader } from "@/components/page-header";

const steps = [
  "Open Mythos in Safari on your iPhone.",
  "Tap the Share button at the bottom of the screen.",
  'Choose "Add to Home Screen".',
  'Tap "Add" — Mythos will appear like a native app.',
];

export default function InstallPage() {
  return (
    <div>
      <PageHeader
        title="Install Mythos"
        subtitle="Get daily mythology lessons from your home screen."
      />
      <ol className="list-decimal space-y-4 pl-5 text-foreground/90">
        {steps.map((step, i) => (
          <li key={i} className="leading-relaxed">
            {step}
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm text-muted-foreground">
        After installing, lessons you have opened stay available offline (Phase 4 expands caching).
      </p>
    </div>
  );
}
