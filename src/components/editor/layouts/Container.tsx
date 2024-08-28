import { ComponentId, Index } from "@/types/editor";
import { useDroppable } from "@dnd-kit/core";
import FastboardComponent from "../fastboard-components/FastboardComponent";
import useDashboard from "@/hooks/dashboards/useDashboard";

export default function Container({
  index,
  componentId,
  className,
  mode = "editable",
}: {
  index: Index;
  componentId: ComponentId | null;
  className?: string;
  mode?: "editable" | "view";
}) {
  const { getComponent } = useDashboard();
  const { page, layout, container } = index;
  const { isOver, setNodeRef } = useDroppable({
    id: `${page}_layout_${layout}_${container}`,
    data: {
      index: index,
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
            layoutContext: index,
          }}
          properties={component.properties}
          mode={mode}
        />
      ) : null}
    </div>
  );
}
