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
import QueryParameters from "./QueryParameters";

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
    null,
  );
  const disabledKeys = inputs.map((input) => input.formDataKey);

  useEffect(() => {
    resetDefaultValues();
  }, [initialData]);

  useEffect(() => {
    //The selected component has changed, reset the input selected index
    setInputSelectedIndex(null);
  }, [selectedComponentId]);

  function resetDefaultValues() {
    const dataKeys = Object.keys(initialData || {});

    //Clear all default values from query paramters
    const newQueryParameters = Object.entries(queryParameters).reduce(
      (acc, [key, value]) => {
        if (!dataKeys.includes(value)) {
          return acc;
        }
        return {
          ...acc,
          [key]: value,
        };
      },
      {},
    );

    //Clear all default values from inputs
    const newInputs = inputs.map((input) => {
      if (!dataKeys.includes(input.defaultValueKey)) {
        return {
          ...input,
          defaultValueKey: "",
        };
      }
      return input;
    });

    onValueChange({
      ...properties,
      queryParameters: newQueryParameters,
      inputs: newInputs,
    });
  }

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
          <p className="text-sm text-white">
            This form is populated with data.
          </p>
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
                    submitQueryData: {
                      queryId: query.id,
                      connectionId: query.connection_id,
                      method: query.metadata.method,
                    },
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
                    <div className="text-sm">Query parameters</div>
                    <QueryParameters
                      queryId={submitQueryId}
                      queryParameters={queryParameters}
                      initialData={initialData}
                      disabledParameters={disabledKeys}
                      onValueChange={(newQueryParameters) => {
                        onValueChange({
                          ...properties,
                          queryParameters: newQueryParameters,
                        });
                      }}
                    />
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
