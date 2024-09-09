"use client";
import EditorModal from "@/components/editor/EditorModal";
import Viewport from "@/components/shared/Viewport";

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-background">
      <EditorModal mode="view" />
      <Viewport mode="published" />
    </div>
  );
}
