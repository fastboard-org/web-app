import { SelectOptionProperties } from "@/types/editor/form";
import { Input } from "@nextui-org/react";

export default function FormSelectOption({
  option,
  onValueChange,
}: {
  option: SelectOptionProperties;
  onValueChange: (option: SelectOptionProperties) => void;
}) {
  const { label } = option;

  return (
    <div>
      <Input
        aria-label="Number input label property"
        label="Label"
        labelPlacement="outside"
        placeholder="Label"
        value={label}
        onValueChange={(value) => {
          onValueChange({
            ...option,
            label: value,
          });
        }}
      />
    </div>
  );
}
