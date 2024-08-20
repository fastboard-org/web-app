import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Add } from "iconsax-react";
import {
  DefaultInputProperties,
  InputProperties,
  InputType,
} from "@/types/editor/form";
import InputIcon from "./InputIcon";
import FormInput from "./FormInput";
import Option from "@/components/shared/Option";

export default function FormInputsList({
  inputs,
  onSelectInput,
  onChange,
}: {
  inputs: InputProperties[];
  onSelectInput?: (input: InputProperties) => void;
  onChange?: (newInputs: InputProperties[]) => void;
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="flex justify-end w-full">
        <Dropdown placement={"bottom"}>
          <DropdownTrigger>
            <Button startContent={<Add size={20} />} variant={"flat"}>
              Add Input
            </Button>
          </DropdownTrigger>
          <DropdownMenu disabledKeys={[InputType.Select, InputType.DatePicker]}>
            {Object.values(InputType).map((type) => (
              <DropdownItem
                key={type}
                onPress={() => {
                  onChange?.([...inputs, DefaultInputProperties.of(type)]);
                }}
                startContent={<InputIcon type={type} size={15} />}
              >
                {type}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <ul className="flex flex-col space-y-2 w-full pt-2">
        {inputs.map((input, index) => (
          <Option
            key={index}
            label={input.label}
            startIcon={<InputIcon type={input.type} size={12} />}
            onPress={() => {
              onSelectInput?.(input);
            }}
            onDelete={() => {
              const newInputs = [...inputs];
              newInputs.splice(index, 1);
              onChange?.(newInputs);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
