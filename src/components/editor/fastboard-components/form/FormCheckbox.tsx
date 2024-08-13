import { CheckboxProperties } from "@/types/editor/form";
import { Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";

export default function FormCheckbox({
  properties,
  register,
  errors,
  initialData,
}: {
  properties: CheckboxProperties;
  register: UseFormRegister<any>;
  errors: any;
  initialData?: any;
}) {
  const { formDataKey, label, defaultValueKey } = properties;
  const [value, setValue] = useState(false);

  useEffect(() => {
    setValue(initialData ? initialData[defaultValueKey] : false);
  }, [initialData, defaultValueKey]);

  return (
    <Checkbox
      aria-label="Checkbox input"
      {...(formDataKey !== "" ? { ...register(formDataKey) } : {})}
      isSelected={value}
      onValueChange={setValue}
    >
      {label}
    </Checkbox>
  );
}
