import { Button, ButtonGroup } from "@nextui-org/react";
import { IoIosClose } from "react-icons/io";

export default function Option({
  label,
  canDelete = true,
  startIcon,
  onPress,
  onDelete,
}: {
  label: string;
  canDelete?: boolean;
  startIcon?: React.ReactNode;
  onPress?: () => void;
  onDelete?: () => void;
}) {
  return (
    <ButtonGroup className="w-full flex flex-row justify-between rounded-xl border border-content3">
      <Button
        className="w-full"
        variant="light"
        startContent={
          <div className="flex flex-row justify-center items-center space-x-2">
            {startIcon}
            <p>{label}</p>
          </div>
        }
        onPress={onPress}
      >
        <div className="w-full"></div>
      </Button>
      {canDelete && (
        <Button variant="light" isIconOnly onPress={onDelete}>
          <IoIosClose size={20} className="text-foreground-600" />
        </Button>
      )}
    </ButtonGroup>
  );
}
