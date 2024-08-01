import { FormProperties } from "@/types/editor/form";
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
import { SubmitHandler, useForm } from "react-hook-form";
import useExecuteQuery from "@/hooks/useExecuteQuery";
import { useEffect } from "react";
import { toast } from "sonner";

export default function FastboardForm({
  properties,
}: {
  properties: FormProperties;
}) {
  const { title, query } = properties;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
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
  };

  return (
    <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
      <Card className="grow-0 h-full">
        <CardHeader>{title}</CardHeader>
        <Divider />
        <CardBody className={"space-y-2 " + scrollbarStyles.scrollbar}>
          <Input
            type="email"
            isRequired
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            label="Email"
            labelPlacement="outside"
            placeholder=""
            errorMessage={errors.email?.message as string}
            isInvalid={!!errors.email}
            aria-label="Email input"
          />
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
