import { IconType } from "@/types/editor/icon-types";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import {
  Add,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Edit,
  Folder,
  Trash,
} from "iconsax-react";
import { IoIosClose } from "react-icons/io";

export function Icon({
  icon,
  size = 24,
  className,
}: {
  icon: IconType | null;
  size?: number;
  className?: string;
}) {
  if (!icon) return null;
  const options = {
    [IconType.Add]: <Add size={size} />,
    [IconType.Edit]: <Edit size={size} />,
    [IconType.Delete]: <Trash size={size} />,
    [IconType.ArrowUp]: <ArrowUp size={size} />,
    [IconType.ArrowDown]: <ArrowDown size={size} />,
    [IconType.ArrowLeft]: <ArrowLeft size={size} />,
    [IconType.ArrowRight]: <ArrowRight size={size} />,
    [IconType.Close]: <IoIosClose size={size + 5} />,
    [IconType.Folder]: <Folder size={size} />,
  };

  return <div className={className}>{options[icon]}</div>;
}

export default function IconPicker({
  icon,
  onIconSelect,
}: {
  icon: IconType | null;
  onIconSelect: (icon: IconType) => void;
}) {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button isIconOnly size="sm" variant="flat">
          <Icon icon={icon} className="text-content4-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-5 gap-2 py-2 px-1">
          {Object.values(IconType).map((iconType) => (
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              onPress={() => onIconSelect(iconType)}
            >
              <Icon
                key={iconType}
                icon={iconType}
                className="text-content4-foreground"
              />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
