import { LayoutType } from "@/types/editor/layout-types";
import { Element2, IconProps, RowHorizontal, RowVertical } from "iconsax-react";
import FullLayoutIcon from "./icons/FullLayoutIcon";
import BottomSplitLayoutIcon from "./icons/BottomSplitLayoutIcon";

export default function LayoutIcon({
  type,
  size,
  variant,
  className,
}: {
  type: LayoutType | null;
  size: number;
  variant?: IconProps["variant"];
  className?: string;
}) {
  switch (type) {
    case LayoutType.Full:
      return <FullLayoutIcon size={size} className={className} />;
    case LayoutType.Row:
      return (
        <RowVertical size={size} className={className} variant={variant} />
      );
    case LayoutType.Column:
      return (
        <RowHorizontal size={size} className={className} variant={variant} />
      );
    case LayoutType.RightSplit:
      return <Element2 size={size} className={className} variant={variant} />;
    case LayoutType.BottomSplit:
      return <BottomSplitLayoutIcon size={size} className={className} />;
    default:
      return null;
  }
}
