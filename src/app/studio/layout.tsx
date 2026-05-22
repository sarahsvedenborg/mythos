export const metadata = {
  title: "Mythos Studio",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-full min-h-screen">{children}</div>;
}
