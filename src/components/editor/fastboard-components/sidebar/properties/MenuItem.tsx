import LayoutSelection from "@/components/editor/settings/LayoutSelection";
import IconPicker from "@/components/shared/IconPicker";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { IconType } from "@/types/editor/icon-types";
import { MenuItemProperties } from "@/types/editor/sidebar-types";
import { Input, Spacer } from "@nextui-org/react";

export default function MenuItem({
  properties,
  onValueChange,
}: {
  properties: MenuItemProperties;
  onValueChange: (properties: MenuItemProperties) => void;
}) {
  const { key, label, caption, layout, icon } = properties;
  const { changeLayout } = useDashboard();

  return (
    <div className="flex flex-col gap-2">
      <Input
        aria-label="Menu item label property"
        label="Label"
        labelPlacement="outside"
        placeholder="Label"
        value={label}
        onValueChange={(value) => {
          onValueChange({
            ...properties,
            label: value,
          });
        }}
      />
      <Input
        aria-label="Menu item caption property"
        label="Caption"
        labelPlacement="outside"
        placeholder="Caption"
        value={caption}
        onValueChange={(value) => {
          onValueChange({
            ...properties,
            caption: value,
          });
        }}
      />
      <LayoutSelection
        selectedLayout={layout}
        onLayoutSelect={(layout) => {
          changeLayout(key, 0, layout);
          onValueChange({
            ...properties,
            layout: layout,
          });
        }}
      />
      <Spacer y={1} />
      <div className="flex flex-row justify-between items-center">
        <span className="text-md">Icon</span>
        <IconPicker
          icon={icon}
          onIconSelect={(icon) => {
            onValueChange({
              ...properties,
              icon: icon,
            });
          }}
        />
      </div>
    </div>
  );
}
