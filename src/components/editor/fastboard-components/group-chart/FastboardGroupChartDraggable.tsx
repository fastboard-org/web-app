import React from "react";
import { ComponentType } from "@/types/editor";
import Draggable from "@/components/editor/fastboard-components/Draggable";
import { FastboardGroupChartProperties } from "@/types/editor/group-chart-types";
import DraggableImage from "@/components/shared/DraggableImage";

export default function FastboardGroupChartDraggable() {
  return (
    <Draggable
      id="group-chart-draggable"
      data={{
        type: ComponentType.GroupChart,
        defaultProperties: FastboardGroupChartProperties.default(),
      }}
      dragSnapToOrigin
      name={"Group Chart"}
    >
      <DraggableImage name={"group-chart"} alt={"Group Chart"} />
    </Draggable>
  );
}
