import AlignmentProperty from "@/components/shared/AlignmentProperty";
import ColorPicker from "@/components/shared/ColorPicker";
import IconPicker from "@/components/shared/IconPicker";
import { LinkComponentProperties } from "@/types/editor/card-types";
import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function CardLinkComponentProperties({
  properties,
  dataKeys,
  onValueChange,
}: {
  properties: LinkComponentProperties;
  dataKeys: string[];
  onValueChange: (properties: LinkComponentProperties) => void;
}) {
  const { theme } = useTheme();
  const {
    dataKey,
    label,
    defaultText,
    isExternal,
    externalIcon,
    showExternalIcon,
    alignment,
    fontSize,
    textColor,
    labelColor,
  } = properties;

  return (
    <div className="flex flex-col gap-y-2">
      <Select
        aria-label="Data key selection"
        label="Data key"
        labelPlacement="outside"
        placeholder="Select a data key"
        disallowEmptySelection
        selectedKeys={[dataKey]}
        onChange={(e) => {
          const key = e.target.value;
          onValueChange({ ...properties, dataKey: key });
        }}
      >
        {dataKeys?.map((key) => (
          <SelectItem key={key} value={key}>
            {key}
          </SelectItem>
        ))}
      </Select>
      <Input
        label="Label"
        labelPlacement="outside"
        placeholder="Enter label"
        value={label}
        onValueChange={(value) => {
          onValueChange({ ...properties, label: value });
        }}
      />
      <Input
        label="Default text"
        labelPlacement="outside"
        placeholder="Enter some text"
        value={defaultText}
        onValueChange={(value) => {
          onValueChange({ ...properties, defaultText: value });
        }}
      />
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-sm">Text size</h1>
        <Input
          aria-label="Text size input"
          className="w-1/3"
          type="number"
          placeholder="Enter some text"
          value={String(fontSize)}
          onValueChange={(value) => {
            onValueChange({ ...properties, fontSize: Number(value) });
          }}
        />
      </div>

      <AlignmentProperty
        position={alignment}
        onPositionChange={(position) =>
          onValueChange({ ...properties, alignment: position })
        }
      />

      <div className="flex flex-row justify-between items-center">
        <span className="text-sm">Is external</span>
        <Checkbox
          isSelected={isExternal}
          onValueChange={(value) => {
            onValueChange({
              ...properties,
              isExternal: value,
            });
          }}
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <span className="text-sm">Show anchow icon</span>
        <Checkbox
          isSelected={showExternalIcon}
          onValueChange={(value) => {
            onValueChange({
              ...properties,
              showExternalIcon: value,
            });
          }}
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <span className="text-sm">Anchor icon</span>
        <IconPicker
          icon={externalIcon}
          onIconSelect={(icon) => {
            onValueChange({
              ...properties,
              externalIcon: icon,
            });
          }}
        />
      </div>

      <ColorPicker
        label="Text color"
        initialColor={theme === "dark" ? textColor.dark : textColor.light}
        onColorChange={(color) => {
          if (theme === "dark") {
            onValueChange({
              ...properties,
              textColor: { dark: color, light: textColor.light },
            });
          } else {
            onValueChange({
              ...properties,
              textColor: { dark: textColor.dark, light: color },
            });
          }
        }}
      />
      <ColorPicker
        label="Label color"
        initialColor={theme === "dark" ? labelColor.dark : labelColor.light}
        onColorChange={(color) => {
          if (theme === "dark") {
            onValueChange({
              ...properties,
              labelColor: { dark: color, light: labelColor.light },
            });
          } else {
            onValueChange({
              ...properties,
              labelColor: { dark: labelColor.dark, light: color },
            });
          }
        }}
      />
    </div>
  );
}
