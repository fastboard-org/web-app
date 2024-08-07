import EditableTitle from "@/components/shared/EditableTitle";
import { TableColumnProperties } from "@/types/editor/table-types";
import { Button, Checkbox, Spacer } from "@nextui-org/react";
import { Reorder, useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import ReorderIcon from "@/components/shared/icons/ReorderIcon";

function ReorderableColumn({
  column,
  onChange,
}: {
  column: TableColumnProperties;
  onChange?: (newColumnValue: TableColumnProperties) => void;
}) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      key={column.column.key}
      id={column.column.key}
      dragListener={false}
      dragControls={dragControls}
      value={column}
      className="p-2 mb-2 rounded-md border-2 border-content2"
    >
      <div className="flex flex-row columns-center justify-between">
        <EditableTitle
          titleClassName={
            "max-w-[150px] flex items-center hover:text-foreground-400 truncate"
          }
          inputClassName={
            "border-none max-w-[150px] bg-transparent outline-none text-foreground-300 placeholder-foreground-300"
          }
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
        <div className="flex flex-row items-center justify-center">
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
          <Button isIconOnly variant="light" disableAnimation size="sm">
            <ReorderIcon dragControls={dragControls} size={15} />
          </Button>
        </div>
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
        className={"flex w-full justify-center items-center overflow-hidden"}
      >
        <Reorder.Group
          className="w-full"
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
