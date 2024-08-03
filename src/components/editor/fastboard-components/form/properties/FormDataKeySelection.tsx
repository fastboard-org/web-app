import { Query } from "@/types/connections";
import { Select, SelectItem } from "@nextui-org/react";

export default function FormDataKeySelection({
  selectedKey,
  query,
  onSelectionChange,
}: {
  selectedKey: string;
  query: Query | null;
  onSelectionChange: (formDataKey: string) => void;
}) {
  const parameters: () => { key: string; label: string }[] = () => {
    return (
      query?.metadata.parameters?.map(
        (p: { name: string; preview: string }) => ({
          key: p.name,
          label: p.name,
        })
      ) || []
    );
  };

  return (
    <Select
      aria-label="Select formData key"
      label="FormData key"
      labelPlacement="outside"
      items={parameters()}
      selectedKeys={[selectedKey]}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectionChange(e.target.value);
      }}
    >
      {(parameter) => (
        <SelectItem key={parameter.key}>{parameter.label}</SelectItem>
      )}
    </Select>
  );
}
