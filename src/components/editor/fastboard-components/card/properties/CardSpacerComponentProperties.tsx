import { SpacerComponentProperties } from "@/types/editor/card-types";
import { Input } from "@nextui-org/react";

export default function CardSpacerComponentProperties({
  properties,
  dataKeys,
  onValueChange,
}: {
  properties: SpacerComponentProperties;
  dataKeys: string[];
  onValueChange: (properties: SpacerComponentProperties) => void;
}) {
  const { height } = properties;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-sm">Spacing</h2>
        <Input
          aria-label="Height"
          type="number"
          min={0}
          className="w-20"
          value={String(height)}
          onChange={(e) => {
            onValueChange({
              ...properties,
              height: parseInt(e.target.value),
            });
          }}
        />
      </div>
    </div>
  );
}
