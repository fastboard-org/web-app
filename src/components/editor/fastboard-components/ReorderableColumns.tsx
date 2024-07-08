import EditableTitle from "@/components/shared/EditableTitle";
import { Column } from "@/hooks/usePaginatedData";
import { Checkbox, Spacer } from "@nextui-org/react";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import scrollBarStyles from "@/styles/scrollbar.module.css";

export interface TableColumnProperties {
  column: Column;
  visible: boolean;
}

function ReorderableColumn({
  column,
  onChange,
}: {
  column: TableColumnProperties;
  onChange?: (newColumnValue: TableColumnProperties) => void;
}) {
  return (
    <Reorder.Item
      key={column.column.key}
      value={column}
      className="bg-content2 p-2 rounded-sm hover:bg-content3 cursor-pointer"
    >
      <div className="flex flex-row columns-center justify-between">
        <EditableTitle
          value={column.column.label}
          onChange={(value) => {
            if (onChange) {
              onChange({
                ...column,
                column: {
                  ...column.column,
                  label: value,
                },
              });
            }
          }}
        />
        <Checkbox
          isSelected={column.visible}
          onValueChange={(value) => {
            if (onChange) {
              onChange({
                ...column,
                visible: value,
              });
            }
          }}
        />
      </div>
    </Reorder.Item>
  );
}

export default function ReorderableColumns({
  columnsProperties,
  onChange,
}: {
  columnsProperties: TableColumnProperties[];
  onChange?: (columns: TableColumnProperties[]) => void;
}) {
  const [columns, setColumns] = useState(columnsProperties);

  useEffect(() => {
    setColumns(columnsProperties);
  }, [columnsProperties]);

  return (
    <div>
      <h1 className="text-sm">Columns</h1>
      <Spacer y={2} />
      <div
        className={"flex w-full justify-center items-center  overflow-y-auto"}
      >
        <Reorder.Group
          className="w-[90%] border-content4 border"
          axis="y"
          layoutScroll
          values={columns}
          onReorder={(newOrder) => {
            setColumns(newOrder);
            if (onChange) {
              onChange(newOrder);
            }
          }}
        >
          {columns.map((column) => (
            <ReorderableColumn
              key={column.column.key}
              column={column}
              onChange={(value) => {
                const newColumns = columns.map((c) =>
                  c.column.key === value.column.key ? value : c
                );
                setColumns(newColumns);
                if (onChange) {
                  onChange(newColumns);
                }
              }}
            />
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
