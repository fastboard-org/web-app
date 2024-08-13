import { TextInputProperties } from "@/types/editor/form";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";

export default function FormTextInput({
  properties,
  register,
  errors,
  initialData,
}: {
  properties: TextInputProperties;
  register: UseFormRegister<any>;
  errors: any;
  initialData?: any;
}) {
  const { required, formDataKey, label, placeHolder, defaultValueKey } =
    properties;
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initialData ? initialData[defaultValueKey] : "");
  }, [initialData, defaultValueKey]);

  return (
    <Input
      aria-label="Text input"
      isRequired={required}
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
