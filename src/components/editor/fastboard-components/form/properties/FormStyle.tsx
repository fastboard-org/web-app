import ColorPicker from "@/components/shared/ColorPicker";
import { FormProperties } from "@/types/editor/form";
import { useTheme } from "next-themes";

export default function FormStyle({
  properties,
  onValueChange,
}: {
  properties: FormProperties;
  onValueChange: (properties: FormProperties) => void;
}) {
  const { theme } = useTheme();
  const { submitColor } = properties;

  return (
    <div className="flex flex-col gap-y-2">
      <ColorPicker
        label="Submit color"
        initialColor={theme === "light" ? submitColor.light : submitColor.dark}
        onColorChange={(color) => {
          if (theme === "light") {
            onValueChange({
              ...properties,
              submitColor: {
                light: color,
                dark: submitColor.dark,
              },
            });
          } else {
            onValueChange({
              ...properties,
              submitColor: {
                light: submitColor.light,
                dark: color,
              },
            });
          }
        }}
      />
    </div>
  );
}
