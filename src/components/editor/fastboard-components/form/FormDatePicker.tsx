import { DatePickerProperties } from "@/types/editor/form";
import { DatePicker } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";
import { DateValue, parseDate } from "@internationalized/date";
import { toast } from "sonner";

export default function FormDatePicker({
  properties,
  register,
  unregister,
  setFormValue,
  errors,
  initialData,
}: {
  properties: DatePickerProperties;
  register: UseFormRegister<any>;
  unregister: UseFormUnregister<any>;
  setFormValue: UseFormSetValue<any>;
  errors: any;
  initialData?: any;
}) {
  const { formDataKey, required, label, placeHolder, defaultValueKey } =
    properties;
  const [formKey, setFormKey] = useState("");
  const [value, setValue] = useState<DateValue | null>(null);

  useEffect(() => {
    if (!formDataKey) return;
    const data = initialData ? initialData[defaultValueKey] : null;
    let date = null;
    try {
      date = data ? parseDate(data) : null;
    } catch (error: any) {
      toast.error(`Error parsing date, ${error?.message}`);
    }
    setValue(date);
    setFormValue(formDataKey, date?.toString());
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
    <DatePicker
      aria-label="Date picker"
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
      showMonthAndYearPickers
      value={value}
      onChange={(date) => {
        if (!date) {
          return;
        }
        setValue(date);
        setFormValue(formDataKey, date.toString(), {
          shouldValidate: true,
        });
      }}
      errorMessage={errors[formDataKey]?.message as string}
      isInvalid={!!errors[formDataKey]}
    />
  );
}
