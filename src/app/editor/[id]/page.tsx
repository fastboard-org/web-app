"use client";
import ComponentsDrawer from "@/components/editor/ComponentsDrawer";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorNavbar from "@/components/editor/EditorNavbar";
import PropertiesDrawer from "@/components/editor/PropertiesDrawer";
import useDashboard from "@/hooks/useDashboard";
import { addComponent } from "@/lib/editor.utils";
import { ComponentType } from "@/types/editor";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useParams, useRouter } from "next/navigation";

export default function Editor() {
  const { id } = useParams();
  const router = useRouter();
  const { dashboard, isError, error, updateDashboard } = useDashboard(
    id as string
  );

  function updateDashboardMetadata(event: DragEndEvent) {
    const { over, active } = event;
    if (!over) return;
    if (!active) return;
    if (!dashboard) return;

    const layoutIndex: number = over.data.current?.layoutIndex;
    const container: string = over.data.current?.container;
    const componentType: ComponentType = active.data.current?.type;
    const defaultProperties: Object = active.data.current?.defaultProperties;

    updateDashboard((prev) => ({
      ...prev,
      metadata: addComponent(
        layoutIndex,
        container,
        componentType,
        defaultProperties,
        prev.metadata
      ),
    }));
  }

  if (isError) {
    //TODO: This could be a not found page and link to home
    router.push("/home/dashboards");
  }

  return (
    <div className="flex flex-col h-screen w-full bg-foreground-100 dark:bg-content1">
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
