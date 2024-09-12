import { IconType } from "./icon-types";
import { LayoutType } from "./layout-types";
import { Color } from "./style-types";

export interface MenuItemProperties {
  key: string;
  label: string;
  caption: string;
  layout: LayoutType;
  icon: IconType | null;
}

export class SidebarProperties {
  menuItems: MenuItemProperties[] = [
    {
      key: "home",
      label: "home",
      caption: "home",
      layout: LayoutType.Full,
      icon: IconType.Folder,
    },
  ];
  backgroundColor: Color = {
    light: "#27272a",
    dark: "#18181b",
  };
  textColor: Color = {
    light: "#ffffff",
    dark: "#ffffff",
  };
  selectedColor: Color = {
    light: "#006FEE",
    dark: "#006FEE",
  };

  static default(): SidebarProperties {
    return new SidebarProperties();
  }
}
