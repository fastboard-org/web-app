import React from "react";
import { ComponentType } from "@/types/editor";
import Draggable from "../Draggable";
import { FormProperties } from "@/types/editor/form";
import DraggableImage from "@/components/shared/DraggableImage";

export default function FastboardFormDraggable() {
  return (
      <div className="flex flex-col justify-center w-[48%] gap-2">
          <Draggable
              id="form-draggable"
              data={{
                  type: ComponentType.Form,
                  defaultProperties: FormProperties.default(),
              }}
              dragSnapToOrigin
          >
              <DraggableImage name={"form"} alt={"Form"}/>
          </Draggable>
          <h4 className={"text-md pb-2 text-center"}>Form</h4>
      </div>
  );
}
