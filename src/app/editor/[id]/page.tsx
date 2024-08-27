"use client";
import ComponentsDrawer from "@/components/editor/ComponentsDrawer";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorNavbar from "@/components/editor/EditorNavbar";
import PropertiesDrawer from "@/components/editor/PropertiesDrawer";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { Toaster } from "@/components/shared/Toaster";
import { ComponentType, Index } from "@/types/editor";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useRouter } from "next/navigation";
import SettingsDrawer from "@/components/editor/settings/SettingsDrawer";
import EditorModal from "@/components/editor/EditorModal";
import useSave from "@/hooks/editor/useSave";

export default function Editor() {
  const router = useRouter();
  const { isError, addComponentToLayout } = useDashboard();
  useSave();

  function updateDashboardMetadata(event: DragEndEvent) {
    const { over, active } = event;
    if (!over) return;
    if (!active) return;

    const index: Index = over.data.current?.index;
    const componentType: ComponentType = active.data.current?.type;
    const defaultProperties: Object = active.data.current?.defaultProperties;

    addComponentToLayout(index, componentType, defaultProperties);
  }

  if (isError) {
    //TODO: This could be a not found page and link to home
    router.push("/home/dashboards");
  }

  return (
    <div className="flex flex-col h-screen w-full bg-foreground-100 dark:bg-content1">
      <Toaster position="bottom-right" />

      <EditorNavbar />

      <div className="relative h-full w-full flex overflow-hidden ">
        <DndContext
          modifiers={[restrictToWindowEdges]}
          onDragEnd={updateDashboardMetadata}
        >
          <ComponentsDrawer />
          <SettingsDrawer />
          <div className="flex justify-center items-center h-full w-full p-6">
            <EditorCanvas key={"EditorCanvas"} />
            <EditorModal />
          </div>
        </DndContext>
        <PropertiesDrawer />
      </div>
    </div>
  );
}
