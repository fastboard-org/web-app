import { FastboardComponent, LayoutType } from "@/types/editor";
import FastboardTable, {
  FastboardTableProperties,
} from "../fastboard-components/FastboardTable";
import { useDroppable } from "@dnd-kit/core";

interface FullLayoutProps {
  component1: FastboardComponent;
}

export default function FullLayout(props: FullLayoutProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "full-layout-container",
    data: { layout: "full" },
  });

  function getComponent(component: FastboardComponent) {
    switch (component.type) {
      case "table":
        return (
          <FastboardTable
            properties={component.properties as FastboardTableProperties}
          />
        );
    }
  }

  return (
    <div
      ref={setNodeRef}
      className="flex h-full w-full justify-center items-center fastboard-container"
      style={{
        backgroundColor: isOver ? "rgba(135,207,232,0.1)" : "transparent",
      }}
    >
      {getComponent(props.component1)}
    </div>
  );
}
