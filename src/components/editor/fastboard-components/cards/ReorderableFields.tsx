import EditableTitle from "@/components/shared/EditableTitle";
import { BodyFieldProperties } from "@/types/editor/cards-types";
import { TableColumnProperties } from "@/types/editor/table-types";
import { Button, Checkbox, Spacer } from "@nextui-org/react";
import { Reorder, useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import ReorderIcon from "@/components/shared/icons/ReorderIcon";

function ReorderableField({
  field,
  onChange,
}: {
  field: BodyFieldProperties;
  onChange: (newField: BodyFieldProperties) => void;
}) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      key={field.key}
      id={field.key}
      dragListener={false}
      dragControls={dragControls}
      value={field}
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
          value={field.label}
          onChange={(value) => {
            if (onChange) {
              onChange({
                ...field,
                label: value,
              });
            }
          }}
        />
        <div className="flex flex-row items-center justify-center">
          <Checkbox
            isSelected={field.visible}
            onValueChange={(value) => {
              if (onChange) {
                onChange({
                  ...field,
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

export default function ReorderableFields({
  fieldsProperties,
  onChange,
}: {
  fieldsProperties: BodyFieldProperties[];
  onChange?: (fields: BodyFieldProperties[]) => void;
}) {
  const [fields, setFields] = useState(fieldsProperties);

  useEffect(() => {
    setFields(fieldsProperties);
  }, [fieldsProperties]);

  return (
    <div>
      <h1 className="text-sm">Body</h1>
      <Spacer y={2} />
      <div
        className={"flex w-full justify-center items-center overflow-hidden"}
      >
        <Reorder.Group
          className="w-full"
          axis="y"
          layoutScroll
          values={fields}
          onReorder={(newOrder) => {
            setFields(newOrder);
            if (onChange) {
              onChange(newOrder);
            }
          }}
        >
          {fields.map((field) => (
            <ReorderableField
              key={field.key}
              field={field}
              onChange={(value) => {
                const newFields = fields.map((f) =>
                  f.key === field.key ? value : f
                );
                setFields(newFields);
                if (onChange) {
                  onChange(newFields);
                }
              }}
            />
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
