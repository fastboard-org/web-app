"use client";
import ComponentsDrawer from "@/components/editor/ComponentsDrawer";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorNavbar from "@/components/editor/EditorNavbar";
import { useState } from "react";

export default function Editor() {
  const [componentsOpen, setComponentsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-content2">
      <EditorNavbar />

      <div className="flex flex-row h-full w-full justify-center items-center">
        <ComponentsDrawer
          open={componentsOpen}
          onClick={() => {
            setComponentsOpen(!componentsOpen);
          }}
          setGridElements={() => {}}
        ></ComponentsDrawer>
        <div className="h-full w-full p-6">
          <EditorCanvas />
        </div>
      </div>
    </div>
  );
}
