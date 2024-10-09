import { CheckboxProperties } from "@/types/editor/form";
import { Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";

export default function FormCheckbox({
  properties,
  register,
  unregister,
  setFormValue,
  errors,
  initialData,
}: {
  properties: CheckboxProperties;
  register: UseFormRegister<any>;
  unregister: UseFormUnregister<any>;
  setFormValue: UseFormSetValue<any>;
  errors: any;
  initialData?: any;
}) {
  const { formDataKey, label, defaultValueKey } = properties;
  const [formKey, setFormKey] = useState("");
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (!formDataKey) return;
    const data = initialData ? initialData[defaultValueKey] : "";
    setValue(Boolean(data));
    setFormValue(formDataKey, Boolean(data));
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
    <div className="flex flex-row justify-between items-center">
      <h2>{label}</h2>
      <Checkbox
        aria-label="Checkbox input"
        {...(formDataKey !== "" ? { ...register(formDataKey) } : {})}
        isSelected={value}
        onValueChange={setValue}
      />
    </div>
  );
}
