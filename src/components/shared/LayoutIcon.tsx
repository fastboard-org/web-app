import { LayoutType } from "@/types/editor/layout-types";
import { RowHorizontal, RowVertical } from "iconsax-react";

export default function LayoutIcon({
  type,
  size,
  className,
}: {
  type: LayoutType | null;
  size: number;
  variant?: string;
  className?: string;
}) {
  switch (type) {
    case LayoutType.Full:
      return <RowHorizontal size={size} className={className} />;
    case LayoutType.Row:
      return <RowVertical size={size} className={className} />;
    default:
      return null;
  }
}
