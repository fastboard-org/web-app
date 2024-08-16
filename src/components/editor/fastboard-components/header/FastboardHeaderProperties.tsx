import {
  FastboardHeaderProperties,
  FastboardHeaderPosition,
  FastboardHeaderFontSize,
  FastboardHeaderPhotoBorder,
} from "@/types/editor/header-types";
import {
  Input,
  Accordion,
  AccordionItem,
  Select,
  SelectItem,
  Checkbox,
} from "@nextui-org/react";

const FastboardHeaderPropertiesComponent = ({
  properties,
  onValueChange,
}: {
  properties: FastboardHeaderProperties;
  onValueChange: (properties: FastboardHeaderProperties) => void;
}) => {
  const { title, photo, position, divider } = properties;

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
          <Select
            aria-label="Header position selector"
            items={Object.keys(FastboardHeaderPosition) as Iterable<any>}
            disabledKeys={[]}
            selectedKeys={[position]}
            label="Position"
            labelPlacement="outside"
            placeholder="Select header position"
            onChange={(e) => {
              onValueChange({
                ...properties,
                position: e.target.value as FastboardHeaderPosition,
              });
            }}
            errorMessage="Something went wrong, position not found"
          >
            {Object.keys(FastboardHeaderPosition).map((key) => (
              <SelectItem
                key={
                  FastboardHeaderPosition[
                    key as keyof typeof FastboardHeaderPosition
                  ]
                }
              >
                {key}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="py-2">
          <Select
            aria-label="Title size selector"
            items={Object.keys(FastboardHeaderFontSize) as Iterable<any>}
            disabledKeys={[]}
            selectedKeys={[title.size]}
            label="Title Size"
            labelPlacement="outside"
            placeholder="Select title size"
            onChange={(e) => {
              onValueChange({
                ...properties,
                title: {
                  ...properties.title,
                  size: e.target.value as FastboardHeaderFontSize,
                },
              });
            }}
            errorMessage="Something went wrong, title size not found"
          >
            {Object.keys(FastboardHeaderFontSize).map((key) => (
              <SelectItem
                key={
                  FastboardHeaderFontSize[
                    key as keyof typeof FastboardHeaderFontSize
                  ]
                }
              >
                {key}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="py-2">
          <Select
            aria-label="Photo border selector"
            items={Object.keys(FastboardHeaderPhotoBorder) as Iterable<any>}
            disabledKeys={[]}
            selectedKeys={[photo.border]}
            label="Photo Border"
            labelPlacement="outside"
            placeholder="Select photo border"
            onChange={(e) => {
              onValueChange({
                ...properties,
                photo: {
                  ...properties.photo,
                  border: e.target
                    .value as keyof typeof FastboardHeaderPhotoBorder,
                },
              });
            }}
            errorMessage="Something went wrong, photo border not found"
          >
            {Object.keys(FastboardHeaderPhotoBorder).map((key) => (
              <SelectItem
                key={
                  FastboardHeaderPhotoBorder[
                    key as keyof typeof FastboardHeaderPhotoBorder
                  ]
                }
              >
                {key}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="py-2">
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
      </AccordionItem>
    </Accordion>
  );
};

export default FastboardHeaderPropertiesComponent;
