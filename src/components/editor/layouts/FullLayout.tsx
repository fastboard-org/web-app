import { useDroppable } from "@dnd-kit/core";
import FastboardComponent from "../fastboard-components/FastboardComponent";
import { FastboardComponent as FastboardComponentInterface } from "@/types/editor";

interface FullLayoutProps {
  index: number;
  component1: FastboardComponentInterface;
}

export default function FullLayout(props: FullLayoutProps) {
  const { index, component1 } = props;
  const { isOver, setNodeRef } = useDroppable({
    id: `full_layout_${index}_component1`,
    data: { layout: "full", layoutIndex: index, container: "component1" },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex h-full w-full justify-center fastboard-container p-10"
      style={{
        backgroundColor: isOver ? "rgba(135,207,232,0.1)" : "transparent",
      }}
    >
      <FastboardComponent
        name="table"
        type={component1.type}
        layoutIndex={index}
        containerIndex="component1"
        properties={component1.properties}
      />
    </div>
  );
}
