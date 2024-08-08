import { Button, ButtonGroup } from "@nextui-org/react";
import InputIcon from "./InputIcon";
import { InputProperties } from "@/types/editor/form";
import { IoIosClose } from "react-icons/io";

export default function FormInput({
  input,
  onPress,
  onDelete,
}: {
  input: InputProperties;
  onPress?: () => void;
  onDelete?: () => void;
}) {
  return (
    <ButtonGroup className="flex flex-row justify-between rounded-xl border border-content3">
      <Button
        className="w-full"
        variant="light"
        onPress={onPress}
        startContent={
          <div className="flex flex-row justify-center items-center space-x-2">
            <InputIcon type={input.type} size={12} />
            <p>{input.label}</p>
          </div>
        }
      >
        <div className="w-full"></div>
      </Button>
      <Button variant="light" isIconOnly onPress={onDelete}>
        <IoIosClose size={20} className="text-foreground-600" />
      </Button>
    </ButtonGroup>
  );
}
