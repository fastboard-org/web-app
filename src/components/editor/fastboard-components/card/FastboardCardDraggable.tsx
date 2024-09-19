import Draggable from "../Draggable";
import { ComponentType } from "@/types/editor";
import DraggableImage from "@/components/shared/DraggableImage";
import { CardProperties } from "@/types/editor/card-types";

export default function FastboardCardDraggable() {
  return (
    <Draggable
      id="card-draggable"
      data={{
        type: ComponentType.Card,
        defaultProperties: CardProperties.default(),
      }}
      dragSnapToOrigin
      name={"Card"}
    >
      <DraggableImage name={"card"} alt={"Card"} />
    </Draggable>
  );
}
