"use client";
import ComponentsDrawer from "@/components/editor/ComponentsDrawer";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorNavbar from "@/components/editor/EditorNavbar";
import PropertiesDrawer from "@/components/editor/PropertiesDrawer";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { Toaster } from "@/components/shared/Toaster";
import { ComponentType, Index } from "@/types/editor";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { notFound } from "next/navigation";
import SettingsDrawer from "@/components/editor/settings/SettingsDrawer";
import EditorModal from "@/components/editor/EditorModal";
import AuthDrawer from "@/components/editor/auth/AuthDrawer";
import useSave from "@/hooks/editor/useSave";
import { AxiosError } from "axios";
import DraggableImage from "@/components/shared/DraggableImage";
import { useState } from "react";

export default function Editor() {
  const { isError, error, addComponentToLayout } = useDashboard();
  const [activeComponent, setActiveComponent] = useState<ComponentType | null>(
    null
  );
  useSave();

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    if (!active) return;

    const componentType: ComponentType = active.data.current?.type;
    setActiveComponent(componentType);
  }

  function updateDashboardMetadata(event: DragEndEvent) {
    setActiveComponent(null);
    const { over, active } = event;
    if (!over) return;
    if (!active) return;

    const index: Index = over.data.current?.index;
    const componentType: ComponentType = active.data.current?.type;
    const defaultProperties: Object = active.data.current?.defaultProperties;

    addComponentToLayout(index, componentType, defaultProperties);
  }

  if (isError) {
    if ((error as AxiosError).response?.status === 404) {
      notFound();
    }

    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-foreground-100 dark:bg-content1">
      <Toaster position="bottom-right" />

      <EditorNavbar />

      <div className="relative h-full w-full flex overflow-hidden ">
        <DndContext
          modifiers={[restrictToWindowEdges]}
          onDragStart={handleDragStart}
          onDragEnd={updateDashboardMetadata}
        >
          <DragOverlay className="cursor-grabbing ">
            {activeComponent && (
              <DraggableImage name={activeComponent} alt={activeComponent} />
            )}
          </DragOverlay>
          <ComponentsDrawer />
          <SettingsDrawer />
          <AuthDrawer />
          <div className="flex justify-center items-center h-full w-full p-6 bg-default-100 dark:bg-content1">
            <EditorCanvas key={"EditorCanvas"} />
            <EditorModal />
          </div>
        </DndContext>
        <PropertiesDrawer />
      </div>
    </div>
  );
}
