import { TextInputProperties } from "@/types/editor/form";
import { Checkbox, Input, Spacer } from "@nextui-org/react";

export default function FastboardTextInputProperties({
  properties,
  onValueChange,
}: {
  properties: TextInputProperties;
  onValueChange: (properties: TextInputProperties) => void;
}) {
  const { label, placeHolder, required, formDataKey } = properties;

  return (
    <div className="flex flex-col">
      <Input
        aria-label="Text input label property"
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
        aria-label="Text input placeholder property"
        label="Placeholder"
        labelPlacement="outside"
        placeholder="Placeholder"
        value={placeHolder}
        onValueChange={(value) => {
          onValueChange({
            ...properties,
            placeHolder: value,
          });
        }}
      />
      <Spacer y={2} />
      <Checkbox
        checked={required}
        onValueChange={(value) => {
          onValueChange({
            ...properties,
            required: value,
          });
        }}
      >
        Required
      </Checkbox>
      <Spacer y={2} />
      <Input
        aria-label="Text input formKey property"
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
