import { FastboardComponent as FastboardComponentInterface } from "@/types/editor";
import { useDroppable } from "@dnd-kit/core";
import FastboardComponent from "../fastboard-components/FastboardComponent";

export default function Container({
  layoutIndex,
  containerIndex,
  component,
  className,
  mode = "editable",
}: {
  layoutIndex: number;
  containerIndex: string;
  component: FastboardComponentInterface | null;
  className?: string;
  mode?: "editable" | "view";
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `layout_${layoutIndex}_${containerIndex}`,
    data: {
      layoutIndex: layoutIndex,
      container: containerIndex,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-full w-full ${className}`}
      style={{
        backgroundColor: isOver ? "rgba(135,207,232,0.1)" : "transparent",
      }}
    >
      {component ? (
        <FastboardComponent
          name={component.type}
          type={component.type}
          layoutIndex={layoutIndex}
          containerIndex={containerIndex}
          properties={component.properties}
          mode={mode}
        />
      ) : null}
    </div>
  );
}
