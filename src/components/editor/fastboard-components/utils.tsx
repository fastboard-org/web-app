import { ComponentType, Layout, LayoutType } from "@/types/editor";
import FastboardTableDraggable from "./FastboardTableDraggable";
import FastboardTable from "./FastboardTable";
import { FastboardTableProperties } from "@/types/editor/table-types";
import FastboardTablePropertiesComponent from "./FastboardTableProperties";
import RowLayout from "../layouts/RowLayout";
import FullLayout from "../layouts/FullLayout";

export function getDraggableComponent(id: ComponentType) {
  const components = {
    [ComponentType.Table]: <FastboardTableDraggable />,
    [ComponentType.Image]: null,
  };

  return components[id];
}

export function getComponent(
  layoutIndex: number,
  container: string,
  id: ComponentType,
  type: "editable" | "view",
  properties?: Record<string, any>
) {
  const components = {
    [ComponentType.Table]: {
      editable: (
        <FastboardTable
          layoutIndex={layoutIndex}
          container={container}
          properties={properties as FastboardTableProperties}
        />
      ),
      view: (
        <FastboardTable
          layoutIndex={layoutIndex}
          container={container}
          properties={properties as FastboardTableProperties}
        />
      ),
    },
    [ComponentType.Image]: {
      editable: null,
      view: null,
    },
  };

  return components[id][type];
}

export function getPropertiesComponent(
  id: ComponentType,
  properties?: Record<string, any>,
  onValueChange?: (properties: Record<string, any>) => void
) {
  const components = {
    [ComponentType.Table]: (
      <FastboardTablePropertiesComponent
        properties={properties as FastboardTableProperties}
        onValueChange={(properties) => {
          if (onValueChange) {
            onValueChange(properties);
          }
        }}
      />
    ),
    [ComponentType.Image]: null,
  };

  return components[id];
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
