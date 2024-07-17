import {
  Button,
  Code,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import QuerySelector from "../QuerySelector";
import EditableTitle from "@/components/shared/EditableTitle";
import { RiQuestionLine } from "react-icons/ri";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { TableActionProperty } from "@/types/editor/table-types";

function TableAction({
  action,
  onDelete,
}: {
  action: { key: string; label: string };
  onDelete: (key: string) => void;
}) {
  return (
    <li
      key={action.key}
      className="flex flex-row justify-between items-center w-full my-2"
    >
      <Popover placement="top-start">
        <PopoverTrigger>
          <Button
            className="w-full justify-between border "
            variant="light"
            onPress={() => {}}
            endContent={
              <Button
                isIconOnly
                variant="light"
                onPress={() => {
                  onDelete(action.key);
                }}
              >
                <IoIosClose size={20} className="text-foreground-600" />
              </Button>
            }
          >
            {action.label}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div
            className={
              "flex flex-col gap-2 p-2 h-60 w-60 overflow-y-auto" +
              " " +
              scrollbarStyles.scrollbar
            }
          >
            <EditableTitle value={action.label} onChange={(value) => {}} />
            <QuerySelector
              queries={[]}
              selectedQueryId={""}
              onSelectionChange={(key) => {}}
            />
            <div className="flex justify-end">
              <Tooltip
                content={
                  <div>
                    Use{" "}
                    <Code className={"text-xs"}>{"{{row.columnName}}"}</Code>{" "}
                    syntax to access row values.
                  </div>
                }
                className={"p-3 w-[275px] -translate-x-[35px] text-xs"}
                placement={"bottom"}
                offset={10}
                closeDelay={0}
              >
                <div>
                  <RiQuestionLine className={"text-foreground-500"} size={15} />
                </div>
              </Tooltip>
            </div>
            <Input
              label="Label"
              labelPlacement="outside-left"
              placeholder="Action label"
              value={action.label}
              onChange={(e) => {}}
            />
            <Input
              label="Label"
              labelPlacement="outside-left"
              placeholder="Action label"
              value={action.label}
              onChange={(e) => {}}
            />{" "}
            <Input
              label="Label"
              labelPlacement="outside-left"
              placeholder="Action label"
              value={action.label}
              onChange={(e) => {}}
            />
          </div>
        </PopoverContent>
      </Popover>
    </li>
  );
}

export default function TableActionsList({
  actionsProperties,
  onChange,
}: {
  actionsProperties: TableActionProperty[];
  onChange?: (actions: TableActionProperty[]) => void;
}) {
  const [actions, setActions] = useState(actionsProperties);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    setActions(actionsProperties);
  }, [actionsProperties]);

  function addAction() {
    const newAction: TableActionProperty = {
      key: `new-${lastIndex}`,
      label: `New Action ${lastIndex}`,
      queryId: "",
      parameters: [],
    };

    setLastIndex(lastIndex + 1);
    setActions((previous) => [...previous, newAction]);
    if (onChange) {
      onChange([...actions, newAction]);
    }
  }

  function removeAction(key: string, index: number) {
    if (index === actions.length - 1) {
      if (actions.length === 1) {
        setLastIndex(0);
      } else {
        const lastAction = actions[index - 1];
        setLastIndex(parseInt(lastAction.key.split("-")[1]) + 1);
      }
    }

    const newActions = actions.filter((action) => action.key !== key);
    setActions(newActions);
    if (onChange) {
      onChange(newActions);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <ul className="w-[95%] rounded-lg p-2">
        {actions.map((action, index) => (
          <TableAction
            action={action}
            onDelete={() => {
              removeAction(action.key, index);
            }}
          />
        ))}
      </ul>
      <Button
        className={"w-[90%]"}
        onPress={() => {
          addAction();
        }}
        variant={"flat"}
      >
        Add Action
      </Button>
    </div>
  );
}
