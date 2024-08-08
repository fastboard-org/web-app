import {
  CheckboxProperties,
  FormProperties,
  InputType,
  NumberInputProperties,
  TextInputProperties,
} from "@/types/editor/form";
import {
  Accordion,
  AccordionItem,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Spacer,
} from "@nextui-org/react";
import QuerySelection from "../../../QuerySelection";
import { useEffect, useState } from "react";
import FormInputsList from "./FormInputsList";
import FormTextInputProperties from "./FormTextInputProperties";
import FormCheckboxProperties from "./FormCheckboxProperties";
import FormNumberInputProperties from "./FormNumberInputProperties";

export default function FastboardFormProperties({
  container,
  properties,
  onValueChange,
}: {
  container: string;
  properties: FormProperties;
  onValueChange: (properties: FormProperties) => void;
}) {
  const { title, submitQueryId, submitButtonLabel, inputs } = properties;
  const [inputSelectedIndex, setInputSelectedIndex] = useState<number | null>(
    null
  );
  const disabledKeys = inputs.map((input) => input.formDataKey);

  useEffect(() => {
    //The container changes, reset the selected input
    setInputSelectedIndex(null);
  }, [container]);

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem
          key={"baseProperties"}
          onPress={() => {
            setInputSelectedIndex(null);
          }}
        >
          Form
        </BreadcrumbItem>
        {inputSelectedIndex !== null && (
          <BreadcrumbItem key={"inputProperties"}>Input</BreadcrumbItem>
        )}
      </Breadcrumbs>
      <Spacer y={4} />

      {inputSelectedIndex === null && (
        <Accordion
          selectionMode="multiple"
          isCompact
          fullWidth
          defaultExpandedKeys={["basic", "inputs", "style"]}
        >
          <AccordionItem
            key="basic"
            title="Basic"
            className="pb-2"
            classNames={{
              title: "font-medium",
            }}
          >
            <div className="overflow-x-hidden">
              <Input
                label="Title"
                labelPlacement="outside"
                placeholder="Form title"
                value={title}
                onValueChange={(value) => {
                  onValueChange({
                    ...properties,
                    title: value,
                  });
                }}
              />
              <Spacer y={2} />
              <QuerySelection
                selectedQueryId={submitQueryId || ""}
                onQuerySelect={(query) => {
                  //Replace formdatakey fiel from inputs to empty string
                  const newInputs = inputs.map((input) => ({
                    ...input,
                    formDataKey: "",
                  }));
                  onValueChange({
                    ...properties,
                    submitQueryId: query.id,
                    inputs: newInputs,
                  });
                }}
              />
              <Spacer y={2} />
              <Input
                label="Submit button label"
                labelPlacement="outside"
                value={submitButtonLabel}
                onValueChange={(value) => {
                  onValueChange({
                    ...properties,
                    submitButtonLabel: value,
                  });
                }}
              />
              <Spacer y={2} />
            </div>
          </AccordionItem>
          <AccordionItem
            key="inputs"
            className="pb-2"
            title="Inputs"
            classNames={{
              title: "font-medium",
            }}
          >
            {!submitQueryId && (
              <div className="flex justify-center text-sm">
                Select a query to enable inputs
              </div>
            )}
            {submitQueryId && (
              <FormInputsList
                inputs={inputs}
                onSelectInput={(inputProperties) => {
                  setInputSelectedIndex(inputs.indexOf(inputProperties));
                }}
                onChange={(newInputs) => {
                  onValueChange({
                    ...properties,
                    inputs: newInputs,
                  });
                }}
              />
            )}
          </AccordionItem>
        </Accordion>
      )}

      {inputSelectedIndex !== null &&
        inputs[inputSelectedIndex]?.type === InputType.TextInput && (
          <FormTextInputProperties
            properties={inputs[inputSelectedIndex] as TextInputProperties}
            queryId={submitQueryId}
            onValueChange={(inputProperties) => {
              const newInputs = [...inputs];
              newInputs[inputSelectedIndex] = inputProperties;
              onValueChange({
                ...properties,
                inputs: newInputs,
              });
            }}
            disabledKeys={disabledKeys}
          />
        )}
      {inputSelectedIndex !== null &&
        inputs[inputSelectedIndex]?.type === InputType.Checkbox && (
          <FormCheckboxProperties
            properties={inputs[inputSelectedIndex] as CheckboxProperties}
            queryId={submitQueryId}
            onValueChange={(inputProperties) => {
              const newInputs = [...inputs];
              newInputs[inputSelectedIndex] = inputProperties;
              onValueChange({
                ...properties,
                inputs: newInputs,
              });
            }}
            disabledKeys={disabledKeys}
          />
        )}
      {inputSelectedIndex !== null &&
        inputs[inputSelectedIndex]?.type === InputType.NumberInput && (
          <FormNumberInputProperties
            properties={inputs[inputSelectedIndex] as NumberInputProperties}
            queryId={submitQueryId}
            onValueChange={(inputProperties) => {
              const newInputs = [...inputs];
              newInputs[inputSelectedIndex] = inputProperties;
              onValueChange({
                ...properties,
                inputs: newInputs,
              });
            }}
            disabledKeys={disabledKeys}
          />
        )}
    </div>
  );
}
