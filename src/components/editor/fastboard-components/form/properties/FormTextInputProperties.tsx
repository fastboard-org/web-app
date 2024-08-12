import { Query } from "@/types/connections";
import { TextInputProperties } from "@/types/editor/form";
import { Checkbox, Input, Select, SelectItem, Spacer } from "@nextui-org/react";
import FormDataKeySelection from "./FormDataKeySelection";

export default function FormTextInputProperties({
  properties,
  queryId,
  onValueChange,
  disabledKeys = [],
}: {
  properties: TextInputProperties;
  queryId: string | null;
  onValueChange: (properties: TextInputProperties) => void;
  disabledKeys?: string[];
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
        isSelected={required}
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
      <FormDataKeySelection
        selectedKey={formDataKey}
        disabledKeys={disabledKeys}
        queryId={queryId}
        onSelectionChange={(formDataKey) => {
          onValueChange({
            ...properties,
            formDataKey: formDataKey,
          });
        }}
      />
    </div>
  );
}