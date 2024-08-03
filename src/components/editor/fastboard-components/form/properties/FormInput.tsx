import { Button } from "@nextui-org/react";
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
    <Button
      className="flex flex-row justify-between border border-content3"
      variant="light"
      onPress={onPress}
      startContent={
        <div className="flex flex-row justify-center items-center space-x-2">
          <InputIcon type={input.type} size={12} />
          <p>{input.label}</p>
        </div>
      }
      endContent={
        <div
          className="flex w-10 h-full items-center justify-center hover:bg-content3 rounded-full"
          onClick={onDelete}
        >
          <IoIosClose size={20} className="text-foreground-600" />
        </div>
      }
    ></Button>
  );
}
