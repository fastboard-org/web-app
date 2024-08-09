import React from "react";
import { ComponentType } from "@/types/editor";
import Draggable from "@/components/editor/fastboard-components/Draggable";
import { FastboardGroupChartProperties } from "@/types/editor/group-chart-types";
import DraggableImage from "@/components/shared/DraggableImage";

export default function FastboardGroupChartDraggable() {
  return (
      <div className="flex flex-col justify-center w-[48%] gap-2">
          <Draggable
              id="group-chart-draggable"
              data={{
                  type: ComponentType.GroupChart,
                  defaultProperties: FastboardGroupChartProperties.default(),
              }}
              dragSnapToOrigin
          >
              <DraggableImage name={"group-chart"} alt={"Group Chart"}/>
          </Draggable>
          <h4 className={"text-md pb-2 text-center"}>Group Chart</h4>
      </div>
  );
}
