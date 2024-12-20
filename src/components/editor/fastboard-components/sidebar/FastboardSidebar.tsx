import { Icon } from "@/components/shared/IconPicker";
import useNavigation from "@/hooks/useNavigation";
import { SidebarProperties } from "@/types/editor/sidebar-types";
import { extendVariants, Tab, Tabs } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Key } from "react";

export default function FastboardSidebar({
  properties,
}: {
  properties: SidebarProperties;
}) {
  const { theme } = useTheme();
  const { currentPage, changePage } = useNavigation();
  const { menuItems, backgroundColor, textColor, selectedColor } = properties;
  const cursorClassName = `bg-[${selectedColor.light}]`;

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
          className="w-full"
          color="primary"
          classNames={{
            tabList: "bg-transparent w-full w-52",
            tab: "min-h-14 justify-start",
          }}
        >
          {menuItems.map((tab) => (
            <Tab
              key={tab.key}
              className="h-full"
              title={
                <div
                  className="flex items-center space-x-2"
                  style={{
                    color: theme === "light" ? textColor.light : textColor.dark,
                  }}
                >
                  <Icon icon={tab.icon} />
                  <div className="flex flex-col items-start">
                    <span className="truncate">{tab.label}</span>
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
