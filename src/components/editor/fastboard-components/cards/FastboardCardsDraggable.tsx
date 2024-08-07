import Draggable from "../Draggable";
import { ComponentType } from "@/types/editor";
import { FastboardCardsProperties } from "@/types/editor/cards-types";
import CustomCard from "./CustomCard";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

export default function FastboardCardsDraggable() {
  return (
    <div className="flex flex-col justify-center">
      <h4 className={"text-md pb-2"}>Cards</h4>
      <Draggable
        id="cards-draggable"
        data={{
          type: ComponentType.Cards,
          defaultProperties: FastboardCardsProperties.default(),
        }}
        dragSnapToOrigin
      >
        <div className="flex flex-row overflow-hidden w-full justify-between">
          <CustomCard
            data={{
              header: "Header",
              footer: "Footer",
              body: [{ key: "key", value: "value" }],
            }}
            cardsPerRow={3}
            height="160px"
          />
          <CustomCard
            data={{
              header: "Header",
              footer: "Footer",
              body: [{ key: "key", value: "value" }],
            }}
            cardsPerRow={3}
            height="160px"
          />
          <CustomCard
            data={{
              header: "Header",
              footer: "Footer",
              body: [{ key: "key", value: "value" }],
            }}
            cardsPerRow={3}
            height="160px"
          />
        </div>
      </Draggable>
    </div>
  );
}
