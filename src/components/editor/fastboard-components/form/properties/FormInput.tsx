import {
  CheckboxProperties,
  DatePickerProperties,
  DefaultInputProperties,
  FileInputProperties,
  InputProperties,
  InputType,
  NumberInputProperties,
  SelectProperties,
  TextInputProperties,
} from "@/types/editor/form";
import { Select, SelectItem } from "@nextui-org/react";
import InputIcon from "./InputIcon";
import FormTextInputProperties from "./FormTextInputProperties";
import { RestQueryData } from "@/types/connections";
import FormCheckboxProperties from "./FormCheckboxProperties";
import FormNumberInputProperties from "./FormNumberInputProperties";
import FormDatePickerProperties from "./FormDatePickerProperties";
import FormSelectProperties from "./FormSelectProperties";
import { useState } from "react";
import FormSelectOption from "./FormSelectOption";
import FormFileInputProperties from "./FormFileInputProperties";

export default function FormInput({
  input,
  submitQueryData,
  disabledKeys,
  initialData,
  onInputChange,
}: {
  input: InputProperties;
  submitQueryData: RestQueryData | null;
  disabledKeys: string[];
  initialData: Object | null;
  onInputChange: (inputProperties: InputProperties) => void;
}) {
  const [optionSelectedIndex, setOptionSelectedIndex] = useState<number | null>(
    null
  );
  const { type } = input;

  function changeInputType(type: InputType): InputProperties {
    const newProperties = DefaultInputProperties.of(type);
    return {
      ...newProperties,
      label: input.label,
      required: input.required,
      formDataKey: input.formDataKey,
      defaultValueKey: input.defaultValueKey,
    };
  }

  return (
    <div className="flex flex-col gap-2">
      {optionSelectedIndex === null && (
        <Select
          label="Input type"
          labelPlacement="outside"
          selectedKeys={[type]}
          startContent={<InputIcon type={type} size={15} />}
          onChange={(e) => {
            onInputChange(changeInputType(e.target.value as InputType));
          }}
        >
          {Object.values(InputType).map((type) => (
            <SelectItem
              key={type}
              startContent={<InputIcon type={type} size={15} />}
            >
              {type}
            </SelectItem>
          ))}
        </Select>
      )}

      {input.type === InputType.TextInput && (
        <FormTextInputProperties
          properties={input as TextInputProperties}
          queryId={submitQueryData?.queryId || ""}
          onValueChange={(inputProperties) => {
            onInputChange(inputProperties);
          }}
          disabledKeys={disabledKeys}
          initialData={initialData}
        />
      )}
      {input.type === InputType.Checkbox && (
        <FormCheckboxProperties
          properties={input as CheckboxProperties}
          queryId={submitQueryData?.queryId || ""}
          onValueChange={(inputProperties) => {
            onInputChange(inputProperties);
          }}
          disabledKeys={disabledKeys}
          initialData={initialData}
        />
      )}
      {input.type === InputType.NumberInput && (
        <FormNumberInputProperties
          properties={input as NumberInputProperties}
          queryId={submitQueryData?.queryId || ""}
          onValueChange={(inputProperties) => {
            onInputChange(inputProperties);
          }}
          disabledKeys={disabledKeys}
          initialData={initialData}
        />
      )}
      {input.type === InputType.DatePicker && (
        <FormDatePickerProperties
          properties={input as DatePickerProperties}
          queryId={submitQueryData?.queryId || ""}
          onValueChange={(inputProperties) => {
            onInputChange(inputProperties);
          }}
          disabledKeys={disabledKeys}
          initialData={initialData}
        />
      )}
      {optionSelectedIndex === null && input.type === InputType.Select && (
        <FormSelectProperties
          properties={input as SelectProperties}
          queryId={submitQueryData?.queryId || ""}
          onValueChange={(inputProperties) => {
            onInputChange(inputProperties);
          }}
          onSelectOption={setOptionSelectedIndex}
          disabledKeys={disabledKeys}
          initialData={initialData}
        />
      )}
      {optionSelectedIndex !== null && input.type === InputType.Select && (
        <FormSelectOption
          option={(input as SelectProperties).options[optionSelectedIndex]}
          onValueChange={(newOption) => {
            const selectInput = input as SelectProperties;
            const newOptions = selectInput.options.map((option, optIndex) => {
              if (optIndex === optionSelectedIndex) {
                return newOption;
              }
              return option;
            });

            onInputChange({
              ...selectInput,
              options: newOptions,
            });
          }}
        />
      )}
      {input.type === InputType.FileInput && (
        <FormFileInputProperties
          properties={input as FileInputProperties}
          queryId={submitQueryData?.queryId || ""}
          onValueChange={(inputProperties) => {
            onInputChange(inputProperties);
          }}
          disabledKeys={disabledKeys}
        />
      )}
    </div>
  );
}
