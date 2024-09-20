import { Button, ButtonGroup } from "@nextui-org/react";

export enum ImageBorder {
  None = "none",
  Round = "lg",
  Circle = "full",
}

export default function ImageBoderProperty({
  label,
  border,
  onBorderChange,
}: {
  label?: string;
  border: ImageBorder;
  onBorderChange: (border: ImageBorder) => void;
}) {
  return (
    <div>
      <h2 className="text-small pb-1">{label}</h2>
      <ButtonGroup className="w-full">
        {Object.entries(ImageBorder).map(([key, value]) => (
          <Button
            className={
              border === value
                ? "bg-foreground bg-opacity-[0.07] w-full"
                : "bg-foreground bg-opacity-5 opacity-60 w-full"
            }
            key={value}
            startContent={
              <div
                className={
                  border === value
                    ? "bg-primary overflow-hidden"
                    : "bg-foreground-400 bg-opacity-75 overflow-hidden"
                }
                style={{
                  borderRadius: value === "none" ? 0 : value === "lg" ? 8 : 100,
                }}
              >
                <div
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </div>
            }
            onPress={() => {
              onBorderChange(value);
            }}
          >
            {key}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
