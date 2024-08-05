import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Dropdown,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
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
                header: null,
                footer: "",
                body: [],
              });
            }}
          />
        </div>
        {/*drop menu to select wich column is the header  */}
        <div className="flex flex-col gap-5  overflow-x-hidden">
          <Select
            aria-label="Header selector"
            items={body}
            disabledKeys={[]}
            selectedKeys={[header || ""]}
            label="Header"
            labelPlacement="outside"
            placeholder="Select header"
            onChange={(e) => {
              const newHeader = body.find(
                (field) => field.key === e.target.value
              );
              if (newHeader) {
                onValueChange({
                  ...properties,
                  header: newHeader.key,
                });
              }
            }}
            errorMessage="Something went wrong, header not found"
          >
            {(field) => <SelectItem key={field.key}>{field.label}</SelectItem>}
          </Select>
        </div>

        {/*drop menu to select wich column is the footer  */}
        <div className="flex flex-col gap-5  overflow-x-hidden">
          <Autocomplete
            aria-label="Footer selector"
            defaultItems={body}
            disabledKeys={[]}
            defaultSelectedKey={"bug"}
            selectedKey={footer}
            label="Footer"
            labelPlacement="outside"
            placeholder="Select footer"
            onSelectionChange={(key) => {
              const newFooter = body.find((field) => field.key === key);
              if (newFooter) {
                onValueChange({
                  ...properties,
                  footer: newFooter.key,
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
            fieldsProperties={body}
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
