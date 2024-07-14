import { ComponentType, Layout, LayoutType } from "@/types/editor";
import FastboardTableDraggable from "./FastboardTableDraggable";
import FastboardTable from "./FastboardTable";
import { FastboardTableProperties } from "@/types/editor/table-types";
import FastboardTablePropertiesComponent from "./FastboardTableProperties";
import RowLayout from "../layouts/RowLayout";
import FullLayout from "../layouts/FullLayout";

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

export function getLayout(
  layout: Layout,
  index: number,
  mode: "editable" | "view"
) {
  switch (layout.type) {
    case LayoutType.Full:
      return <FullLayout index={index} properties={layout} mode={mode} />;
    case LayoutType.Row:
      return <RowLayout index={index} properties={layout} mode={mode} />;
  }
}
