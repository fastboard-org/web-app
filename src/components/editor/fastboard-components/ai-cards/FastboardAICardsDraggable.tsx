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
    >
      <DraggableImage name={"search-cards"} alt={"Search Cards"} />
    </Draggable>
  );
}
