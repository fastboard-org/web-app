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
  properties,
  onValueChange,
}: {
  properties: FormProperties;
  onValueChange: (properties: FormProperties) => void;
}) {
  const { title, query, submitButtonLabel, inputs } = properties;
  const [inputSelectedIndex, setInputSelectedIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    //setInputSelectedIndex(null);
  }, [properties]);

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
            <div>
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
                selectedQueryId={query?.id || ""}
                onQuerySelect={(query) => {
                  onValueChange({
                    ...properties,
                    query: query,
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
          </AccordionItem>
        </Accordion>
      )}

      {inputSelectedIndex !== null &&
        inputs[inputSelectedIndex].type === InputType.TextInput && (
          <FormTextInputProperties
            properties={inputs[inputSelectedIndex] as TextInputProperties}
            query={query}
            onValueChange={(inputProperties) => {
              const newInputs = [...inputs];
              newInputs[inputSelectedIndex] = inputProperties;
              onValueChange({
                ...properties,
                inputs: newInputs,
              });
            }}
          />
        )}
      {inputSelectedIndex !== null &&
        inputs[inputSelectedIndex].type === InputType.Checkbox && (
          <FormCheckboxProperties
            properties={inputs[inputSelectedIndex] as CheckboxProperties}
            query={query}
            onValueChange={(inputProperties) => {
              const newInputs = [...inputs];
              newInputs[inputSelectedIndex] = inputProperties;
              onValueChange({
                ...properties,
                inputs: newInputs,
              });
            }}
          />
        )}
      {inputSelectedIndex !== null &&
        inputs[inputSelectedIndex].type === InputType.NumberInput && (
          <FormNumberInputProperties
            properties={inputs[inputSelectedIndex] as NumberInputProperties}
            query={query}
            onValueChange={(inputProperties) => {
              const newInputs = [...inputs];
              newInputs[inputSelectedIndex] = inputProperties;
              onValueChange({
                ...properties,
                inputs: newInputs,
              });
            }}
          />
        )}
    </div>
  );
}
