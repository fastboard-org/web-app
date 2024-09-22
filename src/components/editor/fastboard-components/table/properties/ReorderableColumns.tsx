import EditableTitle from "@/components/shared/EditableTitle";
import { TableColumnProperties } from "@/types/editor/table-types";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Input,
  Spacer,
} from "@nextui-org/react";
import { Reorder, useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import ReorderIcon from "@/components/shared/icons/ReorderIcon";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { SearchNormal1 } from "iconsax-react";

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
      className="flex flex-row justify-between items-center h-10 p-2 mb-2 rounded-md border-2 border-content2"
    >
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
  const [search, setSearch] = useState("");

  useEffect(() => {
    setColumns(columnsProperties);
  }, [columnsProperties]);

  function toggleAllColumns(visible: boolean) {
    const newColumns = columns.map((column) => ({
      ...column,
      visible,
    }));
    setColumns(newColumns);
    if (onChange) {
      onChange(newColumns);
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-sm">Columns</h1>
      <div className="flex flex-row justify-between items-center gap-x-2">
        <Input
          className="w-2/3"
          placeholder="Search columns"
          startContent={<SearchNormal1 size="15" />}
          value={search}
          onValueChange={(value) => setSearch(value)}
        />
        <ButtonGroup size="sm" variant="flat">
          <Button onPress={() => toggleAllColumns(true)}>Show all</Button>
          <Button onPress={() => toggleAllColumns(false)}>Hide all</Button>
        </ButtonGroup>
      </div>

      <div
        className={
          "flex w-full max-h-60 justify-center items-center overflow-y-auto" +
          " " +
          scrollbarStyles.scrollbar
        }
      >
        <Reorder.Group
          className="w-full max-h-60"
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
          {columns
            .filter((column) =>
              column.column.label.toLowerCase().startsWith(search.toLowerCase())
            )
            .map((column) => (
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
