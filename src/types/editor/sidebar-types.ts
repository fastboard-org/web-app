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
  backgroundColor: Color = new Color("#27272a", "#18181b");
  textColor: Color = new Color("#ffffff", "#ffffff");
  selectedColor: Color = Color.primary();

  static default(): SidebarProperties {
    return new SidebarProperties();
  }
}
