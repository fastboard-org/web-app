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
import { ComponentId, ComponentType } from "@/types/editor";
import { FormProperties } from "@/types/editor/form";
import Option from "@/components/shared/Option";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { CardProperties } from "@/types/editor/card-types";

export default function TableActionsList({
  tableId,
  actionsProperties,
  onActionSelect,
  onChange,
}: {
  tableId: ComponentId;
  actionsProperties: TableActionProperty[];
  onActionSelect: (action: TableActionProperty) => void;
  onChange?: (actions: TableActionProperty[]) => void;
}) {
  const { createModalFrame, deleteModalFrame, deletePage } = useDashboard();
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
      queryStrings: [],
    };

    setActions((previous) => [...previous, newAction]);
    if (onChange) {
      onChange([...actions, newAction]);
    }
  }

  function addEditAction() {
    const modalId = createModalFrame({
      type: ComponentType.Form,
      properties: {
        ...new FormProperties(),
        showShadow: false,
        dataProvider: {
          componentId: tableId,
          property: "selectedRow",
        },
      },
    });

    const newAction: TableActionProperty = {
      key: `edit-action`,
      label: "New Edit Action",
      type: "edit",
      query: null,
      parameters: [],
      modalId,
      queryStrings: [],
    };

    setActions((previous) => [...previous, newAction]);
    if (onChange) {
      onChange([...actions, newAction]);
    }
  }

  function removeAction(key: string, index: number) {
    if (actions[index].modalId) {
      deleteModalFrame(actions[index].modalId as string);
    }
    if (actions[index].pageId) {
      deletePage(actions[index].pageId);
    }
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
              Add
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

      <ul className="w-full rounded-lg pt-2 space-y-2">
        {actions.map((action, index) => {
          switch (action.type) {
            case "view": {
              return (
                <Option
                  key={action.key}
                  label={action.label}
                  startIcon={<Eye size={15} />}
                  onPress={() => onActionSelect(action)}
                  onDelete={() => removeAction(action.key, index)}
                />
              );
            }
            case "delete": {
              return (
                <Option
                  key={action.key}
                  label={action.label}
                  startIcon={<Trash size={15} />}
                  onPress={() => onActionSelect(action)}
                  onDelete={() => removeAction(action.key, index)}
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
