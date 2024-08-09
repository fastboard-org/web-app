import Draggable from "../Draggable";
import { ComponentType } from "@/types/editor";
import { FastboardCardsProperties } from "@/types/editor/cards-types";
import DraggableImage from "@/components/shared/DraggableImage";

export default function FastboardCardsDraggable() {
  return (
    <Draggable
      id="cards-draggable"
      data={{
        type: ComponentType.Cards,
        defaultProperties: FastboardCardsProperties.default(),
      }}
      dragSnapToOrigin
      name={"Cards"}
    >
      <DraggableImage name={"cards"} alt={"Cards"} />
    </Draggable>
  );
}
