import LayoutIcon from "@/components/shared/LayoutIcon";
import { LayoutType } from "@/types/editor";
import { Select, SelectItem } from "@nextui-org/react";

export default function LayoutSelection() {
  const layouts = Object.values(LayoutType).map((layout) => ({
    key: layout,
    label: layout,
  }));

  return (
    <Select
      label="Layout"
      labelPlacement="outside"
      placeholder="Select layout"
      startContent={
        <LayoutIcon type={LayoutType.Full} size={24} className="mr-2" />
      }
      items={layouts}
    >
      {(layout) => (
        <SelectItem
          key={layout.key}
          value={layout.key}
          startContent={
            <LayoutIcon
              type={layout.key as LayoutType}
              size={24}
              className="mr-2"
            />
          }
        >
          {layout.label.toUpperCase()}
        </SelectItem>
      )}
    </Select>
  );
}
