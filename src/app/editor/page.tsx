"use client";
import ComponentsDrawer from "@/components/editor/ComponentsDrawer";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorNavbar from "@/components/editor/EditorNavbar";
import PropertiesDrawer from "@/components/editor/PropertiesDrawer";

export default function Editor() {
  return (
    <div className="flex flex-col h-screen w-full bg-content2">
      <EditorNavbar />

      <div className="relative h-full w-full flex overflow-hidden">
        <ComponentsDrawer />
        <div className="flex justify-center items-center h-full w-full p-6">
          <EditorCanvas />
        </div>
        <PropertiesDrawer />
      </div>
    </div>
  );
}
