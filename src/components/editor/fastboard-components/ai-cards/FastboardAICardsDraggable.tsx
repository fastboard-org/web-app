import Draggable from "../Draggable";
import { ComponentType } from "@/types/editor";
import DraggableImage from "@/components/shared/DraggableImage";
import { BsStars } from "react-icons/bs";
import React from "react";
import { FastboardAICardsProperties } from "@/types/editor/ai-cards-types";

export default function FastboardAICardsDraggable() {
  return (
    <Draggable
      id="ai-cards-draggable"
      data={{
        type: ComponentType.AiCards,
        defaultProperties: FastboardAICardsProperties.default(),
      }}
      dragSnapToOrigin
      name={"Search Cards"}
      customClassName={"relative"}
    >
      <BsStars className={"absolute -right-3 -top-2 text-default"} size={25} />
      <DraggableImage name={"search-cards"} alt={"Search Cards"} />
    </Draggable>
  );
}
