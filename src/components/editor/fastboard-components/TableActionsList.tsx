import { Button } from "@nextui-org/react";
import { Add } from "iconsax-react";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

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
      className="flex flex-row justify-between items-center w-full"
    >
      <Button
        className="w-full justify-between "
        variant="light"
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
    </li>
  );
}

export default function TableActionsList({
  actionsProperties,
  onChange,
}: {
  actionsProperties: { key: string; label: string }[];
  onChange?: (actions: { key: string; label: string }[]) => void;
}) {
  const [actions, setActions] = useState(actionsProperties);
  const [lastIndex, setLastIndex] = useState(0);

  /*
  useEffect(() => {
    setActions(actionsProperties);
  }, [actionsProperties]);*/

  function addAction() {
    const key = `new-${lastIndex}`;
    const label = `New Action ${lastIndex}`;

    setLastIndex(lastIndex + 1);
    setActions((previous) => [...previous, { key, label }]);
    if (onChange) {
      onChange([...actions, { key, label }]);
    }
  }

  function removeAction(key: string, isLast: boolean) {
    if (isLast) {
      setLastIndex(actions.length - 1);
    }
    const newActions = actions.filter((action) => action.key !== key);
    setActions(newActions);
    if (onChange) {
      onChange(newActions);
    }
  }

  return (
    <div>
      <div className="flex justify-end w-full">
        <Button
          isIconOnly
          variant="light"
          onClick={() => {
            addAction();
          }}
        >
          <Add />
        </Button>
      </div>
      <ul className=" bg-content2 rounded-lg p-2">
        {actions.map((action) => (
          <TableAction
            action={action}
            onDelete={() => {
              removeAction(action.key, actions.length === 1);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
