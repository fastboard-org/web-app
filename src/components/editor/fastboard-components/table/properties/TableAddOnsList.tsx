import useDashboard from "@/hooks/dashboards/useDashboard";
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
import { IoIosClose } from "react-icons/io";

export default function TableAddOnsList({
  tableProperties,
  onSelectAddOn,
  onValueChange,
}: {
  tableProperties: FastboardTableProperties;
  onSelectAddOn?: (key: string) => void;
  onValueChange: (value: TableAddOnsProperties) => void;
}) {
  const { createModalFrame, deleteModalFrame } = useDashboard();
  const { addOns } = tableProperties;
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
                const modalId = createModalFrame({
                  type: ComponentType.Form,
                  properties: {
                    ...FormProperties.default(),
                    showShadow: false,
                  },
                });
                if (!modalId) {
                  return;
                }
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
                deleteModalFrame(addRowForm.modalId);
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
