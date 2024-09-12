import {
  FastboardHeaderProperties,
  FastboardHeaderPosition,
  FastboardHeaderFontSize,
  FastboardHeaderPhotoBorder,
  FastboardHeaderPhotoSize,
} from "@/types/editor/header-types";
import {
  Input,
  Accordion,
  AccordionItem,
  Checkbox,
  ButtonGroup,
  Button,
  Slider,
} from "@nextui-org/react";
import AlignIcon from "@/components/shared/icons/AlignIcon";
import ColorPicker from "@/components/shared/ColorPicker";
import { useTheme } from "next-themes";

const FastboardHeaderPropertiesComponent = ({
  properties,
  onValueChange,
}: {
  properties: FastboardHeaderProperties;
  onValueChange: (properties: FastboardHeaderProperties) => void;
}) => {
  const { theme } = useTheme();
  const {
    title,
    photo,
    showThemeSwitcher,
    position,
    divider,
    backgroundColor,
    textColor,
  } = properties;

  return (
    <Accordion
      selectionMode="multiple"
      isCompact
      fullWidth
      defaultExpandedKeys={["basic", "style"]}
    >
      <AccordionItem
        key="basic"
        title="Basic"
        className="pb-2"
        classNames={{
          title: "font-medium",
        }}
      >
        <div className="py-2">
          <Input
            label="Header Title"
            labelPlacement="outside"
            value={title.text}
            onValueChange={(title) => {
              onValueChange({
                ...properties,
                title: {
                  ...properties.title,
                  text: title,
                },
              });
            }}
          />
        </div>

        <div className="py-2">
          <Input
            label="Photo URL"
            labelPlacement="outside"
            placeholder="https://example.com/photo.jpg"
            value={photo.url}
            onValueChange={(photo_url) => {
              onValueChange({
                ...properties,
                photo: {
                  ...properties.photo,
                  url: photo_url,
                },
              });
            }}
          />
        </div>

        <div className="flex flex-row justify-between">
          <span className="text-sm">Show Theme Swithcer</span>
          <Checkbox
            isSelected={showThemeSwitcher}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                showThemeSwitcher: value,
              });
            }}
          />
        </div>
      </AccordionItem>

      <AccordionItem
        key="style"
        title="Style"
        className="pb-2"
        classNames={{
          title: "font-medium",
        }}
      >
        <div className="py-2">
          <p className="text-small pb-1">Position</p>
          <ButtonGroup className="w-full">
            {Object.entries(FastboardHeaderPosition).map(([key, value]) => (
              <Button
                className={
                  position === value
                    ? "bg-foreground bg-opacity-[0.07] w-full"
                    : "bg-foreground bg-opacity-5 opacity-60 w-full"
                }
                key={value}
                startContent={
                  <AlignIcon
                    align={key as string}
                    selected={position === value ? true : false}
                    size={24}
                  />
                }
                onClick={() => {
                  onValueChange({
                    ...properties,
                    position: value,
                  });
                }}
              >
                {key}
              </Button>
            ))}
          </ButtonGroup>

          <p className="pt-4 text-small pb-1">Photo Border Radius</p>
          <ButtonGroup className="w-full">
            {Object.entries(FastboardHeaderPhotoBorder).map(([key, value]) => (
              <Button
                className={
                  photo.border === value
                    ? "bg-foreground bg-opacity-[0.07] w-full"
                    : "bg-foreground bg-opacity-5 opacity-60 w-full"
                }
                key={value}
                startContent={
                  <div
                    className={
                      photo.border === value
                        ? "bg-primary overflow-hidden"
                        : "bg-foreground-400 bg-opacity-75 overflow-hidden"
                    }
                    style={{
                      borderRadius:
                        value === "none" ? 0 : value === "lg" ? 8 : 100,
                    }}
                  >
                    <div
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  </div>
                }
                onClick={() => {
                  onValueChange({
                    ...properties,
                    photo: {
                      ...properties.photo,
                      border: value,
                    },
                  });
                }}
              >
                {key}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <div className="pt-6">
          <Slider
            label="Title Size"
            step={1}
            minValue={0}
            maxValue={2}
            value={
              title.size === FastboardHeaderFontSize.Small
                ? 0
                : title.size === FastboardHeaderFontSize.Medium
                ? 1
                : 2
            }
            hideValue={true}
            marks={[
              {
                value: 0,
                label: "Small",
              },
              {
                value: 1,
                label: "Medium",
              },
              {
                value: 2,
                label: "Large",
              },
            ]}
            onChange={(e) => {
              const selectedValue = e as number;
              const size =
                selectedValue === 0
                  ? FastboardHeaderFontSize.Small
                  : selectedValue === 1
                  ? FastboardHeaderFontSize.Medium
                  : FastboardHeaderFontSize.Large;
              onValueChange({
                ...properties,
                title: {
                  ...properties.title,
                  size: size,
                },
              });
            }}
          />
        </div>

        <div className="pt-6">
          <Slider
            label="Photo Size"
            step={1}
            minValue={0}
            maxValue={2}
            value={
              photo.size === FastboardHeaderPhotoSize.Small
                ? 0
                : photo.size === FastboardHeaderPhotoSize.Medium
                ? 1
                : 2
            }
            hideValue={true}
            marks={[
              {
                value: 0,
                label: "Small",
              },
              {
                value: 1,
                label: "Medium",
              },
              {
                value: 2,
                label: "Large",
              },
            ]}
            onChange={(e) => {
              const selectedValue = e as number;
              const size =
                selectedValue === 0
                  ? FastboardHeaderPhotoSize.Small
                  : selectedValue === 1
                  ? FastboardHeaderPhotoSize.Medium
                  : FastboardHeaderPhotoSize.Large;
              onValueChange({
                ...properties,
                photo: {
                  ...properties.photo,
                  size: size,
                },
              });
            }}
          />
        </div>

        <div className="pt-6">
          <Checkbox
            isSelected={divider}
            onValueChange={(isSelected) => {
              onValueChange({
                ...properties,
                divider: isSelected,
              });
            }}
          >
            Show divider
          </Checkbox>
        </div>
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
        <div className="flex flex-row justify-between items-center">
          <span className="text-small">Text color</span>
          <ColorPicker
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
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default FastboardHeaderPropertiesComponent;
