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
    labelColor,
  } = properties;

  return (
    <div
      className={
        "flex flex-row items-center gap-x-1 truncate " +
        (alignment === Alignment.Center
          ? "justify-center"
          : alignment === Alignment.Right
          ? "justify-end"
          : "justify-start") +
        (fontTypes.includes(FontType.Bold) ? " font-bold" : "")
      }
      style={{
        fontSize: `${fontSize}px`,
        fontStyle: fontTypes.includes(FontType.Italic) ? "italic" : "normal",
        textDecorationLine: fontTypes.includes(FontType.Underline)
          ? "underline"
          : "none",
      }}
    >
      {label !== "" && (
        <h1
          style={{
            color: theme === "dark" ? labelColor?.dark : labelColor?.light,
          }}
        >
          {label}
        </h1>
      )}

      <h1
        style={{
          color: theme === "dark" ? textColor.dark : textColor.light,
        }}
      >
        {dataKey !== "" ? item[dataKey] : defaultText}
      </h1>
    </div>
  );
}
