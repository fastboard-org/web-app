import { ComponentType, FastboardComponent, LayoutType } from "@/types/editor";
import FastboardTable, {
  FastboardTableProperties,
} from "../fastboard-components/FastboardTable";
import { useDroppable } from "@dnd-kit/core";
import { useSetRecoilState } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";

interface FullLayoutProps {
  index: number;
  component1: FastboardComponent;
}

export default function FullLayout(props: FullLayoutProps) {
  const { index, component1 } = props;
  const { isOver, setNodeRef } = useDroppable({
    id: `full_layout_${index}_component1`,
    data: { layout: "full", layoutIndex: index, container: "component1" },
  });
  const setPropertiesDrawerState = useSetRecoilState(propertiesDrawerState);

  function getComponent(component: FastboardComponent) {
    switch (component.type) {
      case ComponentType.Table:
        return (
          <FastboardTable
            properties={component.properties as FastboardTableProperties}
            onClick={() => {
              setPropertiesDrawerState({
                layoutIndex: index,
                container: "component1",
                properties: component.properties,
              });
            }}
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
      {getComponent(component1)}
    </div>
  );
}
