import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Input,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { FastboardTableProperties } from "./FastboardTable";
import { Add, Hierarchy3 } from "iconsax-react";

const FastboardTablePropertiesComponent = ({
  properties,
  onValueChange,
}: {
  properties: FastboardTableProperties;
  onValueChange: (properties: FastboardTableProperties) => void;
}) => {
  const { query, emptyMessage, hideHeader, isStriped } = properties;

  const queries = [
    {
      key: "1",
      label: "get all pokemons",
      value: {
        url: "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
        field: "results",
      },
    },
    {
      key: "2",
      label: "get pokemon by id 1",
      value: { url: "https://pokeapi.co/api/v2/pokemon/1", field: null },
    },
  ];
  return (
    <Accordion
      selectionMode="multiple"
      isCompact
      fullWidth
      defaultExpandedKeys={["basic", "actions", "style"]}
    >
      <AccordionItem key="basic" title="Basic">
        <div className="flex flex-col gap-2">
          <Autocomplete
            allowsCustomValue
            defaultItems={queries}
            defaultSelectedKey={
              queries.find((q) => q.value.url === query.url)?.key || ""
            }
            label="Url"
            placeholder="Select url"
            onSelectionChange={(key) => {
              const url = queries.find((q) => q.key === key);
              if (!url) return;

              onValueChange({
                ...properties,
                query: url.value,
              });
            }}
          >
            {(url) => (
              <AutocompleteItem
                key={url.key}
                startContent={<Hierarchy3 className={"text-primary"} />}
              >
                {url.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Input
            type="number"
            label="Rows per page"
            placeholder="10"
            labelPlacement="outside-left"
            value={String(properties.rowsPerPage)}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                rowsPerPage: Number(value),
              });
            }}
          />
          <Input
            label="Empty message"
            labelPlacement="outside"
            placeholder=""
            value={emptyMessage}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                emptyMessage: value,
              });
            }}
          />
        </div>
      </AccordionItem>
      <AccordionItem key="actions" title="Actions">
        <div>
          <div className="flex justify-end w-full">
            <Button endContent={<Add />} variant="light">
              Add
            </Button>
          </div>
          <Listbox aria-label="Action list" className="bg-content2 rounded-lg">
            <ListboxItem key={"1"}>Add</ListboxItem>
            <ListboxItem key={"2"}>Delete</ListboxItem>
            <ListboxItem key={"3"}>a</ListboxItem>
          </Listbox>
        </div>
      </AccordionItem>
      <AccordionItem key="style" title="Style">
        <div className="flex flex-col gap-2">
          <Checkbox
            isSelected={hideHeader}
            onValueChange={(isSelected) => {
              onValueChange({
                ...properties,
                hideHeader: isSelected,
              });
            }}
          >
            Hide Header
          </Checkbox>
          <Checkbox
            isSelected={isStriped}
            onValueChange={(isSelected) => {
              onValueChange({
                ...properties,
                isStriped: isSelected,
              });
            }}
          >
            Stripped
          </Checkbox>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default FastboardTablePropertiesComponent;
