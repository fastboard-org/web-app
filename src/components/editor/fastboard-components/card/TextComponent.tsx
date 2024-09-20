import { Alignment } from "@/components/shared/AlignmentProperty";
import { FontType } from "@/components/shared/FontTypeProperty";
import { TextComponentProperties } from "@/types/editor/card-types";
import { useTheme } from "next-themes";

export default function TextComponent({
  properties,
  item,
}: {
  properties: TextComponentProperties;
  item: any;
}) {
  const { theme } = useTheme();
  const {
    dataKey,
    label,
    defaultText,
    alignment,
    fontSize,
    fontTypes,
    textColor,
  } = properties;

  return (
    <h1
      className={
        "truncate " +
        (alignment === Alignment.Center
          ? "text-center"
          : alignment === Alignment.Right
          ? "text-right"
          : "text-left") +
        (fontTypes.includes(FontType.Bold) ? " font-bold" : "")
      }
      style={{
        color: theme === "dark" ? textColor.dark : textColor.light,
        fontSize: `${fontSize}px`,
        fontStyle: fontTypes.includes(FontType.Italic) ? "italic" : "normal",
        textDecorationLine: fontTypes.includes(FontType.Underline)
          ? "underline"
          : "none",
      }}
    >
      {label}
      {dataKey !== "" ? item[dataKey] : defaultText}
    </h1>
  );
}
