import { InputType } from "@/types/editor/form";
import { Calendar, Hashtag, IconProps, Text } from "iconsax-react";
import { IoCheckbox, IoList } from "react-icons/io5";

export default function InputIcon({
  type,
  size,
  variant,
  className,
}: {
  type: InputType | null;
  size: number;
  variant?: IconProps["variant"];
  className?: string;
}) {
  switch (type) {
    case InputType.TextInput:
      return <Text size={size} className={className} />;
    case InputType.NumberInput:
      return <Hashtag size={size + 2} className={className} />;
    case InputType.Select:
      return <IoList size={size + 5} className={className} />;
    case InputType.Checkbox:
      return <IoCheckbox size={size + 5} className={className} />;
    case InputType.DatePicker:
      return <Calendar size={size} className={className} />;
    default:
      return null;
  }
}
