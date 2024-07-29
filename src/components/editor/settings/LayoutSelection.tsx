import LayoutIcon from "@/components/shared/LayoutIcon";
import { LayoutType } from "@/types/editor/layout-types";
import { Select, SelectItem } from "@nextui-org/react";

export default function LayoutSelection({
  selectedLayout,
  onLayoutSelect,
}: {
  selectedLayout: LayoutType | null;
  onLayoutSelect: (layoutType: LayoutType) => void;
}) {
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
      selectedKeys={selectedLayout ? [selectedLayout] : []}
      onChange={(e) => {
        onLayoutSelect(e.target.value as LayoutType);
      }}
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
