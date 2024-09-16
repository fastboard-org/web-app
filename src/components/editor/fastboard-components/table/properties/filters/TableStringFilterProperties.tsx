import {
  StringFilterProperties,
  TableColumnProperties,
} from "@/types/editor/table-types";
import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";

export default function TableStringFilterProperties({
  properties,
  columns,
  onValueChange,
}: {
  properties: StringFilterProperties;
  columns: TableColumnProperties[];
  onValueChange: (properties: StringFilterProperties) => void;
}) {
  const { columnKey, label, placeholder, caseSensitive, exactMatch } =
    properties;

  return (
    <div className="flex flex-col gap-y-2">
      <Select
        aria-label="Select default value"
        items={columns.map((c) => ({
          key: c.column.key,
          label: c.column.label,
        }))}
        selectedKeys={[columnKey ?? ""]}
        label="Column"
        labelPlacement="outside"
        placeholder="Select column to filter"
        onChange={(e) => {
          onValueChange({ ...properties, columnKey: e.target.value });
        }}
      >
        {(key) => <SelectItem key={key.key}>{key.label}</SelectItem>}
      </Select>
      <Input
        aria-label="String filter label input"
        label="Label"
        labelPlacement="outside"
        placeholder="label"
        value={label}
        onValueChange={(value) =>
          onValueChange({ ...properties, label: value })
        }
      />
      <Input
        aria-label="String filter placeholder input"
        label="Placeholder"
        labelPlacement="outside"
        placeholder="placeholder"
        value={placeholder}
        onValueChange={(value) =>
          onValueChange({ ...properties, placeholder: value })
        }
      />
      <div className="flex flex-row justify-between">
        <h1 className="text-sm">Case sensitive</h1>
        <Checkbox
          isSelected={caseSensitive}
          onValueChange={(value) => {
            onValueChange({ ...properties, caseSensitive: value });
          }}
        />
      </div>
      <div className="flex flex-row justify-between">
        <h1 className="text-sm">Exact match</h1>
        <Checkbox
          isSelected={exactMatch}
          onValueChange={(value) => {
            onValueChange({ ...properties, exactMatch: value });
          }}
        />
      </div>
    </div>
  );
}
