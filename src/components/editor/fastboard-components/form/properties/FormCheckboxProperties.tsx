import { CheckboxProperties } from "@/types/editor/form";
import { Input, Spacer } from "@nextui-org/react";
import FormDataKeySelection from "./FormDataKeySelection";
import { Query } from "@/types/connections";

export default function FormCheckboxProperties({
  properties,
  queryId,
  onValueChange,
}: {
  properties: CheckboxProperties;
  queryId: string | null;
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
      <FormDataKeySelection
        selectedKey={formDataKey}
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
