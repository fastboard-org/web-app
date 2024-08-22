import {
  ColumnLayout as ColumnLayoutInterface,
  RightSplitLayout as RightSplitLayoutInterface,
  BottomSplitLayout as BottomSplitLayoutInterface,
} from "@/types/editor/layout-types";
import FastboardTable from "./table/FastboardTable";
import { FastboardTableProperties } from "@/types/editor/table-types";

import FastboardCardsDraggable from "./cards/FastboardCardsDraggable";
import FastboardCards from "./cards/FastboardCards";
import { FastboardCardsProperties } from "@/types/editor/cards-types";
import FastboardCardsPropertiesComponent from "./cards/FastboardCardsProperties";

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
import FastboardGroupChartDraggable from "@/components/editor/fastboard-components/group-chart/FastboardGroupChartDraggable";
import FastboardGroupChart from "@/components/editor/fastboard-components/group-chart/FastboardGroupChart";
import { FastboardGroupChartProperties } from "@/types/editor/group-chart-types";
import FastboardGroupChartPropertiesComponent from "@/components/editor/fastboard-components/group-chart/properties/FastboardGroupChartProperties";
import {
  ComponentId,
  ComponentType,
  PropertiesDrawerState,
} from "@/types/editor";
import FastboardFormDraggable from "./form/FastboardFormDraggable";
import FastboardForm from "./form/FastboardForm";
import { FormProperties } from "@/types/editor/form";
import FastboardFormProperties from "./form/properties/FastboardFormProperties";
import FastboardTableDraggable from "./table/FastboardTableDraggable";
import FastboardTablePropertiesComponent from "./table/properties/FastboardTableProperties";

import FastboardHeader from "./header/FastboardHeader";
import FastboardHeaderPropertiesComponent from "./header/FastboardHeaderProperties";
import { FastboardHeaderProperties } from "@/types/editor/header-types";

export function getDraggableComponent(id: ComponentType) {
  const components = {
    [ComponentType.Table]: <FastboardTableDraggable key={"TableDraggable"} />,
    [ComponentType.Form]: <FastboardFormDraggable key={"FormDraggable"} />,
    [ComponentType.Image]: null,
    [ComponentType.GroupChart]: (
      <FastboardGroupChartDraggable key={"GroupChartDraggable"} />
    ),
    [ComponentType.Cards]: <FastboardCardsDraggable key={"CardsDraggable"} />,
    [ComponentType.Header]: null,
  };

  return components[id];
}

export function getComponent(
  id: ComponentType,
  componentId: ComponentId,
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
          id={componentId}
          properties={properties as FastboardTableProperties}
        />
      ),
      view: (
        <FastboardTable
          id={componentId}
          properties={properties as FastboardTableProperties}
        />
      ),
    },
    [ComponentType.Form]: {
      editable: (
        <FastboardForm
          id={componentId}
          properties={properties as FormProperties}
        />
      ),
      view: (
        <FastboardForm
          id={componentId}
          properties={properties as FormProperties}
        />
      ),
    },
    [ComponentType.Image]: {
      editable: null,
      view: null,
    },

    [ComponentType.Cards]: {
      editable: (
        <FastboardCards
          id={componentId}
          properties={properties as FastboardCardsProperties}
        />
      ),
      view: (
        <FastboardCards
          id={componentId}
          properties={properties as FastboardCardsProperties}
        />
      ),
    },
    [ComponentType.GroupChart]: {
      editable: (
        <FastboardGroupChart
          id={componentId}
          properties={properties as FastboardGroupChartProperties}
        />
      ),
      view: (
        <FastboardGroupChart
          id={componentId}
          properties={properties as FastboardGroupChartProperties}
        />
      ),
    },
    [ComponentType.Header]: {
      editable: (
        <FastboardHeader
          id={componentId}
          properties={properties as FastboardHeaderProperties}
        />
      ),
      view: (
        <FastboardHeader
          id={componentId}
          properties={properties as FastboardHeaderProperties}
        />
      ),
    },
  };

  if (!components[id]) {
    return null;
  }
  return components[id][type];
}

export function getPropertiesComponent(
  state: PropertiesDrawerState,
  onValueChange?: (properties: Record<string, any>) => void
) {
  const { selectedComponentId, type, properties } = state;
  if (!selectedComponentId) {
    return null;
  }

  const components = {
    [ComponentType.Table]: (
      <FastboardTablePropertiesComponent
        componentId={selectedComponentId}
        properties={properties as FastboardTableProperties}
        onValueChange={(properties) => {
          if (onValueChange) {
            onValueChange(properties);
          }
        }}
      />
    ),
    [ComponentType.Form]: (
      <FastboardFormProperties
        properties={properties as FormProperties}
        onValueChange={(properties) => {
          if (onValueChange) {
            onValueChange(properties);
          }
        }}
      />
    ),
    [ComponentType.Image]: null,
    [ComponentType.GroupChart]: (
      <FastboardGroupChartPropertiesComponent
        properties={properties as FastboardGroupChartProperties}
        onValueChange={(properties) => {
          if (onValueChange) {
            onValueChange(properties);
          }
        }}
      />
    ),
    [ComponentType.Cards]: (
      <FastboardCardsPropertiesComponent
        properties={properties as FastboardCardsProperties}
        onValueChange={(properties) => {
          if (onValueChange) {
            onValueChange(properties);
          }
        }}
      />
    ),
    [ComponentType.Header]: (
      <FastboardHeaderPropertiesComponent
        properties={properties as FastboardHeaderProperties}
        onValueChange={(properties) => {
          if (onValueChange) {
            onValueChange(properties);
          }
        }}
      />
    ),
  };

  if (!type) {
    return null;
  }
  return components[type];
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
