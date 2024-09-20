import { VideoComponentProperties } from "@/types/editor/card-types";
import { Select, SelectItem } from "@nextui-org/react";

export default function CardVideoComponentProperties({
  properties,
  dataKeys,
  onValueChange,
}: {
  properties: VideoComponentProperties;
  dataKeys: string[];
  onValueChange: (properties: VideoComponentProperties) => void;
}) {
  const { dataKey } = properties;

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
    </div>
  );
}
