import ColorPicker from "@/components/shared/ColorPicker";
import { SidebarProperties } from "@/types/editor/sidebar-types";
import { useTheme } from "next-themes";

export default function SidebarStyle({
  properties,
  onValueChange,
}: {
  properties: SidebarProperties;
  onValueChange: (properties: SidebarProperties) => void;
}) {
  const { theme } = useTheme();
  const { backgroundColor, textColor, selectedColor } = properties;

  return (
    <div className="flex flex-col gap-y-2">
      <ColorPicker
        label="Background color"
        initialColor={
          theme === "light" ? backgroundColor.light : backgroundColor.dark
        }
        onColorChange={(color) => {
          if (theme === "light") {
            onValueChange({
              ...properties,
              backgroundColor: { ...backgroundColor, light: color },
            });
          } else {
            onValueChange({
              ...properties,
              backgroundColor: { ...backgroundColor, dark: color },
            });
          }
        }}
      />
      <ColorPicker
        label="Text color"
        initialColor={theme === "light" ? textColor.light : textColor.dark}
        onColorChange={(color) => {
          if (theme === "light") {
            onValueChange({
              ...properties,
              textColor: { ...textColor, light: color },
            });
          } else {
            onValueChange({
              ...properties,
              textColor: { ...textColor, dark: color },
            });
          }
        }}
      />
      <ColorPicker
        label="Selected color"
        initialColor={
          theme === "light" ? selectedColor.light : selectedColor.dark
        }
        onColorChange={(color) => {
          if (theme === "light") {
            onValueChange({
              ...properties,
              selectedColor: { ...selectedColor, light: color },
            });
          } else {
            onValueChange({
              ...properties,
              selectedColor: { ...selectedColor, dark: color },
            });
          }
        }}
      />
    </div>
  );
}
