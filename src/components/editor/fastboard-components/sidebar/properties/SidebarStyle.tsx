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
  const { backgroundColor } = properties;

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <span className="text-small">Background color</span>
        <ColorPicker
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
      </div>
    </div>
  );
}
