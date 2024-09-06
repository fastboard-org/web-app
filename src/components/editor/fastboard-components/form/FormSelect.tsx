import { SelectProperties } from "@/types/editor/form";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";

export default function FormSelect({
  properties,
  register,
  unregister,
  setFormValue,
  errors,
  initialData,
}: {
  properties: SelectProperties;
  register: UseFormRegister<any>;
  unregister: UseFormUnregister<any>;
  setFormValue: UseFormSetValue<any>;
  errors: any;
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
  const [formKey, setFormKey] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!formDataKey) return;
    const data = initialData ? initialData[defaultValueKey] : "";
    setValue(data);
    setFormValue(formDataKey, data);
  }, [initialData, defaultValueKey]);

  useEffect(() => {
    if (formDataKey === "") {
      unregister(formKey);
      return;
    }
    if (formDataKey !== formKey) {
      unregister(formKey);
    }
    setFormKey(formDataKey);
  }, [formDataKey]);

  return (
    <Select
      aria-label="Select input"
      isRequired={required}
      {...(formDataKey !== ""
        ? {
            ...register(formDataKey, {
              required: {
                value: required,
                message: "This field is required",
              },
              onChange: (e) => {
                setValue(e.target.value);
              },
            }),
          }
        : {})}
      label={label}
      labelPlacement="outside"
      placeholder={placeHolder}
      selectedKeys={[value]}
    >
      {options
        .filter((option) => option.label !== "")
        .map((option, index) => {
          return <SelectItem key={option.label}>{option.label}</SelectItem>;
        })}
    </Select>
  );
}