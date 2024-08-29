import { Icon } from "@/components/shared/IconPicker";
import useNavigation from "@/hooks/useNavigation";
import { SidebarProperties } from "@/types/editor/sidebar-types";
import { Tab, Tabs } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Key } from "react";

export default function FastboardSidebar({
  properties,
}: {
  properties: SidebarProperties;
}) {
  const { theme } = useTheme();
  const { currentPage, changePage } = useNavigation();
  const { menuItems, backgroundColor } = properties;

  function handleSelectionChange(key: Key) {
    changePage(key.toString());
  }

  return (
    <div
      className="h-full"
      style={{
        backgroundColor:
          theme === "light" ? backgroundColor.light : backgroundColor.dark,
      }}
    >
      <div key="tabs" className="flex w-full justify-center p-5">
        <Tabs
          aria-label="Sidebar"
          isVertical
          defaultSelectedKey={currentPage}
          onSelectionChange={handleSelectionChange}
          color="primary"
          className="w-52"
          classNames={{
            tabList: "bg-transparent w-full",
            tab: "min-h-14 justify-start",
          }}
        >
          {menuItems.map((tab) => (
            <Tab
              key={tab.key}
              className="h-full"
              title={
                <div className="flex items-center space-x-2 text-white">
                  <Icon icon={tab.icon} />
                  <div className="flex flex-col items-start">
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
