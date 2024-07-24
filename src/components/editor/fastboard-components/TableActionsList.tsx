import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TableActionProperty } from "@/types/editor/table-types";
import { Add, Edit, Eye, Trash } from "iconsax-react";
import { EditableDeleteAction } from "./EditableDeleteAction";

export default function TableActionsList({
  actionsProperties,
  onChange,
}: {
  actionsProperties: TableActionProperty[];
  onChange?: (actions: TableActionProperty[]) => void;
}) {
  const [actions, setActions] = useState(actionsProperties);

  useEffect(() => {
    setActions(actionsProperties);
  }, [actionsProperties]);

  function addAction(name: string, type: "view" | "edit" | "delete") {
    const newAction: TableActionProperty = {
      key: `${type}-action`,
      label: name,
      type,
      query: null,
      parameters: [],
    };

    setActions((previous) => [...previous, newAction]);
    if (onChange) {
      onChange([...actions, newAction]);
    }
  }

  function removeAction(key: string, index: number) {
    const newActions = actions.filter((action) => action.key !== key);
    setActions(newActions);
    if (onChange) {
      onChange(newActions);
    }
  }

  const getDisabledKeys = () => {
    const hasViewAction = actions.some((action) => action.type === "view");
    const hasDeleteAction = actions.some((action) => action.type === "delete");
    const hasEditAction = actions.some((action) => action.type === "edit");

    const disabledKeys = [];
    //TODO: delete this true conditions when implementing the logic for the actions
    if (true) {
      disabledKeys.push("view-action");
    }
    if (hasDeleteAction) {
      disabledKeys.push("delete-action");
    }
    if (true) {
      disabledKeys.push("edit-action");
    }
    return disabledKeys;
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex justify-end w-full">
        <Dropdown placement={"bottom"}>
          <DropdownTrigger>
            <Button startContent={<Add size={20} />} variant={"flat"}>
              Add Action
            </Button>
          </DropdownTrigger>
          <DropdownMenu disabledKeys={getDisabledKeys()}>
            <DropdownItem key="view-action" startContent={<Eye size={15} />}>
              View
            </DropdownItem>
            <DropdownItem key="edit-action" startContent={<Edit size={15} />}>
              Edit
            </DropdownItem>

            <DropdownItem
              key="delete-action"
              onPress={() => {
                addAction("New Delete Action", "delete");
              }}
              startContent={<Trash size={15} />}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <ul className="w-full rounded-lg pt-2">
        {actions.map((action, index) => {
          switch (action.type) {
            case "delete": {
              return (
                <EditableDeleteAction
                  action={action}
                  onChange={(newAction) => {
                    const newActions = actions.map((a) =>
                      a.key === action.key ? newAction : a
                    );
                    setActions(newActions);
                    if (onChange) {
                      onChange(newActions);
                    }
                  }}
                  onDelete={() => {
                    removeAction(action.key, index);
                  }}
                />
              );
            }
            default: {
              return <></>;
            }
          }
        })}
      </ul>
    </div>
  );
}
