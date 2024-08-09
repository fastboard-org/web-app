import Draggable from "../Draggable";
import { ComponentType } from "@/types/editor";
import { FastboardCardsProperties } from "@/types/editor/cards-types";
import DraggableImage from "@/components/shared/DraggableImage";

export default function FastboardCardsDraggable() {
  return (
      <div className="flex flex-col justify-center w-[48%] gap-2">
          <Draggable
              id="cards-draggable"
              data={{
                  type: ComponentType.Cards,
                  defaultProperties: FastboardCardsProperties.default(),
              }}
              dragSnapToOrigin
          >
              <DraggableImage name={"card"} alt={"Card"}/>
          </Draggable>
          <h4 className={"text-md pb-2 text-center"}>Cards</h4>
      </div>
  );
}
