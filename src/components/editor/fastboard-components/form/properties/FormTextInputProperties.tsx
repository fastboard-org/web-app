import { TextInputProperties } from "@/types/editor/form";
import { Checkbox, Input, Select, SelectItem, Spacer } from "@nextui-org/react";
import QueryParameterSelection from "../../../../shared/QueryParameterSelection";
import FormDefaultValueKeySelection from "./FormDefaultValueKeySelection";
import CheckBoxProperty from "@/components/shared/CheckBoxProperty";

export default function FormTextInputProperties({
  properties,
  queryId,
  onValueChange,
  disabledKeys = [],
  initialData,
}: {
  properties: TextInputProperties;
  queryId: string | null;
  onValueChange: (properties: TextInputProperties) => void;
  disabledKeys?: string[];
  initialData?: any;
}) {
  const { label, placeHolder, required, formDataKey, defaultValueKey } =
    properties;

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
      {formDataKey !== "" && (
        <div>
          <CheckBoxProperty
            label="Required"
            isSelected={required}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                required: value,
              });
            }}
          />
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
