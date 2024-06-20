"use client";
import { dashboardMetadataAtom } from "@/atoms/editor";
import ComponentsDrawer from "@/components/editor/ComponentsDrawer";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorNavbar from "@/components/editor/EditorNavbar";
import PropertiesDrawer from "@/components/editor/PropertiesDrawer";
import { LayoutType } from "@/types/editor";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useSetRecoilState } from "recoil";

export default function Editor() {
  const setDashboardMetadata = useSetRecoilState(dashboardMetadataAtom);

  return (
    <div className="flex flex-col h-screen w-full bg-foreground-200 dark:bg-default-100">
      <EditorNavbar />

      <div className="relative h-full w-full flex overflow-hidden ">
        <DndContext
          modifiers={[restrictToWindowEdges]}
          onDragEnd={(event) => {
            console.log("Drag end", event);
            const { over, active } = event;
            if (!over) return;
            if (!active) return;

            setDashboardMetadata((prev) => ({
              layouts: [
                {
                  type: LayoutType.Full,
                  component1: {
                    type: active.data.current?.type,
                    properties: active.data.current?.defaultProperties,
                  },
                },
              ],
            }));
          }}
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
