import {
  NumberFilterProperties,
  TableColumnProperties,
} from "@/types/editor/table-types";
import { Input, Select, SelectItem } from "@nextui-org/react";

export default function TableNumberFilterProperties({
  properties,
  columns,
  onValueChange,
}: {
  properties: NumberFilterProperties;
  columns: TableColumnProperties[];
  onValueChange: (properties: NumberFilterProperties) => void;
}) {
  const { columnKey, label } = properties;

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
        aria-label="Number filter label input"
        label="Label"
        labelPlacement="outside"
        placeholder="label"
        value={label}
        onValueChange={(value) =>
          onValueChange({ ...properties, label: value })
        }
      />
    </div>
  );
}
