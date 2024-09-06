import { DatePickerProperties, TextInputProperties } from "@/types/editor/form";
import { Checkbox, Input, Spacer } from "@nextui-org/react";

import FormDefaultValueKeySelection from "./FormDefaultValueKeySelection";
import QueryParameterSelection from "@/components/shared/QueryParameterSelection";

export default function FormDatePickerProperties({
  properties,
  queryId,
  onValueChange,
  disabledKeys = [],
  initialData,
}: {
  properties: DatePickerProperties;
  queryId: string | null;
  onValueChange: (properties: DatePickerProperties) => void;
  disabledKeys?: string[];
  initialData?: any;
}) {
  const { label, placeHolder, required, formDataKey, defaultValueKey } =
    properties;

  return (
    <div className="flex flex-col gap-y-2">
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
