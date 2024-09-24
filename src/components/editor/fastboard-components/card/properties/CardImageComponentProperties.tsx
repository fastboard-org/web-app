import AlignmentProperty from "@/components/shared/AlignmentProperty";
import ImageBoderProperty from "@/components/shared/ImageBorderProperty";
import { ImageComponentProperties } from "@/types/editor/card-types";
import { FastboardHeaderPhotoSize } from "@/types/editor/header-types";
import { Select, SelectItem, Slider } from "@nextui-org/react";

export default function CardImageComponentProperties({
  properties,
  dataKeys,
  onValueChange,
}: {
  properties: ImageComponentProperties;
  dataKeys: string[];
  onValueChange: (properties: ImageComponentProperties) => void;
}) {
  const { dataKey, alignment, border, size } = properties;

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
      <AlignmentProperty
        label="Alignment"
        position={alignment}
        onPositionChange={(position) =>
          onValueChange({ ...properties, alignment: position })
        }
      />
      <ImageBoderProperty
        label="Photo border"
        border={border}
        onBorderChange={(border) => onValueChange({ ...properties, border })}
      />
      <Slider
        label="Photo size"
        step={1}
        minValue={0}
        maxValue={2}
        value={
          size === FastboardHeaderPhotoSize.Small
            ? 0
            : size === FastboardHeaderPhotoSize.Medium
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
            size,
          });
        }}
      />
    </div>
  );
}
