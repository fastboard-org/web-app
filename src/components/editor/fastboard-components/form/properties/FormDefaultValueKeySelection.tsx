import { Select, SelectItem } from "@nextui-org/react";

export default function FormDefaultValueKeySelection({
  selectedKey,
  initialData,
  onSelectionChange,
}: {
  selectedKey: string;
  initialData?: any;
  onSelectionChange: (key: string) => void;
}) {
  const items = initialData
    ? Object.keys(initialData).map((key) => ({ key: key, label: key }))
    : [];

  return (
    <Select
      items={items}
      selectedKeys={[selectedKey]}
      label="Default value"
      labelPlacement="outside"
      onChange={(e) => {
        onSelectionChange(e.target.value);
      }}
    >
      {(key) => <SelectItem key={key.key}>{key.label}</SelectItem>}
    </Select>
  );
}
