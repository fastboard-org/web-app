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
  Slider,
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
  const { sourceQuery, emptyMessage, header, footer, body, cardsPerRow } =
    properties;

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
        {/*Esto tenia un overflow-x-hidden cuando era un Autocomplete que lo saque porque agregaba un scrollbar.
        Advertencia por si eso rompio algo*/}
        <div className="flex flex-col gap-5">
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
        <div className="flex flex-col gap-5">
          <Select
            aria-label="Footer selector"
            items={body}
            disabledKeys={[]}
            selectedKeys={[footer || ""]}
            label="Footer"
            labelPlacement="outside"
            placeholder="Select footer"
            onChange={(e) => {
              const newFooter = body.find(
                (field) => field.key === e.target.value
              );
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
          </Select>
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

        {/*slider to select how many cards per row */}
        <div className="flex flex-col gap-5">
          <Slider
            label="Cards per row"
            // formatOptions={{ style: "currency" }}
            step={1}
            minValue={1}
            maxValue={7}
            defaultValue={3}
            value={cardsPerRow}
            onChange={(e) => {
              const selectedValue = e as number;
              onValueChange({
                ...properties,
                cardsPerRow: selectedValue,
              });
            }}
          />
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default FastboardCardsPropertiesComponent;
