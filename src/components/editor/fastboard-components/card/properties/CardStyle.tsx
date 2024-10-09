import ColorPicker from "@/components/shared/ColorPicker";
import { CardProperties } from "@/types/editor/card-types";
import { Checkbox, Input } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function CardStyle({
  properties,
  onValueChange,
}: {
  properties: CardProperties;
  onValueChange: (properties: CardProperties) => void;
}) {
  const { theme } = useTheme();
  const { spacing, backgroundColor, showShadow } = properties;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-sm">Show border</h2>
        <Checkbox
          isSelected={showShadow}
          onValueChange={(isSelected) => {
            onValueChange({
              ...properties,
              showShadow: isSelected,
            });
          }}
        />
      </div>
      <ColorPicker
        label="Background color"
        initialColor={
          theme === "light" ? backgroundColor.light : backgroundColor.dark
        }
        onColorChange={(color) => {
          if (theme === "light") {
            onValueChange({
              ...properties,
              backgroundColor: {
                light: color,
                dark: backgroundColor.dark,
              },
            });
          } else {
            onValueChange({
              ...properties,
              backgroundColor: {
                light: backgroundColor.light,
                dark: color,
              },
            });
          }
        }}
      />
    </div>
  );
}
