import { ComponentType } from "@/types/editor";
import FastboardTableDraggable from "./FastboardTableDraggable";
import FastboardTable from "./FastboardTable";
import { FastboardTableProperties } from "@/types/editor/table-types";
import FastboardTablePropertiesComponent from "./FastboardTableProperties";

export function getComponent(
  id: ComponentType,
  type: "draggable" | "editable" | "view" | "properties",
  properties?: Record<string, any>,
  onValueChange?: (properties: Record<string, any>) => void
) {
  const components = {
    [ComponentType.Table]: {
      draggable: <FastboardTableDraggable />,
      editable: (
        <FastboardTable properties={properties as FastboardTableProperties} />
      ),
      view: (
        <FastboardTable properties={properties as FastboardTableProperties} />
      ),
      properties: (
        <FastboardTablePropertiesComponent
          properties={properties as FastboardTableProperties}
          onValueChange={(properties) => {
            if (onValueChange) {
              onValueChange(properties);
            }
          }}
        />
      ),
    },
    [ComponentType.Image]: {
      draggable: null,
      editable: null,
      view: null,
      properties: null,
    },
  };

  return components[id][type];
}
