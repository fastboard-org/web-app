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

export default function FastboardSidebarProperties({
  properties,
  onValueChange,
}: {
  properties: SidebarProperties;
  onValueChange: (properties: SidebarProperties) => void;
}) {
  const { menuItems, backgroundColor } = properties;

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem key={"baseProperties"} onPress={() => {}}>
          Sidebar
        </BreadcrumbItem>
      </Breadcrumbs>
      <Spacer y={4} />

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
            <div className="flex flex-row justify-between items-center">
              <span className="text-small">Background color</span>
              <ColorPicker
                initialColor={backgroundColor}
                onColorChange={(color) => {
                  onValueChange({ ...properties, backgroundColor: color });
                }}
              />
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
