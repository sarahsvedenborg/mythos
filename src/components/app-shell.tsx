import { BottomNav } from "@/components/bottom-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="mx-auto min-h-[100dvh] w-full max-w-lg flex-1 px-4 pb-28 pt-6">
        {children}
      </main>
      <BottomNav />
    </>
  );
}
