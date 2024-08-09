import React from "react";
import { ComponentType } from "@/types/editor";
import Draggable from "./Draggable";
import { FastboardTableProperties } from "@/types/editor/table-types";
import DraggableImage from "@/components/shared/DraggableImage";

export default function FastboardTableDraggable() {

  return (
      <div className="flex flex-col justify-center w-[48%] gap-2">
          <Draggable
              id="table-draggable"
              data={{
                  type: ComponentType.Table,
                  defaultProperties: FastboardTableProperties.default(),
              }}
              dragSnapToOrigin
          >
              <DraggableImage name={"table"} alt={"Table"}/>
          </Draggable>
          <h4 className={"text-md pb-2 text-center"}>Table</h4>
      </div>
  );
}
