import { NumberInputProperties } from "@/types/editor/form";
import FormDataKeySelection from "./FormDataKeySelection";
import { Query } from "@/types/connections";
import { Checkbox, Input, Spacer } from "@nextui-org/react";
import FormDefaultValueKeySelection from "./FormDefaultValueKeySelection";

export default function FormNumberInputProperties({
  properties,
  queryId,
  onValueChange,
  disabledKeys = [],
  initialData,
}: {
  properties: NumberInputProperties;
  queryId: string | null;
  onValueChange: (properties: NumberInputProperties) => void;
  disabledKeys?: string[];
  initialData?: any;
}) {
  const { label, placeHolder, required, formDataKey, defaultValueKey } =
    properties;

  return (
    <div className="flex flex-col">
      <Input
        aria-label="Number input label property"
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
      <Spacer y={2} />
      {formDataKey !== "" && (
        <div>
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
          {initialData && (
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
      )}
    </div>
  );
}
