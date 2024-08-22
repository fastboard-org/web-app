import { Select, SelectItem } from "@nextui-org/react";

export default function FormDefaultValueKeySelection({
  selectedKey,
  initialData,
  onSelectionChange,
  showLabel = true,
}: {
  selectedKey: string;
  initialData?: any;
  onSelectionChange: (key: string) => void;
  showLabel?: boolean;
}) {
  const items = initialData
    ? Object.keys(initialData).map((key) => ({ key: key, label: key }))
    : [];

  return (
    <Select
      aria-label="Select default value"
      items={items}
      selectedKeys={[selectedKey]}
      label={showLabel ? "Default value" : ""}
      labelPlacement="outside"
      placeholder="Select a default value"
      onChange={(e) => {
        onSelectionChange(e.target.value);
      }}
    >
      {(key) => <SelectItem key={key.key}>{key.label}</SelectItem>}
    </Select>
  );
}
