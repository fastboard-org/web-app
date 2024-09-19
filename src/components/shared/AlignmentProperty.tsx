import { Button, ButtonGroup } from "@nextui-org/react";
import AlignIcon from "./icons/AlignIcon";

export enum Alignment {
  Left = "Start",
  Center = "Center",
  Right = "End",
}

export default function AlignmentProperty({
  label,
  position,
  onPositionChange,
}: {
  label: string;
  position: Alignment;
  onPositionChange: (position: Alignment) => void;
}) {
  return (
    <div>
      <h2 className="text-small pb-1">{label}</h2>
      <ButtonGroup className="w-full">
        {Object.entries(Alignment).map(([key, value]) => (
          <Button
            className={
              position === value
                ? "bg-foreground bg-opacity-[0.07] w-full"
                : "bg-foreground bg-opacity-5 opacity-60 w-full"
            }
            key={value}
            startContent={
              <AlignIcon
                align={key as string}
                selected={position === value ? true : false}
                size={24}
              />
            }
            onClick={() => {
              onPositionChange(value);
            }}
          >
            {key}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
