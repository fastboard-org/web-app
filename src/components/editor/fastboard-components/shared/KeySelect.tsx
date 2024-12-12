import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const KeySelect = ({
  keys,
  groupKey,
  onChange,
  label = "Group by",
  placeholder = "Select group key",
}: {
  keys: string[];
  onChange: (key: string) => void;
  groupKey: string;
  label?: string;
  placeholder?: string;
}) => {
  const items = keys.map((key) => ({ label: key, id: key }));

  return (
    <Autocomplete
      className={"overflow-hidden"}
      aria-label="Key selector"
      defaultItems={items}
      disabledKeys={[]}
      selectedKey={groupKey}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      listboxProps={{
        emptyContent: "Select a query to see available keys",
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
