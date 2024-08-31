import { Input } from "@nextui-org/react";
import { Column } from "@tanstack/react-table";

export function StringFilter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <Input
      aria-label="String filter input"
      label="Search"
      labelPlacement="outside"
      placeholder="search..."
      isClearable
      value={(columnFilterValue ?? "") as string}
      onValueChange={(value) => column.setFilterValue(value)}
    />
  );
}

export default function Filters() {
  return (
    <div className="grid grid-flow-col-dense gap-2">
      <Input
        className=""
        label="Search"
        labelPlacement="outside"
        placeholder="search..."
      />
      <Input label="Search" labelPlacement="outside" placeholder="search" />
      <Input label="Search" labelPlacement="outside" placeholder="search" />
    </div>
  );
}
