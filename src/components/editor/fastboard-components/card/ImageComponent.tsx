import { Alignment } from "@/components/shared/AlignmentProperty";
import { ImageComponentProperties } from "@/types/editor/card-types";
import { FastboardHeaderPhotoSize } from "@/types/editor/header-types";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ImageComponent({
  properties,
  item,
}: {
  properties: ImageComponentProperties;
  item: any;
}) {
  const { dataKey, alignment, border, size } = properties;
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [dataKey]);

  function getSize(size: FastboardHeaderPhotoSize) {
    switch (size) {
      case FastboardHeaderPhotoSize.Small:
        return "100px";
      case FastboardHeaderPhotoSize.Medium:
        return "150px";
      case FastboardHeaderPhotoSize.Large:
        return "300px";
    }
  }

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
        className={
          "object-cover " + (imageError || dataKey === "" ? "dark:invert " : "")
        }
        style={{
          maxHeight: getSize(size),
          maxWidth: getSize(size),
        }}
        alt="Card image"
        radius={border as any}
        width={getSize(size)}
        height={getSize(size)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}
