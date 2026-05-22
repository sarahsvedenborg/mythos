export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-8">
      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-gold">Mythos</p>
      <h1 className="font-heading text-3xl text-marble">{title}</h1>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
    </header>
  );
}
