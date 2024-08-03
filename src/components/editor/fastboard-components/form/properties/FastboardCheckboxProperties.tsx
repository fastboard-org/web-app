import { CheckboxProperties } from "@/types/editor/form";
import { Input, Spacer } from "@nextui-org/react";

export default function FastboardCheckboxProperties({
  properties,
  onValueChange,
}: {
  properties: CheckboxProperties;
  onValueChange: (properties: CheckboxProperties) => void;
}) {
  const { label, formDataKey } = properties;

  return (
    <div className="flex flex-col">
      <Input
        aria-label="Checkbox label property"
        label="Label"
        labelPlacement="outside"
        placeholder="Label"
        value={label}
        onValueChange={(value) => {
          onValueChange({
            ...properties,
            label: value,
          });
        }}
      />
      <Spacer y={2} />
      <Input
        aria-label="Checkbox formKey property"
        label="FormData key"
        labelPlacement="outside"
        placeholder="FormData key"
        value={formDataKey || ""}
        onValueChange={(value) => {
          onValueChange({
            ...properties,
            formDataKey: value,
          });
        }}
      />
    </div>
  );
}
