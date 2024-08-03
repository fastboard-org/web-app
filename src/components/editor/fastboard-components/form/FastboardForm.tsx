import {
  CheckboxProperties,
  FormProperties,
  InputProperties,
  InputType,
  NumberInputProperties,
  SelectProperties,
  TextInputProperties,
} from "@/types/editor/form";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  DateInput,
  DatePicker,
  Divider,
  Input,
  Select,
  SelectItem,
  Spacer,
} from "@nextui-org/react";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { useForm } from "react-hook-form";
import useExecuteQuery from "@/hooks/useExecuteQuery";
import { useEffect } from "react";
import { toast } from "sonner";

export default function FastboardForm({
  properties,
}: {
  properties: FormProperties;
}) {
  const { title, inputs, query } = properties;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  const {
    execute,
    isPending: isLoading,
    isSuccess,
    isError,
    error,
  } = useExecuteQuery();

  useEffect(() => {
    if (isSuccess && query) {
      toast.success("Submit successfully");
    }

    if (isError) {
      toast.error("Failed submitting", {
        description: error?.message,
      });
    }
  }, [isError, isSuccess]);

  const onSubmit = async (formData: any) => {
    if (!query) {
      toast.warning("Query is not defined");
      return;
    }
    console.log("formData", formData);
    execute({
      query: query,
      parameters: formData,
    });
    reset();
  };

  function renderInput(index: number, input: InputProperties) {
    switch (input.type) {
      case InputType.TextInput:
        const textInput = input as TextInputProperties;
        return (
          <Input
            key={index}
            aria-label="Text input"
            isRequired={textInput.required}
            {...(textInput.formDataKey !== ""
              ? {
                  ...register(textInput.formDataKey, {
                    required: "This field is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  }),
                }
              : {})}
            label={textInput.label}
            labelPlacement="outside"
            placeholder={textInput.placeHolder}
            isClearable
            errorMessage={errors[textInput.formDataKey]?.message as string}
            isInvalid={!!errors[textInput.formDataKey]}
          />
        );
      case InputType.NumberInput:
        const numberInput = input as NumberInputProperties;
        return (
          <Input
            key={index}
            aria-label="Number input"
            type="number"
            isRequired={numberInput.required}
            {...(numberInput.formDataKey !== ""
              ? {
                  ...register(numberInput.formDataKey, {
                    required: "This field is required",
                    valueAsNumber: true,
                  }),
                }
              : {})}
            label={numberInput.label}
            labelPlacement="outside"
            placeholder={numberInput.placeHolder}
            isClearable
            errorMessage={errors[numberInput.formDataKey]?.message as string}
            isInvalid={!!errors[numberInput.formDataKey]}
          />
        );
      case InputType.Select:
        const selectInput = input as SelectProperties;
        return (
          <Select
            key={index}
            aria-label="Select input"
            isRequired={selectInput.required}
            {...register(selectInput.formDataKey, {
              required: "This field is required",
            })}
            label={selectInput.label}
            labelPlacement="outside"
            errorMessage={errors[selectInput.formDataKey]?.message as string}
            isInvalid={!!errors[selectInput.formDataKey]}
          >
            {selectInput.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
        );
      case InputType.Checkbox:
        const checkboxInput = input as CheckboxProperties;
        return (
          <Checkbox
            key={index}
            aria-label="Checkbox input"
            {...(checkboxInput.formDataKey !== ""
              ? { ...register(checkboxInput.formDataKey) }
              : {})}
          >
            {checkboxInput.label}
          </Checkbox>
        );
      default:
        return null;
    }
  }

  return (
    <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
      <Card className="grow-0 h-full">
        <CardHeader>{title}</CardHeader>
        <Divider />
        <CardBody className={"" + scrollbarStyles.scrollbar}>
          {inputs.map((input, index) => renderInput(index, input))}
        </CardBody>
        <Spacer y={1} />
        <CardFooter className="flex justify-end">
          <Button type="submit" color="primary" isLoading={isLoading}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
