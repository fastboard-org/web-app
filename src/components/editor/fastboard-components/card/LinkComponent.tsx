import { Alignment } from "@/components/shared/AlignmentProperty";
import { Icon } from "@/components/shared/IconPicker";
import { LinkComponentProperties } from "@/types/editor/card-types";
import { Link } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function LinkComponent({
  properties,
  item,
}: {
  properties: LinkComponentProperties;
  item: any;
}) {
  const { theme } = useTheme();
  const {
    dataKey,
    alignment,
    label,
    defaultText,
    isExternal,
    externalIcon,
    showExternalIcon,
    fontSize,
    textColor,
    labelColor,
  } = properties;

  function addPrefix(url: string) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  }

  return (
    <div
      className={
        "flex flex-row items-center gap-x-1 truncate " +
        (alignment === Alignment.Center
          ? "justify-center"
          : alignment === Alignment.Right
          ? "justify-end"
          : "justify-start")
      }
      style={{
        fontSize: `${fontSize}px`,
      }}
    >
      <h1
        style={{
          color: theme === "dark" ? labelColor?.dark : labelColor?.light,
        }}
      >
        {label}
      </h1>
      <Link
        href={dataKey !== "" ? addPrefix(item[dataKey]) : defaultText}
        isExternal={isExternal}
        showAnchorIcon={showExternalIcon}
        anchorIcon={
          isExternal ? (
            <Icon icon={externalIcon} />
          ) : (
            <Icon icon={externalIcon} />
          )
        }
        style={{
          color: theme === "dark" ? textColor.dark : textColor.light,
          fontSize: `${fontSize}px`,
        }}
      >
        {dataKey !== "" ? item[dataKey] : defaultText}
      </Link>
    </div>
  );
}
