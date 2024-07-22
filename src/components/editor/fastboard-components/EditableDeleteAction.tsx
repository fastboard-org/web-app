import {
  Button,
  Code,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { IoIosClose } from "react-icons/io";
import { RiQuestionLine } from "react-icons/ri";
import QuerySelection from "../QuerySelection";
import EditableTitle from "@/components/shared/EditableTitle";
import { TableActionProperty } from "@/types/editor/table-types";
import { useEffect, useState } from "react";

export function EditableDeleteAction({
  action,
  onChange,
  onDelete,
}: {
  action: TableActionProperty;
  onChange: (action: TableActionProperty) => void;
  onDelete: (key: string) => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [actionData, setActionData] = useState(action);

  useEffect(() => {
    setActionData(action);
  }, [action]);

  return (
    <li
      key={action.key}
      className="flex flex-row justify-between items-center w-full my-2"
    >
      <Button
        className="w-full justify-between border "
        variant="light"
        onPress={onOpen}
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <EditableTitle
              value={actionData.label}
              onChange={(newLabel) => {
                setActionData({ ...actionData, label: newLabel });
              }}
            />
          </ModalHeader>
          <ModalBody>
            <div className={"flex flex-col h-full w-full gap-2 p-2 "}>
              <QuerySelection
                selectedQueryId={actionData.query?.id || ""}
                onQuerySelect={(query) => {
                  setActionData({
                    ...actionData,
                    query: query,
                    parameters: query.metadata.parameters?.map(
                      (p: { name: string; preview: string }) => ({
                        name: p.name,
                        value: p.preview,
                      })
                    ),
                  });
                }}
              />
              {actionData.parameters?.length > 0 && (
                <div className="flex justify-between">
                  <h1 className="text-small">Parameters</h1>
                  <Tooltip
                    content={
                      <div>
                        Use{" "}
                        <Code className={"text-xs"}>
                          {"{{row.columnName}}"}
                        </Code>{" "}
                        syntax to access row values.
                      </div>
                    }
                    className={"p-3 w-[275px] -translate-x-[35px] text-xs"}
                    placement={"bottom"}
                    offset={10}
                    closeDelay={0}
                  >
                    <div>
                      <RiQuestionLine
                        className={"text-foreground-500"}
                        size={15}
                      />
                    </div>
                  </Tooltip>
                </div>
              )}
              <div className="flex flex-col gap-2 px-2 w-full">
                {actionData.parameters?.map((parameter, index) => (
                  <Input
                    key={`parameter-${index}`}
                    label={parameter.name}
                    labelPlacement="outside-left"
                    placeholder="Action label"
                    value={parameter.value}
                    onValueChange={(newValue) => {
                      const newParameters = actionData.parameters.map((p) =>
                        p.name === parameter.name
                          ? { ...p, value: newValue }
                          : p
                      );
                      setActionData({
                        ...actionData,
                        parameters: newParameters,
                      });
                    }}
                    fullWidth
                  />
                ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onPress={() => {
                onChange(actionData);
                onOpenChange();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </li>
  );
}
