import { ComponentId } from "@/types/editor";
import { FastboardHeaderProperties } from "@/types/editor/header-types";
import {
  Image,
  Navbar,
  NavbarContent,
  NavbarItem,
  Spacer,
} from "@nextui-org/react";
import { FastboardHeaderPosition } from "@/types/editor/header-types";

export default function FasboardHeader({
  id,
  properties,
}: {
  id: ComponentId;
  properties: FastboardHeaderProperties;
}) {
  const { title, photo, position, divider } = properties;

  return (
    <Navbar
      maxWidth="full"
      className="flex flex-row h-full w-full px-2"
      classNames={{
        wrapper: "flex flex-row h-full w-full",
      }}
      isBordered={divider}
    >
      <NavbarContent className="flex flex-row w-full py-1" justify={position}>
        {photo.url && (
          <NavbarItem
            className={`flex h-full ${
              position === FastboardHeaderPosition.Right
                ? "order-2 pl-5"
                : "order-1 pr-5"
            }`}
          >
            <Image
              src={photo.url}
              alt="Header"
              radius={photo.border as any}
              height="100%"
              className="object-contain"
              classNames={{ wrapper: "h-full w-auto" }}
            />
          </NavbarItem>
        )}

        <NavbarItem
          className={`${
            position === FastboardHeaderPosition.Right ? "order-1" : "order-2"
          }`}
        >
          {title.size && (
            <div style={{ fontSize: title.size }}>{title.text}</div>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
