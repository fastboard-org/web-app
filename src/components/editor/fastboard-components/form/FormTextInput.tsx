import { TextInputProperties } from "@/types/editor/form";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";

export default function FormTextInput({
  properties,
  register,
  unregister,
  setFormValue,
  errors,
  initialData,
}: {
  properties: TextInputProperties;
  register: UseFormRegister<any>;
  unregister: UseFormUnregister<any>;
  setFormValue: UseFormSetValue<any>;
  errors: any;
  initialData?: any;
}) {
  const { required, formDataKey, label, placeHolder, defaultValueKey } =
    properties;
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
    <Input
      aria-label="Text input"
      isRequired={formDataKey !== "" ? required : false}
      {...(formDataKey !== ""
        ? {
            ...register(formDataKey, {
              required: {
                value: required,
                message: "This field is required",
              },
            }),
          }
        : {})}
      label={label}
      labelPlacement="outside"
      placeholder={placeHolder}
      value={value}
      onValueChange={setValue}
      isClearable
      errorMessage={errors[formDataKey]?.message as string}
      isInvalid={!!errors[formDataKey]}
    />
  );
}
