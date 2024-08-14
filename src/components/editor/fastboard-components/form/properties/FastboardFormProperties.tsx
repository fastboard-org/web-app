import {
  CheckboxProperties,
  FormProperties,
  InputProperties,
  InputType,
  NumberInputProperties,
  TextInputProperties,
} from "@/types/editor/form";
import {
  Accordion,
  AccordionItem,
  BreadcrumbItem,
  Breadcrumbs,
  Input,
  Spacer,
} from "@nextui-org/react";
import QuerySelection from "../../../QuerySelection";
import { useEffect, useState } from "react";
import FormInputsList from "./FormInputsList";
import FormTextInputProperties from "./FormTextInputProperties";
import FormCheckboxProperties from "./FormCheckboxProperties";
import FormNumberInputProperties from "./FormNumberInputProperties";
import { useRecoilValue } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";
import useGetQuery from "@/hooks/connections/useGetQuery";
import FormDefaultValueKeySelection from "./FormDefaultValueKeySelection";

export default function FastboardFormProperties({
  properties,
  onValueChange,
}: {
  properties: FormProperties;
  onValueChange: (properties: FormProperties) => void;
}) {
  const {
    title,
    submitQueryId,
    queryParameters,
    submitButtonLabel,
    inputs,
    dataProvider,
    initialData,
  } = properties;
  const { query: submitQuery } = useGetQuery(submitQueryId);
  const { selectedComponentId } = useRecoilValue(propertiesDrawerState);
  const [inputSelectedIndex, setInputSelectedIndex] = useState<number | null>(
    null
  );
  const disabledKeys = inputs.map((input) => input.formDataKey);

  useEffect(() => {
    //The selected component has changed, reset the input selected index
    setInputSelectedIndex(null);
  }, [selectedComponentId]);

  function onInputChange(inputProperties: InputProperties) {
    if (inputSelectedIndex === null) {
      return;
    }
    const newInputs = [...inputs];
    newInputs[inputSelectedIndex] = inputProperties;
    const { [inputProperties.formDataKey]: _, ...newQueryParameters } =
      queryParameters;
    onValueChange({
      ...properties,
      queryParameters: newQueryParameters,
      inputs: newInputs,
    });
  }

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

      {inputSelectedIndex === null && dataProvider && (
        <div className="p-2 bg-primary rounded-lg">
          <p className="text-sm">This form is populated with data.</p>
        </div>
      )}
      {inputSelectedIndex === null && (
        <Accordion
          selectionMode="multiple"
          isCompact
          fullWidth
          defaultExpandedKeys={["basic", "inputs", "style"]}
          className="p-0"
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
              <QuerySelection
                selectedQueryId={submitQueryId || ""}
                onQuerySelect={(query) => {
                  //Replace formdatakey fiel from inputs to empty string
                  const newInputs = inputs.map((input) => ({
                    ...input,
                    formDataKey: "",
                    defaultValueKey: "",
                  }));
                  onValueChange({
                    ...properties,
                    submitQueryId: query.id,
                    queryParameters: {},
                    inputs: newInputs,
                  });
                }}
              />
              <Spacer y={2} />
              {initialData &&
                submitQuery &&
                submitQuery.metadata.parameters?.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold">Query params</div>
                    <div className="flex flex-col gap-2 px-2 w-full">
                      {submitQuery.metadata?.parameters?.map(
                        (parameter: any, index: number) => {
                          if (disabledKeys.includes(parameter.name)) {
                            return null;
                          }
                          return (
                            <div>
                              <span className="text-sm">{parameter.name}</span>
                              <FormDefaultValueKeySelection
                                selectedKey={queryParameters[parameter.name]}
                                initialData={initialData}
                                onSelectionChange={(key) => {
                                  onValueChange({
                                    ...properties,
                                    queryParameters: {
                                      ...queryParameters,
                                      [parameter.name]: key,
                                    },
                                  });
                                }}
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
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
              onInputChange(inputProperties);
            }}
            disabledKeys={disabledKeys}
            initialData={initialData}
          />
        )}
      {inputSelectedIndex !== null &&
        inputs[inputSelectedIndex]?.type === InputType.Checkbox && (
          <FormCheckboxProperties
            properties={inputs[inputSelectedIndex] as CheckboxProperties}
            queryId={submitQueryId}
            onValueChange={(inputProperties) => {
              onInputChange(inputProperties);
            }}
            disabledKeys={disabledKeys}
            initialData={initialData}
          />
        )}
      {inputSelectedIndex !== null &&
        inputs[inputSelectedIndex]?.type === InputType.NumberInput && (
          <FormNumberInputProperties
            properties={inputs[inputSelectedIndex] as NumberInputProperties}
            queryId={submitQueryId}
            onValueChange={(inputProperties) => {
              onInputChange(inputProperties);
            }}
            disabledKeys={disabledKeys}
            initialData={initialData}
          />
        )}
    </div>
  );
}
