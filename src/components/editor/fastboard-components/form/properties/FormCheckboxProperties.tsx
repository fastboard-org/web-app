import { CheckboxProperties } from "@/types/editor/form";
import { Input, Spacer } from "@nextui-org/react";
import QueryParameterSelection from "../../../../shared/QueryParameterSelection";
import { Query } from "@/types/connections";
import FormDefaultValueKeySelection from "./FormDefaultValueKeySelection";

export default function FormCheckboxProperties({
  properties,
  queryId,
  onValueChange,
  disabledKeys = [],
  initialData,
}: {
  properties: CheckboxProperties;
  queryId: string | null;
  onValueChange: (properties: CheckboxProperties) => void;
  disabledKeys?: string[];
  initialData?: any;
}) {
  const { label, formDataKey, defaultValueKey } = properties;

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
      <QueryParameterSelection
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
      <Spacer y={2} />
      {formDataKey !== "" && initialData && (
        <FormDefaultValueKeySelection
          selectedKey={defaultValueKey}
          initialData={initialData}
          onSelectionChange={(key) => {
            onValueChange({
              ...properties,
              defaultValueKey: key,
            });
          }}
        />
      )}
    </div>
  );
}
