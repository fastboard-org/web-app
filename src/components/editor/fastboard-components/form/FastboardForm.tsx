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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FormTextInput from "./FormTextInput";
import useGetQuery from "@/hooks/connections/useGetQuery";
import useModalFrame from "@/hooks/editor/useModalFrame";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { ComponentId } from "@/types/editor";
import FormNumberInput from "./FormNumberInput";
import FormCheckbox from "./FormCheckbox";

export default function FastboardForm({
  id,
  properties,
}: {
  id: ComponentId;
  properties: FormProperties;
}) {
  const {
    title,
    inputs,
    submitQueryId,
    queryParameters,
    submitButtonLabel,
    showShadow,
    dataProvider,
    initialData,
  } = properties;
  const { getComponent, updateComponentProperties } = useDashboard();
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
    if (!dataProvider) return;
    const { componentId, property } = dataProvider;
    const component = getComponent(componentId);
    if (!component) return;

    const data = component.properties[property];
    updateComponentProperties(
      id,
      {
        ...properties,
        initialData: data,
      },
      false
    );
  }, []);

  useEffect(() => {
    reset();
  }, [submitQueryId]);

  const onSubmit = async (formData: any) => {
    if (!submitQueryId) {
      toast.warning("Query is not defined");
      return;
    }

    //Fill the query parameters with data
    let newQueryParameters = { ...queryParameters };
    if (initialData) {
      Object.keys(queryParameters).map((key) => {
        const dataKey = queryParameters[key];
        // @ts-ignore
        newQueryParameters[key] = initialData[dataKey];
      });
    }

    execute({
      query: submitQuery,
      parameters: {
        ...newQueryParameters,
        ...formData,
      },
    });
    reset();
  };

  function renderInput(index: number, input: InputProperties) {
    switch (input.type) {
      case InputType.TextInput:
        return (
          <FormTextInput
            key={index}
            properties={input as TextInputProperties}
            register={register}
            errors={errors}
            initialData={initialData}
          />
        );
      case InputType.NumberInput:
        return (
          <FormNumberInput
            key={index}
            properties={input as NumberInputProperties}
            register={register}
            errors={errors}
            initialData={initialData}
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
        return (
          <FormCheckbox
            key={index}
            properties={input as CheckboxProperties}
            register={register}
            errors={errors}
          />
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
