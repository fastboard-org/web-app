import {
  ComponentType,
  Layout,
  LayoutType,
  FullLayout as FullLayoutInterface,
  RowLayout as RowLayoutInterface,
} from "@/types/editor";
import FastboardTableDraggable from "./FastboardTableDraggable";
import FastboardTable from "./FastboardTable";
import { FastboardTableProperties } from "@/types/editor/table-types";
import FastboardTablePropertiesComponent from "./FastboardTableProperties";
import FullLayout from "../layouts/FullLayout";
import RowLayout from "../layouts/RowLayout";

export function getComponent(
  id: ComponentType,
  type: "draggable" | "editable" | "view" | "properties",
  properties?: Record<string, any>,
  onValueChange?: (properties: Record<string, any>) => void
) {
  if (!id) {
    return null;
  }

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
      return (
        <FullLayout
          index={index}
          properties={layout as FullLayoutInterface}
          mode={mode}
        />
      );
    case LayoutType.Row:
      return (
        <RowLayout
          index={index}
          properties={layout as RowLayoutInterface}
          mode={mode}
        />
      );
  }
}
