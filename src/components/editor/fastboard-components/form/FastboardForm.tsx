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
import useExecuteQuery from "@/hooks/adapter/useExecuteQuery";
import { useEffect } from "react";
import { toast } from "sonner";
import FormTextInput from "./FormTextInput";
import useGetQuery from "@/hooks/connections/useGetQuery";
import useModalFrame from "@/hooks/editor/useModalFrame";

export default function FastboardForm({
  properties,
}: {
  properties: FormProperties;
}) {
  const { title, inputs, submitQueryId, submitButtonLabel, showShadow } =
    properties;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { query: submitQuery } = useGetQuery(submitQueryId || "");
  const { closeModal } = useModalFrame();
  const { execute, isPending: isLoading } = useExecuteQuery({
    onSuccess: () => {
      toast.success("Submit successfully");
      closeModal();
    },
    onError: (error) => {
      toast.error("Failed submitting", {
        description: error?.message,
      });
      closeModal();
    },
  });

  useEffect(() => {
    reset();
  }, [submitQueryId]);

  const onSubmit = async (formData: any) => {
    if (!submitQueryId) {
      toast.warning("Query is not defined");
      return;
    }
    execute({
      query: submitQuery,
      parameters: formData,
    });
    reset();
  };

  function renderInput(index: number, input: InputProperties) {
    switch (input.type) {
      case InputType.TextInput:
        const textInput = input as TextInputProperties;
        return (
          <FormTextInput
            key={index}
            properties={textInput}
            register={register}
            errors={errors}
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
      <Card className={`grow-0 h-full ${!showShadow ? "shadow-none" : ""}`}>
        <CardHeader>{title}</CardHeader>
        <Divider />
        <CardBody className={"space-y-8 " + scrollbarStyles.scrollbar}>
          {inputs.map((input, index) => renderInput(index, input))}
        </CardBody>
        <Spacer y={1} />
        <CardFooter className="flex justify-end">
          <Button type="submit" color="primary" isLoading={isLoading}>
            {submitButtonLabel}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
