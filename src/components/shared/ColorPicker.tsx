import {
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
} from "@nextui-org/react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";

export default function ColorPicker({
  initialColor,
  onColorChange,
}: {
  initialColor?: string;
  onColorChange: (color: string) => void;
}) {
  const presetColors = ["#006FEE", "#7828c8"];
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button
          className="border border-default-300"
          isIconOnly
          size="sm"
          style={{
            backgroundColor: initialColor,
          }}
        />
      </PopoverTrigger>
      <PopoverContent>
        <HexAlphaColorPicker color={initialColor} onChange={onColorChange} />
        <HexColorInput color={initialColor} onChange={onColorChange} prefixed />
        <Spacer y={1} />
        <Divider />
        <Spacer y={1} />
        <div className="flex flex-row w-full gap-1 justify-start">
          {presetColors.map((presetColor) => (
            <Button
              key={presetColor}
              isIconOnly
              size="sm"
              style={{ background: presetColor }}
              onClick={() => onColorChange(presetColor)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
