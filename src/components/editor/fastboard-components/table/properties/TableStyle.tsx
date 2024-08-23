import ColorPicker from "@/components/shared/ColorPicker";
import { FastboardTableProperties } from "@/types/editor/table-types";
import { Checkbox } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function TableStyle({
  properties,
  onValueChange,
}: {
  properties: FastboardTableProperties;
  onValueChange: (properties: FastboardTableProperties) => void;
}) {
  const { theme } = useTheme();
  const { hideHeader, headerSticky, isStriped, headerColor } = properties;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <span className="text-sm">Hide header</span>
        <Checkbox
          isSelected={hideHeader}
          onValueChange={(isSelected) => {
            onValueChange({
              ...properties,
              hideHeader: isSelected,
            });
          }}
        />
      </div>{" "}
      <div className="flex flex-row justify-between">
        <span className="text-sm">Hide sticky</span>
        <Checkbox
          isSelected={headerSticky}
          onValueChange={(isSelected) => {
            onValueChange({
              ...properties,
              headerSticky: isSelected,
            });
          }}
        />
      </div>
      <div className="flex flex-row justify-between">
        <span className="text-sm">Stripped</span>
        <Checkbox
          isSelected={isStriped}
          onValueChange={(isSelected) => {
            onValueChange({
              ...properties,
              isStriped: isSelected,
            });
          }}
        />
      </div>
      <div className="flex flex-row justify-between">
        <span className="text-sm">Header color</span>
        <ColorPicker
          initialColor={
            theme === "light" ? headerColor.light : headerColor.dark
          }
          onColorChange={(color) => {
            if (theme === "light") {
              onValueChange({
                ...properties,
                headerColor: {
                  light: color,
                  dark: headerColor.dark,
                },
              });
            } else {
              onValueChange({
                ...properties,
                headerColor: {
                  light: headerColor.light,
                  dark: color,
                },
              });
            }
          }}
        />
      </div>
    </div>
  );
}
