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
        <div className="flex flex-row w-full justify-between">
          <CustomCard
            cardsPerRow={2}
            data={{
              header: "Header",
              footer: "Footer",
              body: [
                { key: "key1", value: "value1" },
                { key: "key2", value: "value2" },
              ],
            }}
          />
          <CustomCard
            cardsPerRow={2}
            data={{
              header: "Header",
              footer: "Footer",
              body: [
                { key: "key1", value: "value1" },
                { key: "key2", value: "value2" },
              ],
            }}
          />
          <CustomCard
            cardsPerRow={2}
            data={{
              header: "Header",
              footer: "Footer",
              body: [
                { key: "key1", value: "value1" },
                { key: "key2", value: "value2" },
              ],
            }}
          />
        </div>
      </Draggable>
    </div>
  );
}

{
  /* <Card css={{ width: '300px', height: '400px', padding: '0' }}>
      <CardHeader css={{ height: '20%', justifyContent: 'center', alignItems: 'center' }}>
        <Text size="$md" css={{ textAlign: 'center' }}>{headerText}</Text>
      </CardHeader>
      <Divider />
      <CardBody css={{ height: '65%', overflowY: 'auto' }}>
        {bodyData.map((item, index) => (
          <Text key={index} size={`calc(1.5rem - ${bodyData.length * 0.1}rem)`}>
            <b>{item.key}:</b> {item.value}
          </Text>
        ))}
      </CardBody>
      <Divider />
      <CardFooter css={{ height: '15%', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text size="$xs">{footerText}</Text>
      </CardFooter>
    </Card> */
}
