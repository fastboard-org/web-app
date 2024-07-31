import {
  ColumnLayout as ColumnLayoutInterface,
  RightSplitLayout as RightSplitLayoutInterface,
  BottomSplitLayout as BottomSplitLayoutInterface,
} from "@/types/editor/layout-types";
import FastboardTableDraggable from "./FastboardTableDraggable";
import FastboardTable from "./FastboardTable";
import { FastboardTableProperties } from "@/types/editor/table-types";
import FastboardTablePropertiesComponent from "./FastboardTableProperties";
import FullLayout from "../layouts/FullLayout";
import RowLayout from "../layouts/RowLayout";
import {
  FullLayout as FullLayoutInterface,
  RowLayout as RowLayoutInterface,
  Layout,
  LayoutType,
} from "@/types/editor/layout-types";
import ColumnLayout from "../layouts/ColumnLayout";
import RightSplitLayout from "../layouts/RightSplitLayout";
import BottomSplitLayout from "../layouts/BottomSplitLayout";
import { ComponentType } from "@/types/editor";

export function getDraggableComponent(id: ComponentType) {
  const components = {
    [ComponentType.Table]: <FastboardTableDraggable key={"TableDraggable"} />,
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
  if (!id) {
    return null;
  }

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
      return (
        <FullLayout
          key={`FullLayout-${index}`}
          index={index}
          properties={layout as FullLayoutInterface}
          mode={mode}
        />
      );
    case LayoutType.Row:
      return (
        <RowLayout
          key={`RowLayout-${index}`}
          index={index}
          properties={layout as RowLayoutInterface}
          mode={mode}
        />
      );
    case LayoutType.Column:
      return (
        <ColumnLayout
          key={`ColumnLayout-${index}`}
          index={index}
          properties={layout as ColumnLayoutInterface}
          mode={mode}
        />
      );
    case LayoutType.RightSplit:
      return (
        <RightSplitLayout
          key={`RightSplitLayout-${index}`}
          index={index}
          properties={layout as RightSplitLayoutInterface}
          mode={mode}
        />
      );
    case LayoutType.BottomSplit:
      return (
        <BottomSplitLayout
          key={`BottomSplitLayout-${index}`}
          index={index}
          properties={layout as BottomSplitLayoutInterface}
          mode={mode}
        />
      );
  }
}
