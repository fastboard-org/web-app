import { IconType } from "./icon-types";
import { LayoutType } from "./layout-types";

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
  backgroundColor: string = "#1E1E1E";

  static default(): SidebarProperties {
    return new SidebarProperties();
  }
}
