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
import { EditableViewAction } from "./EditableViewAction";
import { ComponentType } from "@/types/editor";
import { FormProperties } from "@/types/editor/form";
import Option from "@/components/shared/Option";
import useDashboard from "@/hooks/dashboards/useDashboard";

export default function TableActionsList({
  actionsProperties,
  onChange,
}: {
  actionsProperties: TableActionProperty[];
  onChange?: (actions: TableActionProperty[]) => void;
}) {
  const { createModalFrame } = useDashboard();
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

  function addEditAction() {
    const modalId = createModalFrame({
      type: ComponentType.Form,
      properties: new FormProperties(),
    });

    const newAction: TableActionProperty = {
      key: `edit-action`,
      label: "New Edit Action",
      type: "edit",
      query: null,
      parameters: [],
      modalId,
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
    if (hasViewAction) {
      disabledKeys.push("view-action");
    }
    if (hasDeleteAction) {
      disabledKeys.push("delete-action");
    }
    if (hasEditAction) {
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
            <DropdownItem
              key="view-action"
              onPress={() => {
                addAction("New View Action", "view");
              }}
              startContent={<Eye size={15} />}
            >
              View
            </DropdownItem>
            <DropdownItem
              key="edit-action"
              startContent={<Edit size={15} />}
              onPress={addEditAction}
            >
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
            case "view": {
              return (
                <EditableViewAction
                  key={action.key}
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
            case "delete": {
              return (
                <EditableDeleteAction
                  key={action.key}
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
            case "edit": {
              return (
                <Option
                  key={action.key}
                  label={action.label}
                  startIcon={<Edit size={15} />}
                  onDelete={() => removeAction(action.key, index)}
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
