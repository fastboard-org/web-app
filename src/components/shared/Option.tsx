import { Button, ButtonGroup } from "@nextui-org/react";
import { IoIosClose } from "react-icons/io";

export default function Option({
  label,
  startIcon,
  onPress,
  onDelete,
}: {
  label: string;
  startIcon?: React.ReactNode;
  onPress?: () => void;
  onDelete?: () => void;
}) {
  return (
    <ButtonGroup className="w-full flex flex-row justify-between rounded-xl border border-content3">
      {!onPress && (
        <div className="flex flex-row justify-center items-center space-x-2 px-4">
          {startIcon}
          <span className="text-sm">{label}</span>
        </div>
      )}
      {onPress && (
        <Button
          className="w-full"
          variant="light"
          startContent={
            <div className="flex flex-row justify-center items-center space-x-2">
              {startIcon}
              <span>{label}</span>
            </div>
          }
          onPress={onPress}
        >
          <div className="w-full"></div>
        </Button>
      )}
      <Button variant="light" isIconOnly onPress={onDelete}>
        <IoIosClose size={20} className="text-foreground-600" />
      </Button>
    </ButtonGroup>
  );
}
