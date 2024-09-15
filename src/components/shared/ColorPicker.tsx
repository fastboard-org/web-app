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
  label,
}: {
  initialColor?: string;
  onColorChange: (color: string) => void;
  label?: string;
}) {
  const presetColors = [
    "#f4f4f5",
    "#27272a",
    "#006FEE",
    "#7828c8",
    "#17c964",
    "#f5a524",
    "#f31260",
  ];
  return (
    <div className="flex flex-row justify-between items-center">
      <span className="text-sm">{label}</span>
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
          <HexColorInput
            color={initialColor}
            onChange={onColorChange}
            prefixed
          />
          <Spacer y={1} />
          <Divider />
          <Spacer y={1} />
          <div className="grid grid-cols-5 w-full gap-1 justify-start">
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
    </div>
  );
}
