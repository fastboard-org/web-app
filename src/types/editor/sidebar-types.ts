export interface MenuItemProperties {
  label: string;
  caption: string;
}

export class SidebarProperties {
  menuItems: MenuItemProperties[] = [
    {
      label: "Dashboard",
      caption: "Dashboard",
    },
    {
      label: "Tables",
      caption: "Tables",
    },
    {
      label: "Group Chart",
      caption: "Group Chart",
    },
    {
      label: "Cards",
      caption: "Cards",
    },
  ];

  static default(): SidebarProperties {
    return new SidebarProperties();
  }
}
