import {
  FilterProperties,
  FilterType,
  StringFilterProperties,
} from "@/types/editor/table-types";
import { Input } from "@nextui-org/react";
import { Column, Table } from "@tanstack/react-table";

export function StringFilter({
  column,
  properties,
}: {
  column: Column<any, unknown>;
  properties: StringFilterProperties;
}) {
  const columnFilterValue = column.getFilterValue();
  const { label, placeholder } = properties;

  return (
    <Input
      aria-label="String filter input"
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      isClearable
      value={(columnFilterValue ?? "") as string}
      onValueChange={(value) => column.setFilterValue(value)}
    />
  );
}

export function NumberFilter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <div className="flex flex-row h-full items-end gap-x-1">
      <Input
        aria-label="Number filter input"
        type="number"
        placeholder="min"
        max={(columnFilterValue as [number, number])?.[1]}
        value={(columnFilterValue as [number, number])?.[0]?.toString() ?? ""}
        onValueChange={(value) =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
      />
      <Input
        aria-label="Number filter input"
        type="number"
        placeholder="max"
        min={(columnFilterValue as [number, number])?.[0]}
        value={(columnFilterValue as [number, number])?.[1]?.toString() ?? ""}
        onValueChange={(value) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
      />
    </div>
  );
}

export default function Filters({
  table,
  filters,
}: {
  table: Table<any>;
  filters: FilterProperties[];
}) {
  const columns = table.getAllColumns();

  return (
    <div className="flex flex-row gap-2">
      {filters.map((filter, index) => {
        const column = columns.find((column) => column.id === filter.columnKey);

        if (!column) return null;
        switch (filter.type) {
          case FilterType.StringFilter:
            return (
              <StringFilter
                key={index}
                column={column}
                properties={filter as StringFilterProperties}
              />
            );
          case FilterType.NumberFilter:
            return <NumberFilter key={index} column={column} />;
        }
      })}
    </div>
  );
}
