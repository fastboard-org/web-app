import { NumberInputProperties } from "@/types/editor/form";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";

export default function FormNumberInput({
  properties,
  register,
  errors,
  initialData,
}: {
  properties: NumberInputProperties;
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
      aria-label="Number input"
      type="number"
      isRequired={required}
      {...(formDataKey !== ""
        ? {
            ...register(formDataKey, {
              required: "This field is required",
              valueAsNumber: true,
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
