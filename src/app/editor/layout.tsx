import EditorNavbar from "@/components/editor/EditorNavbar";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col h-screen w-screen bg-background overflow-hidden">
      <EditorNavbar />
      <main className="flex flex-grow items-center justify-center">
        {children}
      </main>
    </div>
  );
}
