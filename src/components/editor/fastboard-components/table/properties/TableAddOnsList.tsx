import Option from "@/components/shared/Option";
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
  const { addRowForm, downloadData } = addOns;

  function getDisabledKeys() {
    const disabledKeys = [];
    if (addRowForm) {
      disabledKeys.push("add-row-form");
    }
    if (downloadData) {
      disabledKeys.push("download-data");
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
                    buttonColor: "#006FEE",
                  },
                });
              }}
            >
              Add Row Form
            </DropdownItem>
            <DropdownItem
              key={"download-data"}
              onPress={() => {
                onValueChange({
                  ...addOns,
                  downloadData: true,
                });
              }}
            >
              Download Button
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <ul className="flex flex-col space-y-2 w-full pt-2">
        {addRowForm && (
          <Option
            label="Add Row Form"
            onPress={() => onSelectAddOn?.("add-row-form")}
            onDelete={() => {
              deleteModalFrame(addRowForm.modalId);
              onValueChange({
                ...addOns,
                addRowForm: null,
              });
            }}
          />
        )}
        {downloadData && (
          <Option
            label="Download Button"
            onDelete={() => {
              onValueChange({
                ...addOns,
                downloadData: false,
              });
            }}
          />
        )}
      </ul>
    </div>
  );
}
