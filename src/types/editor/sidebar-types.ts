import { LayoutType } from "./layout-types";

export interface MenuItemProperties {
  key: string;
  label: string;
  caption: string;
  layout: LayoutType;
}

export class SidebarProperties {
  menuItems: MenuItemProperties[] = [
    {
      key: "home",
      label: "home",
      caption: "home",
      layout: LayoutType.Full,
    },
  ];
  backgroundColor: string = "#1E1E1E";

  static default(): SidebarProperties {
    return new SidebarProperties();
  }
}
