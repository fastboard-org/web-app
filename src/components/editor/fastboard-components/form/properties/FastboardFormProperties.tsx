import {
  CheckboxProperties,
  FormProperties,
  InputType,
  TextInputProperties,
} from "@/types/editor/form";
import {
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

export default function FastboardFormProperties({
  properties,
  onValueChange,
}: {
  properties: FormProperties;
  onValueChange: (properties: FormProperties) => void;
}) {
  const { title, query, inputs } = properties;
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
          <QuerySelection
            selectedQueryId={query?.id || ""}
            onQuerySelect={(query) => {
              onValueChange({
                ...properties,
                query: query,
              });
            }}
          />
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
        </div>
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
    </div>
  );
}
