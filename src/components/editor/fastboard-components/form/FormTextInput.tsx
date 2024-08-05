import { TextInputProperties } from "@/types/editor/form";
import { Input } from "@nextui-org/react";
import { UseFormRegister } from "react-hook-form";

export default function FormTextInput({
  properties,
  register,
  errors,
}: {
  properties: TextInputProperties;
  register: UseFormRegister<any>;
  errors: any;
}) {
  const { required, formDataKey, label, placeHolder } = properties;
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
      isClearable
      errorMessage={errors[formDataKey]?.message as string}
      isInvalid={!!errors[formDataKey]}
    />
  );
}
