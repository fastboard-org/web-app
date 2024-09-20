import AlignmentProperty from "@/components/shared/AlignmentProperty";
import ImageBoderProperty from "@/components/shared/ImageBorderProperty";
import { ImageComponentProperties } from "@/types/editor/card-types";
import { Select, SelectItem } from "@nextui-org/react";

export default function CardImageComponentProperties({
  properties,
  dataKeys,
  onValueChange,
}: {
  properties: ImageComponentProperties;
  dataKeys: string[];
  onValueChange: (properties: ImageComponentProperties) => void;
}) {
  const { dataKey, alignment, border } = properties;

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
    </div>
  );
}
