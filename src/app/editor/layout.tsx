import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorNavbar from "@/components/editor/EditorNavbar";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen w-screen bg-content2">
      <EditorNavbar />
      <main className="h-full w-full p-6">{children}</main>
    </div>
  );
}
