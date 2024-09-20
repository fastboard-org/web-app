import { Button, ButtonGroup } from "@nextui-org/react";

export enum FontType {
  Bold = "Bold",
  Italic = "Italic",
  Underline = "Underline",
}

export default function FontTypeProperty({
  fontTypes,
  onFontTypesChange,
}: {
  fontTypes: FontType[];
  onFontTypesChange: (fontTypes: FontType[]) => void;
}) {
  return (
    <ButtonGroup>
      <Button
        className={
          fontTypes.includes(FontType.Bold)
            ? "text-primary bg-foreground bg-opacity-[0.07] w-full font-bold"
            : "bg-foreground bg-opacity-5 opacity-60 w-full font-bold"
        }
        onPress={() => {
          onFontTypesChange(
            fontTypes.includes(FontType.Bold)
              ? fontTypes.filter((type) => type !== FontType.Bold)
              : [...fontTypes, FontType.Bold]
          );
        }}
      >
        B
      </Button>
      <Button
        className={
          fontTypes.includes(FontType.Italic)
            ? "text-primary bg-foreground bg-opacity-[0.07] w-full italic"
            : "bg-foreground bg-opacity-5 opacity-60 w-full italic"
        }
        onPress={() => {
          onFontTypesChange(
            fontTypes.includes(FontType.Italic)
              ? fontTypes.filter((type) => type !== FontType.Italic)
              : [...fontTypes, FontType.Italic]
          );
        }}
      >
        I
      </Button>
      <Button
        className={
          fontTypes.includes(FontType.Underline)
            ? "text-primary bg-foreground bg-opacity-[0.07] w-full underline"
            : "bg-foreground bg-opacity-5 opacity-60 w-full underline"
        }
        onPress={() => {
          onFontTypesChange(
            fontTypes.includes(FontType.Underline)
              ? fontTypes.filter((type) => type !== FontType.Underline)
              : [...fontTypes, FontType.Underline]
          );
        }}
      >
        U
      </Button>
    </ButtonGroup>
  );
}
