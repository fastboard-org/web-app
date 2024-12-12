import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const KeySelect = ({
  keys,
  selectedKey,
  onChange,
  label = "Group by",
  placeholder = "Select group key",
  emptyContent = "Select a query to see available keys",
}: {
  keys: string[];
  onChange: (key: string) => void;
  selectedKey: string;
  label?: string;
  placeholder?: string;
  emptyContent?: string;
}) => {
  const items = keys.map((key) => ({ label: key, id: key }));

  return (
    <Autocomplete
      className={"overflow-hidden"}
      aria-label="Key selector"
      defaultItems={items}
      disabledKeys={[]}
      selectedKey={selectedKey}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      listboxProps={{
        emptyContent,
      }}
      onSelectionChange={(key) => {
        const newKey = items.find((item) => item.id === key)?.label;
        if (newKey) {
          onChange(newKey);
        }
      }}
    >
      {(item) => (
        <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default KeySelect;
