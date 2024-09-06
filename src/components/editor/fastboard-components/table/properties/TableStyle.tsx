import CheckBoxProperty from "@/components/shared/CheckBoxProperty";
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
  const {
    hideHeader,
    headerSticky,
    isStriped,
    headerColor,
    addOns: { addRowForm },
  } = properties;

  return (
    <div className="flex flex-col gap-2">
      <CheckBoxProperty
        label="Hide header"
        isSelected={hideHeader}
        onValueChange={(value) => {
          onValueChange({
            ...properties,
            hideHeader: value,
          });
        }}
      />
      <CheckBoxProperty
        label="Stripped"
        isSelected={isStriped}
        onValueChange={(value) => {
          onValueChange({
            ...properties,
            isStriped: value,
          });
        }}
      />
      <div className="flex flex-row justify-between">
        <span>Header color</span>
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

      {addRowForm && (
        <div className="flex flex-row justify-between">
          <span>Add row color</span>
          <ColorPicker
            initialColor={addRowForm.buttonColor}
            onColorChange={(color) => {
              onValueChange({
                ...properties,
                addOns: {
                  ...properties.addOns,
                  addRowForm: {
                    ...addRowForm,
                    buttonColor: color,
                  },
                },
              });
            }}
          />
        </div>
      )}
    </div>
  );
}
