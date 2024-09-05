import ColorPicker from "@/components/shared/ColorPicker";
import { SidebarProperties } from "@/types/editor/sidebar-types";
import {
  Accordion,
  AccordionItem,
  BreadcrumbItem,
  Breadcrumbs,
  Spacer,
} from "@nextui-org/react";
import MenuItemsList from "./MenuItemsList";
import { useState } from "react";
import MenuItem from "./MenuItem";
import SidebarStyle from "./SidebarStyle";

export default function FastboardSidebarProperties({
  properties,
  onValueChange,
}: {
  properties: SidebarProperties;
  onValueChange: (properties: SidebarProperties) => void;
}) {
  const { menuItems, backgroundColor } = properties;
  const [menuItemSelected, setMenuItemSelected] = useState<number | null>(null);

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem
          key={"baseProperties"}
          onPress={() => setMenuItemSelected(null)}
        >
          Sidebar
        </BreadcrumbItem>
        {menuItemSelected !== null && (
          <BreadcrumbItem key={"menuItemProperties"}>Menu item</BreadcrumbItem>
        )}
      </Breadcrumbs>
      <Spacer y={4} />

      {menuItemSelected === null && (
        <Accordion
          selectionMode="multiple"
          isCompact
          fullWidth
          defaultExpandedKeys={["basic", "style"]}
          className="p-0"
        >
          <AccordionItem
            key="basic"
            title="Basic"
            className="pb-2"
            classNames={{
              title: "font-medium",
            }}
          >
            <div className="overflow-x-hidden">
              <MenuItemsList
                items={menuItems}
                onValueChange={(newMenuIems) => {
                  onValueChange({ ...properties, menuItems: newMenuIems });
                }}
                onSelectMenuItem={(index) => {
                  setMenuItemSelected(index);
                }}
              />
            </div>
          </AccordionItem>
          <AccordionItem
            key="style"
            title="Style"
            className="pb-2"
            classNames={{
              title: "font-medium",
            }}
          >
            <div className="overflow-x-hidden">
              <SidebarStyle
                properties={properties}
                onValueChange={onValueChange}
              />
            </div>
          </AccordionItem>
        </Accordion>
      )}

      {menuItemSelected !== null && (
        <MenuItem
          properties={menuItems[menuItemSelected]}
          onValueChange={(menuItemProps) => {
            const newMenuItems = [...menuItems];
            newMenuItems[menuItemSelected] = menuItemProps;
            onValueChange({ ...properties, menuItems: newMenuItems });
          }}
        />
      )}
    </div>
  );
}
