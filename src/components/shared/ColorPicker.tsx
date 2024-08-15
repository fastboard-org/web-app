import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { HexColorPicker } from "react-colorful";

export default function ColorPicker({
  initialColor,
  onColorChange,
}: {
  initialColor?: string;
  onColorChange: (color: string) => void;
}) {
  return (
    <div>
      <Popover placement="right">
        <PopoverTrigger>
          <Button
            isIconOnly
            size="sm"
            style={{
              backgroundColor: initialColor,
            }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <HexColorPicker color={initialColor} onChange={onColorChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
