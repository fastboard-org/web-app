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
  Airplane,
  Archive,
  ArchiveBook,
  AudioSquare,
  Award,
  Bag,
  Bag2,
  Bank,
  Barcode,
  Book,
  Box1,
  Briefcase,
  Building,
  Buildings2,
  Building3,
  Building4,
  Calendar,
  Calendar2,
  Car,
  Card,
  Cards,
  Category,
  Chart,
  Cup,
  Data,
  Devices,
  Document,
  Driver,
  Edit,
  Element,
  Eye,
  Flag,
  Flash,
  Game,
  GasStation,
  Gift,
  Global,
  Heart,
  Hierarchy,
  Home,
  Folder,
  Trash,
  User,
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
    [IconType.ArrowDown]: <ArrowDown size={size} />,
    [IconType.ArrowLeft]: <ArrowLeft size={size} />,
    [IconType.ArrowRight]: <ArrowRight size={size} />,
    [IconType.ArrowUp]: <ArrowUp size={size} />,
    [IconType.Airplane]: <Airplane size={size} />,
    [IconType.Archive]: <Archive size={size} />,
    [IconType.ArchiveBook]: <ArchiveBook size={size} />,
    [IconType.AudioSquare]: <AudioSquare size={size} />,
    [IconType.Award]: <Award size={size} />,
    [IconType.Bag]: <Bag size={size} />,
    [IconType.Bag2]: <Bag2 size={size} />,
    [IconType.Bank]: <Bank size={size} />,
    [IconType.Barcode]: <Barcode size={size} />,
    [IconType.Book]: <Book size={size} />,
    [IconType.Box1]: <Box1 size={size} />,
    [IconType.Briefcase]: <Briefcase size={size} />,
    [IconType.Building]: <Building size={size} />,
    [IconType.Buildings2]: <Buildings2 size={size} />,
    [IconType.Building3]: <Building3 size={size} />,
    [IconType.Building4]: <Building4 size={size} />,
    [IconType.Calendar]: <Calendar size={size} />,
    [IconType.Calendar2]: <Calendar2 size={size} />,
    [IconType.Car]: <Car size={size} />,
    [IconType.Card]: <Card size={size} />,
    [IconType.Cards]: <Cards size={size} />,
    [IconType.Category]: <Category size={size} />,
    [IconType.Chart]: <Chart size={size} />,
    [IconType.Cup]: <Cup size={size} />,
    [IconType.Data]: <Data size={size} />,
    [IconType.Devices]: <Devices size={size} />,
    [IconType.Document]: <Document size={size} />,
    [IconType.Driver]: <Driver size={size} />,
    [IconType.Edit]: <Edit size={size} />,
    [IconType.Element]: <Element size={size} />,
    [IconType.Eye]: <Eye size={size} />,
    [IconType.Flag]: <Flag size={size} />,
    [IconType.Flash]: <Flash size={size} />,
    [IconType.Game]: <Game size={size} />,
    [IconType.GasStation]: <GasStation size={size} />,
    [IconType.Gift]: <Gift size={size} />,
    [IconType.Global]: <Global size={size} />,
    [IconType.Heart]: <Heart size={size} />,
    [IconType.Hierarchy]: <Hierarchy size={size} />,
    [IconType.Home]: <Home size={size} />,
    [IconType.Folder]: <Folder size={size} />,
    [IconType.Trash]: <Trash size={size} />,
    [IconType.User]: <User size={size} />,
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
