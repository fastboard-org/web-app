import React from "react";
import { ComponentType } from "@/types/editor";
import Draggable from "./Draggable";
import { FastboardTableProperties } from "@/types/editor/table-types";
import DraggableImage from "@/components/shared/DraggableImage";

export default function FastboardTableDraggable() {
  return (
    <Draggable
      id="table-draggable"
      data={{
        type: ComponentType.Table,
        defaultProperties: FastboardTableProperties.default(),
      }}
      dragSnapToOrigin
      name={"Table"}
    >
      <DraggableImage name={"table"} alt={"Table"} />
    </Draggable>
  );
}
