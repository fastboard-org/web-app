import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Dropdown,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FastboardCardsProperties } from "@/types/editor/cards-types";
import QuerySelection from "../../QuerySelection";
import ReorderableFields from "./ReorderableFields";

const FastboardCardsPropertiesComponent = ({
  properties,
  onValueChange,
}: {
  properties: FastboardCardsProperties;
  onValueChange: (properties: FastboardCardsProperties) => void;
}) => {
  const { sourceQuery, emptyMessage, header, footer, body } = properties;
  const [headerFields, setHeaderFields] = useState(header);
  const [footerFields, setFooterFields] = useState(footer);
  const [bodyFields, setBodyFields] = useState(body);
  // const [cardFields, setCardFields] = useState(fields);

  // useEffect(() => {
  //   setCardFields(fields);
  //   console.log("Che, cambio cardFields", cardFields);
  // }, [fields]);

  useEffect(() => {
    setBodyFields(body);
  }, [body]);

  // console.log("cardFields", cardFields);

  return (
    <Accordion
      selectionMode="multiple"
      isCompact
      fullWidth
      defaultExpandedKeys={["basic"]}
    >
      <AccordionItem
        key="basic"
        title="Basic"
        className="pb-2"
        classNames={{
          title: "font-medium",
        }}
      >
        <div className="flex flex-col gap-5  overflow-x-hidden">
          <QuerySelection
            selectedQueryId={sourceQuery?.id || ""}
            onQuerySelect={(sourceQuery) => {
              onValueChange({
                ...properties,
                sourceQuery: sourceQuery,
              });
            }}
          />
        </div>
        {/*drop menu to select wich column is the header  */}
        <div className="flex flex-col gap-5  overflow-x-hidden">
          <Autocomplete
            aria-label="Header selector"
            defaultItems={bodyFields}
            disabledKeys={[]}
            defaultSelectedKey={"BUG"}
            selectedKey={"BUG"}
            label="Header"
            labelPlacement="outside"
            placeholder="Select header"
            onSelectionChange={(key) => {
              const header = bodyFields.find((field) => field.key === key);
              if (header) {
                onValueChange({
                  ...properties,
                  header: header.key,
                });
              }
            }}
            errorMessage="Something went wrong, header not found"
          >
            {(field) => (
              <AutocompleteItem key={field.key}>{field.label}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        {/*drop menu to select wich column is the footer  */}
        <div className="flex flex-col gap-5  overflow-x-hidden">
          <Autocomplete
            aria-label="Footer selector"
            defaultItems={bodyFields}
            disabledKeys={[]}
            defaultSelectedKey={"BUG"}
            selectedKey={"BUG"}
            label="Footer"
            labelPlacement="outside"
            placeholder="Select footer"
            onSelectionChange={(key) => {
              const footer = bodyFields.find((field) => field.key === key);
              if (footer) {
                onValueChange({
                  ...properties,
                  footer: footer.key,
                });
              }
            }}
            errorMessage="Something went wrong, footer not found"
          >
            {(field) => (
              <AutocompleteItem key={field.key}>{field.label}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        {/*drop menu to select wich columns are the body  */}
        <div className="flex flex-col gap-5  overflow-x-hidden">
          <ReorderableFields
            fieldsProperties={bodyFields}
            onChange={(newOrder) => {
              onValueChange({
                ...properties,
                body: newOrder,
              });
            }}
          />
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default FastboardCardsPropertiesComponent;
