import { BottomNav } from "@/components/bottom-nav";
import { ProgressProvider } from "@/components/progress-provider";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider>
      <main className="mx-auto min-h-[100dvh] w-full max-w-lg flex-1 px-4 pb-28 pt-6">
        {children}
      </main>
      <BottomNav />
    </ProgressProvider>
  );
}
