import { Alignment } from "@/components/shared/AlignmentProperty";
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
  const { dataKey, label, defaultText, alignment, textColor } = properties;

  return (
    <h1
      className={
        "truncate " +
        (alignment === Alignment.Center
          ? "text-center"
          : alignment === Alignment.Right
          ? "text-right"
          : "text-left")
      }
      style={{
        color: theme === "dark" ? textColor.dark : textColor.light,
      }}
    >
      {label}
      {dataKey !== "" ? item[dataKey] : defaultText}
    </h1>
  );
}
