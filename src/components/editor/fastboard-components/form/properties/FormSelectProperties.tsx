import { SelectProperties } from "@/types/editor/form";
import {
  Accordion,
  AccordionItem,
  Checkbox,
  Input,
  Spacer,
} from "@nextui-org/react";
import FormDefaultValueKeySelection from "./FormDefaultValueKeySelection";
import FormSelectOptionsList from "./FormSelectOptionsList";
import QueryParameterSelection from "@/components/shared/QueryParameterSelection";

export default function FormSelectProperties({
  properties,
  queryId,
  onValueChange,
  onSelectOption,
  disabledKeys = [],
  initialData,
}: {
  properties: SelectProperties;
  queryId: string | null;
  onValueChange: (properties: SelectProperties) => void;
  onSelectOption: (index: number) => void;
  disabledKeys?: string[];
  initialData?: any;
}) {
  const {
    required,
    formDataKey,
    label,
    placeHolder,
    options,
    defaultValueKey,
  } = properties;

  return (
    <Accordion
      selectionMode="multiple"
      isCompact
      fullWidth
      defaultExpandedKeys={["basic", "options"]}
      className="p-0"
    >
      <AccordionItem
        key="basic"
        title="Basic"
        className="pb-2"
        classNames={{ title: "font-medium" }}
      >
        <div className="flex flex-col gap-y-2">
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
      </AccordionItem>
      <AccordionItem
        key="options"
        title="Options"
        className="pb-2"
        classNames={{ title: "font-medium" }}
      >
        <FormSelectOptionsList
          options={options}
          onSelectOption={onSelectOption}
          onOptionsChange={(options) =>
            onValueChange({
              ...properties,
              options,
            })
          }
        />
      </AccordionItem>
    </Accordion>
  );
}
