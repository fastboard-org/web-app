"use client";
import { dashboardMetadataState } from "@/atoms/editor";
import ComponentsDrawer from "@/components/editor/ComponentsDrawer";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorNavbar from "@/components/editor/EditorNavbar";
import PropertiesDrawer from "@/components/editor/PropertiesDrawer";
import { Toaster } from "@/components/shared/Toaster";
import { addComponent } from "@/lib/editor.utils";
import { ComponentType } from "@/types/editor";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useSetRecoilState } from "recoil";

export default function Editor() {
  const setDashboardMetadata = useSetRecoilState(dashboardMetadataState);

  function updateDashboardMetadata(event: DragEndEvent) {
    const { over, active } = event;
    if (!over) return;
    if (!active) return;

    const layoutIndex: number = over.data.current?.layoutIndex;
    const container: string = over.data.current?.container;
    const componentType: ComponentType = active.data.current?.type;
    const defaultProperties: Object = active.data.current?.defaultProperties;

    setDashboardMetadata((prev) =>
      addComponent(
        layoutIndex,
        container,
        componentType,
        defaultProperties,
        prev
      )
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-foreground-100 dark:bg-content1">
      <Toaster position="bottom-right" richColors />

      <EditorNavbar />

      <div className="relative h-full w-full flex overflow-hidden ">
        <DndContext
          modifiers={[restrictToWindowEdges]}
          onDragEnd={updateDashboardMetadata}
        >
          <ComponentsDrawer />
          <div className="flex justify-center items-center h-full w-full p-6">
            <EditorCanvas />
          </div>
        </DndContext>
        <PropertiesDrawer />
      </div>
    </div>
  );
}
