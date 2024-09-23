import {
  SpacerComponentProperties,
  VideoComponentProperties,
} from "@/types/editor/card-types";
import { Spacer } from "@nextui-org/react";
import React from "react";
import ReactPlayer from "react-player/lazy";

export default function SpacerComponent({
  properties,
  item,
}: {
  properties: SpacerComponentProperties;
  item: any;
}) {
  const { height } = properties;

  return (
    <Spacer
      style={{
        margin: `${height}px 0`,
      }}
    />
  );
}
