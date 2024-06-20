export default function ConnectionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen flex-col p-16 w-full h-full gap-4">
      {children}
    </main>
  );
}
