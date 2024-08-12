import { ComponentId } from "@/types/editor";
import { useDroppable } from "@dnd-kit/core";
import FastboardComponent from "../fastboard-components/FastboardComponent";
import useDashboard from "@/hooks/dashboards/useDashboard";

export default function Container({
  layoutIndex,
  containerIndex,
  componentId,
  className,
  mode = "editable",
}: {
  layoutIndex: number;
  containerIndex: string;
  componentId: ComponentId | null;
  className?: string;
  mode?: "editable" | "view";
}) {
  const { getComponent } = useDashboard();
  const { isOver, setNodeRef } = useDroppable({
    id: `layout_${layoutIndex}_${containerIndex}`,
    data: {
      layoutIndex: layoutIndex,
      container: containerIndex,
    },
  });
  const component = componentId ? getComponent(componentId) : null;

  return (
    <div
      ref={setNodeRef}
      className={`${className}`}
      style={{
        backgroundColor: isOver ? "rgba(135,207,232,0.1)" : "transparent",
      }}
    >
      {component ? (
        <FastboardComponent
          id={component.id}
          name={component.type}
          type={component.type}
          context={{
            type: "layout",
            layoutContext: {
              layoutIndex,
              containerIndex,
            },
          }}
          properties={component.properties}
          mode={mode}
        />
      ) : null}
    </div>
  );
}
