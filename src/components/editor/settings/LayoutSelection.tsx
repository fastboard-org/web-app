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
    label: formatString(layout),
  }));

  function formatString(input: string): string {
    let result = input.replace(/-/g, " ");

    if (result.length > 0) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }

    return result;
  }

  return (
    <Select
      label="Layout"
      labelPlacement="outside"
      placeholder="Select layout"
      startContent={
        <LayoutIcon
          type={selectedLayout}
          size={24}
          className="mr-2 text-default-400 text-opacity-75"
          variant="Bold"
        />
      }
      items={layouts}
      selectedKeys={selectedLayout ? [selectedLayout] : []}
      onChange={(e) => {
        if (!e.target.value) {
          return;
        }
        const layout = e.target.value as LayoutType;
        onLayoutSelect(layout);
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
              className="mr-2 text-default-400 text-opacity-75"
              variant="Bold"
            />
          }
        >
          {layout.label}
        </SelectItem>
      )}
    </Select>
  );
}
