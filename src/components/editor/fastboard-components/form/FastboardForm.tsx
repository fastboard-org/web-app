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
  Divider,
  Spacer,
  Spinner,
} from "@nextui-org/react";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { useForm } from "react-hook-form";
import useExecuteQuery from "@/hooks/adapter/useExecuteQuery";
import { useEffect } from "react";
import { toast } from "sonner";
import FormTextInput from "./FormTextInput";
import useModalFrame from "@/hooks/editor/useModalFrame";
import { useParams } from "next/navigation";
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
  const { id: dashboardId } = useParams();

  const {
    title,
    inputs,
    submitQueryId,
    submitQueryData,
    queryParameters,
    submitButtonLabel,
    showShadow,
    dataProvider,
    initialData,
  } = properties;
  const { getComponent, updateComponentProperties } = useDashboard();
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    shouldUnregister: true,
  });
  const { closeModal } = useModalFrame();
  const { execute, isPending: isLoading } = useExecuteQuery({
    dashboardId: dashboardId as string,
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

  function getInitialData() {
    if (!dataProvider) return;
    const { componentId, property } = dataProvider;
    const component = getComponent(componentId);
    if (!component) return;

    return component.properties[property];
  }

  useEffect(() => {
    const data = getInitialData();
    updateComponentProperties(
      id,
      {
        ...properties,
        initialData: data,
      },
      false,
    );
    reset();
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
      queryData: submitQueryData,
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
            unregister={unregister}
            setFormValue={setValue}
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
            unregister={unregister}
            setFormValue={setValue}
            errors={errors}
            initialData={initialData}
          />
        );
      case InputType.Select:
        const selectInput = input as SelectProperties;
        return null;
      case InputType.Checkbox:
        return (
          <FormCheckbox
            key={index}
            properties={input as CheckboxProperties}
            register={register}
            unregister={unregister}
            setFormValue={setValue}
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
          {isLoading && <Spinner className="h-full" />}
          {!isLoading &&
            inputs.map((input, index) => renderInput(index, input))}
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
