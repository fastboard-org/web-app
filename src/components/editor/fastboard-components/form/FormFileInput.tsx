import { FileInputProperties } from "@/types/editor/form";
import { Input } from "@nextui-org/react";
import { SearchNormal1 } from "iconsax-react";
import { useEffect, useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";

export default function FormFileInput({
  properties,
  register,
  unregister,
  setFormValue,
  errors,
}: {
  properties: FileInputProperties;
  register: UseFormRegister<any>;
  unregister: UseFormUnregister<any>;
  setFormValue: UseFormSetValue<any>;
  errors: any;
}) {
  const { required, formDataKey, label, placeHolder, multiple, accept } =
    properties;
  const [formKey, setFormKey] = useState("");

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
      type="file"
      multiple={multiple}
      accept={accept?.join(",")}
      aria-label="File input"
      isRequired={formDataKey !== "" ? required : false}
      {...(formDataKey !== ""
        ? {
            ...register(formDataKey, {
              required: {
                value: required,
                message: "This field is required",
              },
              onChange: (e) => {
                console.log(e.target.files?.item(0));
              },
            }),
          }
        : {})}
      label={label}
      labelPlacement="outside"
      placeholder={placeHolder}
      startContent={<SearchNormal1 size={15} />}
      errorMessage={errors[formDataKey]?.message as string}
      isInvalid={!!errors[formDataKey]}
    />
  );
}
