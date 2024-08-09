import React from "react";
import { ComponentType } from "@/types/editor";
import Draggable from "../Draggable";
import { FormProperties } from "@/types/editor/form";
import DraggableImage from "@/components/shared/DraggableImage";

export default function FastboardFormDraggable() {
  return (
    <Draggable
      id="form-draggable"
      data={{
        type: ComponentType.Form,
        defaultProperties: FormProperties.default(),
      }}
      dragSnapToOrigin
      name={"Form"}
    >
      <DraggableImage name={"form"} alt={"Form"} />
    </Draggable>
  );
}
