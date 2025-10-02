import {
  FilterProperties,
  FilterType,
  NumberFilterProperties,
  StringFilterProperties,
} from "@/types/editor/table-types";
import { Input, Spacer } from "@nextui-org/react";
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
      className="w-full md:w-40"
      classNames={{
        mainWrapper: "flex justify-end",
        label: "truncate",
      }}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      isClearable
      value={(columnFilterValue ?? "") as string}
      onValueChange={(value) => column.setFilterValue(value)}
    />
  );
}

export function NumberFilter({
  column,
  properties,
}: {
  column: Column<any, unknown>;
  properties: NumberFilterProperties;
}) {
  const columnFilterValue = column.getFilterValue();
  const { label } = properties;

  return (
    <div className="flex flex-col w-full md:w-40 justify-end gap-y-2">
      <h2 className="text-sm truncate">{label}</h2>
      <div className="flex flex-row items-end gap-x-1">
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
    <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-x-5 w-full md:w-auto">
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
            return (
              <NumberFilter
                key={index}
                column={column}
                properties={filter as NumberFilterProperties}
              />
            );
        }
      })}
    </div>
  );
}
