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
    headerTextColor,
    addOns: { addRowForm },
  } = properties;

  return (
    <div className="flex flex-col gap-2">
      <CheckBoxProperty
        label="Hide header"
        isSelected={hideHeader}
        onValueChange={(isSelected) => {
          onValueChange({
            ...properties,
            hideHeader: isSelected,
          });
        }}
      />
      <CheckBoxProperty
        label="Stripped"
        isSelected={isStriped}
        onValueChange={(isSelected) => {
          onValueChange({
            ...properties,
            isStriped: isSelected,
          });
        }}
      />
      <ColorPicker
        label="Header color"
        initialColor={theme === "light" ? headerColor.light : headerColor.dark}
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
      <ColorPicker
        label="Header text"
        initialColor={
          theme === "light" ? headerTextColor.light : headerTextColor.dark
        }
        onColorChange={(color) => {
          if (theme === "light") {
            onValueChange({
              ...properties,
              headerTextColor: {
                light: color,
                dark: headerTextColor.dark,
              },
            });
          } else {
            onValueChange({
              ...properties,
              headerTextColor: {
                light: headerTextColor.light,
                dark: color,
              },
            });
          }
        }}
      />

      {addRowForm && (
        <ColorPicker
          label="Add row color"
          initialColor={
            theme === "light"
              ? addRowForm.buttonColor.light
              : addRowForm.buttonColor.dark
          }
          onColorChange={(color) => {
            if (theme === "light") {
              onValueChange({
                ...properties,
                addOns: {
                  ...properties.addOns,
                  addRowForm: {
                    ...addRowForm,
                    buttonColor: {
                      light: color,
                      dark: addRowForm.buttonColor.dark,
                    },
                  },
                },
              });
            } else {
              onValueChange({
                ...properties,
                addOns: {
                  ...properties.addOns,
                  addRowForm: {
                    ...addRowForm,
                    buttonColor: {
                      light: addRowForm.buttonColor.light,
                      dark: color,
                    },
                  },
                },
              });
            }
          }}
        />
      )}
      {addRowForm && (
        <ColorPicker
          label="Add row text"
          initialColor={
            theme === "light"
              ? addRowForm.buttonTextColor.light
              : addRowForm.buttonTextColor.dark
          }
          onColorChange={(color) => {
            if (theme === "light") {
              onValueChange({
                ...properties,
                addOns: {
                  ...properties.addOns,
                  addRowForm: {
                    ...addRowForm,
                    buttonTextColor: {
                      light: color,
                      dark: addRowForm.buttonTextColor.dark,
                    },
                  },
                },
              });
            } else {
              onValueChange({
                ...properties,
                addOns: {
                  ...properties.addOns,
                  addRowForm: {
                    ...addRowForm,
                    buttonTextColor: {
                      light: addRowForm.buttonTextColor.light,
                      dark: color,
                    },
                  },
                },
              });
            }
          }}
        />
      )}
    </div>
  );
}
