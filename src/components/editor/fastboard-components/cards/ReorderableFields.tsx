import EditableTitle from "@/components/shared/EditableTitle";
import { BodyFieldProperties } from "@/types/editor/cards-types";
import { TableColumnProperties } from "@/types/editor/table-types";
import { Button, Checkbox, Spacer } from "@nextui-org/react";
import { Reorder, useDragControls } from "framer-motion";
import { useEffect, useState } from "react";

function ReorderIcon({
  dragControls,
  size,
}: {
  dragControls: any;
  size?: number;
}) {
  return (
    <svg
      className="cursor-grab"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39 39"
      width={size || 20}
      height={size || 20}
      onPointerDown={(event) => dragControls.start(event)}
    >
      <path
        d="M 5 0 C 7.761 0 10 2.239 10 5 C 10 7.761 7.761 10 5 10 C 2.239 10 0 7.761 0 5 C 0 2.239 2.239 0 5 0 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 19 0 C 21.761 0 24 2.239 24 5 C 24 7.761 21.761 10 19 10 C 16.239 10 14 7.761 14 5 C 14 2.239 16.239 0 19 0 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 33 0 C 35.761 0 38 2.239 38 5 C 38 7.761 35.761 10 33 10 C 30.239 10 28 7.761 28 5 C 28 2.239 30.239 0 33 0 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 33 14 C 35.761 14 38 16.239 38 19 C 38 21.761 35.761 24 33 24 C 30.239 24 28 21.761 28 19 C 28 16.239 30.239 14 33 14 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 19 14 C 21.761 14 24 16.239 24 19 C 24 21.761 21.761 24 19 24 C 16.239 24 14 21.761 14 19 C 14 16.239 16.239 14 19 14 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 5 14 C 7.761 14 10 16.239 10 19 C 10 21.761 7.761 24 5 24 C 2.239 24 0 21.761 0 19 C 0 16.239 2.239 14 5 14 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 5 28 C 7.761 28 10 30.239 10 33 C 10 35.761 7.761 38 5 38 C 2.239 38 0 35.761 0 33 C 0 30.239 2.239 28 5 28 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 19 28 C 21.761 28 24 30.239 24 33 C 24 35.761 21.761 38 19 38 C 16.239 38 14 35.761 14 33 C 14 30.239 16.239 28 19 28 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 33 28 C 35.761 28 38 30.239 38 33 C 38 35.761 35.761 38 33 38 C 30.239 38 28 35.761 28 33 C 28 30.239 30.239 28 33 28 Z"
        fill="#CCC"
      ></path>
    </svg>
  );
}

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
