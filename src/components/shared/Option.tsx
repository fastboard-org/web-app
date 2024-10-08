import { Button, ButtonGroup } from "@nextui-org/react";
import { IoIosClose } from "react-icons/io";
import EditableTitle from "./EditableTitle";

export default function Option({
  label,
  canDelete = true,
  canEditLabel = false,
  startIcon,
  onPress,
  onDelete,
  onLabelChange,
}: {
  label: string;
  canDelete?: boolean;
  canEditLabel?: boolean;
  startIcon?: React.ReactNode;
  onPress?: () => void;
  onDelete?: () => void;
  onLabelChange?: (value: string) => void;
}) {
  return (
    <ButtonGroup className="w-full flex flex-row justify-between rounded-xl border border-content3">
      {!onPress && (
        <div className="flex flex-row justify-center items-center space-x-2 px-4">
          {startIcon}
          {!canEditLabel && <span className="text-sm">{label}</span>}
          {canEditLabel && (
            <EditableTitle
              titleClassName={
                "max-w-[150px] flex items-center text-sm hover:text-foreground-400 truncate"
              }
              inputClassName={
                "border-none max-w-[150px] text-sm bg-transparent outline-none text-foreground-300 placeholder-foreground-300 border"
              }
              value={label}
              onChange={(value) => {
                if (onLabelChange) {
                  onLabelChange(value);
                }
              }}
            />
          )}
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
      {canDelete && (
        <Button variant="light" isIconOnly onPress={onDelete}>
          <IoIosClose size={20} className="text-foreground-600" />
        </Button>
      )}
    </ButtonGroup>
  );
}
