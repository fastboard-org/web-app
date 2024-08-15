import { SidebarProperties } from "@/types/editor/sidebar-types";
import { Tab, Tabs } from "@nextui-org/react";
import { Folder } from "iconsax-react";

export default function FastboardSidebar({
  properties,
}: {
  properties: SidebarProperties;
}) {
  const { menuItems } = properties;

  return (
    <div className="max-w-52 h-full bg-slate-700">
      <div key="tabs" className="flex w-full justify-center p-5">
        <Tabs
          aria-label="Sidebar"
          items={menuItems}
          isVertical
          color="primary"
          className=""
          classNames={{
            base: "",
            tabList: "bg-transparent",
            tab: "justify-start",
          }}
        >
          {menuItems.map((tab) => (
            <Tab
              key={tab.label}
              className="h-full"
              title={
                <div className="flex items-center space-x-2 text-white">
                  <Folder />
                  <div className="flex flex-col">
                    <span>{tab.label}</span>
                    <span className="opacity-40">{tab.caption}</span>
                  </div>
                </div>
              }
            ></Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
