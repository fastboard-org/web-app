import { Alignment } from "@/components/shared/AlignmentProperty";
import { ImageComponentProperties } from "@/types/editor/card-types";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ImageComponent({
  properties,
  item,
}: {
  properties: ImageComponentProperties;
  item: any;
}) {
  const { dataKey, alignment, border } = properties;
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [dataKey]);

  return (
    <div
      className={
        "flex size-auto " +
        (alignment === Alignment.Center
          ? "justify-center"
          : alignment === Alignment.Right
          ? "justify-end"
          : "justify-start")
      }
    >
      <Image
        src={
          imageError
            ? "/ImageErrorImage.svg"
            : dataKey !== ""
            ? item[dataKey]
            : "/ImageErrorImage.svg"
        }
        className={"object-contain " + (imageError ? "dark:invert " : "")}
        alt="Card image"
        width={"200px"}
        height={"100%"}
        radius={border as any}
        onError={() => setImageError(true)}
      />
    </div>
  );
}
