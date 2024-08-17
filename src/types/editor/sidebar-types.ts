export interface MenuItemProperties {
  key: string;
  label: string;
  caption: string;
}

export class SidebarProperties {
  menuItems: MenuItemProperties[] = [
    {
      key: "home",
      label: "home",
      caption: "home",
    },
  ];
  backgroundColor: string = "#1E1E1E";

  static default(): SidebarProperties {
    return new SidebarProperties();
  }
}
