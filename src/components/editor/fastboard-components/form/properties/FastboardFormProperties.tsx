import {
  DefaultInputProperties,
  FormProperties,
  InputProperties,
  InputType,
} from "@/types/editor/form";
import {
  Accordion,
  AccordionItem,
  BreadcrumbItem,
  Breadcrumbs,
  Input,
  Select,
  SelectItem,
  Spacer,
} from "@nextui-org/react";
import QuerySelection from "../../../QuerySelection";
import { useEffect, useState } from "react";
import FormInputsList from "./FormInputsList";
import { useRecoilValue } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";
import useGetQuery from "@/hooks/connections/useGetQuery";
import QueryParameters from "./QueryParameters";
import FormInput from "./FormInput";
import { HTTP_CONTENT_TYPE } from "@/types/connections";
import { QueryType } from "@/types/connections";
import FormStyle from "./FormStyle";

export default function FastboardFormProperties({
  properties,
  onValueChange,
}: {
  properties: FormProperties;
  onValueChange: (properties: FormProperties) => void;
}) {
  const {
    title,
    submitQueryData,
    contentType,
    queryParameters,
    submitButtonLabel,
    inputs,
    dataProvider,
    initialData,
  } = properties;
  const { query: submitQuery } = useGetQuery(submitQueryData?.queryId || "");
  const { selectedComponentId } = useRecoilValue(propertiesDrawerState);
  const [inputSelectedIndex, setInputSelectedIndex] = useState<number | null>(
    null
  );
  const disabledKeys = inputs.map((input) => input.formDataKey);

  useEffect(() => {
    resetDefaultValues();
  }, [initialData]);

  useEffect(() => {
    //The selected component has changed, reset the input selected index
    setInputSelectedIndex(null);
  }, [selectedComponentId]);

  function createInputs(
    parameters: any[] | undefined | null
  ): InputProperties[] {
    if (!parameters) {
      return [];
    }

    return parameters.map((parameter) => {
      let inputProperties = DefaultInputProperties.of(InputType.TextInput);
      if (!isNaN(Number(parameter.preview))) {
        inputProperties = DefaultInputProperties.of(InputType.NumberInput);
      } else if (
        parameter.preview === "true" ||
        parameter.preview === "false"
      ) {
        inputProperties = DefaultInputProperties.of(InputType.Checkbox);
      }
      return {
        ...inputProperties,
        label: parameter.name,
        formDataKey: parameter.name,
      };
    });
  }

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
      {}
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
            <div className="flex flex-col gap-y-2 overflow-hidden">
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
              <QuerySelection
                selectedQueryId={submitQueryData?.queryId || ""}
                onQuerySelect={(query) => {
                  onValueChange({
                    ...properties,
                    submitQueryData: {
                      queryId: query.id,
                      connectionId: query.connection_id,
                      method: query.metadata.method,
                    },
                    queryParameters: {},
                    inputs: createInputs(query.metadata?.parameters),
                  });
                }}
                type={QueryType.UPDATE}
              />
              <Select
                label="Content type"
                labelPlacement="outside"
                placeholder="Select content type"
                disallowEmptySelection
                selectedKeys={[contentType]}
                onChange={(e) => {
                  onValueChange({
                    ...properties,
                    contentType: e.target.value as HTTP_CONTENT_TYPE,
                  });
                }}
              >
                <SelectItem key={HTTP_CONTENT_TYPE.JSON}>
                  {HTTP_CONTENT_TYPE.JSON}
                </SelectItem>
                <SelectItem key={HTTP_CONTENT_TYPE.MULTIPART}>
                  {HTTP_CONTENT_TYPE.MULTIPART}
                </SelectItem>
              </Select>
              {initialData &&
                submitQuery &&
                submitQuery.metadata.parameters?.length > 0 && (
                  <div>
                    <QueryParameters
                      queryId={submitQueryData?.queryId || ""}
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
            {!submitQueryData && (
              <div className="flex justify-center text-sm">
                Select a query to enable inputs
              </div>
            )}
            {submitQueryData && (
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
          <AccordionItem
            key="style"
            className="pb-2"
            title="Style"
            classNames={{
              title: "font-medium",
            }}
          >
            <FormStyle properties={properties} onValueChange={onValueChange} />
          </AccordionItem>
        </Accordion>
      )}

      {inputSelectedIndex !== null && (
        <FormInput
          input={inputs[inputSelectedIndex]}
          submitQueryData={submitQueryData}
          disabledKeys={disabledKeys}
          initialData={initialData}
          onInputChange={onInputChange}
        />
      )}
    </div>
  );
}
