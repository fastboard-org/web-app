import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const GroupKeySelect = ({
  keys,
  groupKey,
  onChange,
}: {
  keys: string[];
  onChange: (key: string) => void;
  groupKey: string;
}) => {
  const items = keys.map((key) => ({ label: key, id: key }));

  return (
    <Autocomplete
      className={"overflow-hidden"}
      aria-label="Group key selector"
      defaultItems={items}
      disabledKeys={[]}
      selectedKey={groupKey}
      label="Group by"
      labelPlacement="outside"
      placeholder="Select group key"
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

export default GroupKeySelect;
