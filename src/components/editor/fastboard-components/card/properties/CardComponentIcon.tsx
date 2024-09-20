import { CardComponentType } from "@/types/editor/card-types";
import { IconProps, Image, Link, Text, VideoSquare } from "iconsax-react";

export default function CardComponentIcon({
  type,
  size,
  variant,
  className,
}: {
  type: CardComponentType;
  size: number;
  variant?: IconProps["variant"];
  className?: string;
}) {
  switch (type) {
    case CardComponentType.Text:
      return <Text size={size} className={className} />;
    case CardComponentType.Image:
      return <Image size={size} className={className} />;
    case CardComponentType.Link:
      return <Link size={size} className={className} />;
    case CardComponentType.Video:
      return <VideoSquare size={size} className={className} />;
    default:
      return null;
  }
}
