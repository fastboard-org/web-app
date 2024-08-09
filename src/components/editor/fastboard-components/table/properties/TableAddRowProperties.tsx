import { AddRowFormProperties } from "@/types/editor/table-types";
import { Input } from "@nextui-org/react";

export default function TableAddRowProperties({
  properties,
  onValueChange,
}: {
  properties: AddRowFormProperties;
  onValueChange: (properties: AddRowFormProperties) => void;
}) {
  const { buttonLabel } = properties;
  return (
    <div>
      <Input
        label="Button Label"
        labelPlacement="outside"
        value={buttonLabel}
        onValueChange={(value) =>
          onValueChange({ ...properties, buttonLabel: value })
        }
      />
    </div>
  );
}
