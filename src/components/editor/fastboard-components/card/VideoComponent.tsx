import { VideoComponentProperties } from "@/types/editor/card-types";
import React from "react";
import ReactPlayer from "react-player/lazy";

export default function VideoComponent({
  properties,
  item,
}: {
  properties: VideoComponentProperties;
  item: any;
}) {
  const { dataKey } = properties;

  return (
    <div className="border h-full max-h-96">
      <ReactPlayer
        className="react-player"
        url={
          dataKey && item[dataKey] !== ""
            ? item[dataKey]
            : "https://youtu.be/dQw4w9WgXcQ"
        }
        width="100%"
        height="100%"
        controls={true}
        config={{
          youtube: {
            playerVars: { showinfo: 1, controls: 1 },
          },
        }}
        onError={(e) => {
          console.error(e.target.error);
        }}
      />
    </div>
  );
}
