import { ComponentId } from "@/types/editor";
import { FastboardHeaderProperties } from "@/types/editor/header-types";
import { Image, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { useTheme } from "next-themes";
import { Alignment } from "@/components/shared/AlignmentProperty";

export default function FastboardHeader({
  id,
  properties,
}: {
  id: ComponentId;
  properties: FastboardHeaderProperties;
}) {
  const { theme } = useTheme();
  const {
    title,
    photo,
    showThemeSwitcher,
    position,
    divider,
    backgroundColor,
    textColor,
    themeSwitcherColor,
  } = properties;
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [photo.url]);

  return (
    <Navbar
      maxWidth="full"
      className="flex flex-row h-full w-full px-2 shadow"
      classNames={{
        wrapper: "flex flex-row h-full w-full",
      }}
      isBordered={divider}
      style={{
        backgroundColor:
          theme === "light" ? backgroundColor.light : backgroundColor.dark,
      }}
    >
      <NavbarContent
        className="flex flex-row w-full py-1"
        justify={
          position.toLowerCase() as "center" | "start" | "end" | undefined
        }
      >
        {photo.url && (
          <NavbarItem
            className={`flex h-full ${
              position === Alignment.Right ? "order-2 pl-5" : "order-1 pr-5"
            }`}
          >
            <Image
              src={imageError ? "/ImageErrorImage.svg" : photo.url}
              alt="Header"
              radius={photo.border as any}
              height={photo.size}
              className={"object-contain " + (imageError ? "dark:invert" : "")}
              classNames={{
                wrapper: "flex items-center justify-center h-full w-auto",
              }}
              onError={() => setImageError(true)}
            />
          </NavbarItem>
        )}

        <NavbarItem
          className={`${position === Alignment.Right ? "order-1" : "order-2"}`}
        >
          {title.size && (
            <div
              style={{
                fontSize: title.size,
                color: theme === "light" ? textColor.light : textColor.dark,
              }}
            >
              {title.text}
            </div>
          )}
        </NavbarItem>

        {showThemeSwitcher && position === Alignment.Right && (
          <NavbarItem className="order-3">
            <ThemeSwitcher
              size="md"
              color={
                theme === "light"
                  ? themeSwitcherColor.light
                  : themeSwitcherColor.dark
              }
            />
          </NavbarItem>
        )}
      </NavbarContent>
      {showThemeSwitcher && position !== Alignment.Right && (
        <NavbarContent className="py-1" justify="end">
          <NavbarItem>
            <ThemeSwitcher
              size="md"
              color={
                theme === "light"
                  ? themeSwitcherColor.light
                  : themeSwitcherColor.dark
              }
            />
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}
