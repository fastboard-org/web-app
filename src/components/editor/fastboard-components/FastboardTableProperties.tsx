import { Autocomplete, AutocompleteItem, Checkbox } from "@nextui-org/react";
import { FastboardTableProperties } from "./FastboardTable";
import { Hierarchy3 } from "iconsax-react";

const FastboardTablePropertiesComponent = ({
  properties,
  onValueChange,
}: {
  properties: FastboardTableProperties;
  onValueChange: (properties: FastboardTableProperties) => void;
}) => {
  console.log(properties);
  const { query, hideHeader, isStriped } = properties;

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
  );
};

export default FastboardTablePropertiesComponent;
