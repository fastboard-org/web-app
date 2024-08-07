import useDashboard from "@/hooks/dashboards/useDashboard";
import { addModalFrame, removeModalFrame } from "@/lib/editor.utils";
import { ComponentType } from "@/types/editor";
import { FormProperties } from "@/types/editor/form";
import {
  FastboardTableProperties,
  TableAddOnsProperties,
} from "@/types/editor/table-types";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Add } from "iconsax-react";
import { useParams } from "next/navigation";
import { IoIosClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

export default function TableAddOnsList({
  tableProperties,
  onSelectAddOn,
  onValueChange,
}: {
  tableProperties: FastboardTableProperties;
  onSelectAddOn?: (key: string) => void;
  onValueChange: (value: TableAddOnsProperties) => void;
}) {
  const { id } = useParams();
  const { updateDashboard } = useDashboard(id as string);
  const { sourceQuery, addOns } = tableProperties;
  const { addRowForm } = addOns;

  function getDisabledKeys() {
    const disabledKeys = [];
    if (addRowForm) {
      disabledKeys.push("add-row-form");
    }
    return disabledKeys;
  }

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
              key={"add-row-form"}
              onPress={() => {
                const modalId = uuidv4();
                updateDashboard((previous) => ({
                  ...previous,
                  metadata: addModalFrame(
                    modalId,
                    {
                      type: ComponentType.Form,
                      properties: {
                        ...new FormProperties(),
                        invalidateQueryId: sourceQuery?.id || "",
                      },
                    },
                    previous.metadata
                  ),
                }));
                onValueChange({
                  ...addOns,
                  addRowForm: {
                    buttonLabel: "Add Row",
                    modalId: modalId,
                  },
                });
              }}
            >
              Add Row Form
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <ul className="flex flex-col space-y-2 w-full pt-2">
        {addRowForm && (
          <ButtonGroup className="flex flex-row justify-between rounded-xl border border-content3">
            <Button
              className="w-full"
              variant="light"
              startContent={
                <div className="flex flex-row justify-center items-center space-x-2">
                  <p>Add row form</p>
                </div>
              }
              onPress={() => onSelectAddOn?.("add-row-form")}
            >
              <div className="w-full"></div>
            </Button>
            <Button
              variant="light"
              isIconOnly
              onPress={() => {
                updateDashboard((previous) => ({
                  ...previous,
                  metadata: removeModalFrame(
                    addRowForm.modalId,
                    previous.metadata
                  ),
                }));
                onValueChange({
                  ...addOns,
                  addRowForm: null,
                });
              }}
            >
              <IoIosClose size={20} className="text-foreground-600" />
            </Button>
          </ButtonGroup>
        )}
      </ul>
    </div>
  );
}
