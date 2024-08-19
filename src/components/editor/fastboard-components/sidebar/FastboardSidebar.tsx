import { currentPageState } from "@/atoms/editor";
import { Icon } from "@/components/shared/IconPicker";
import { SidebarProperties } from "@/types/editor/sidebar-types";
import { Tab, Tabs } from "@nextui-org/react";
import { Folder } from "iconsax-react";
import { Key } from "react";
import { useSetRecoilState } from "recoil";

export default function FastboardSidebar({
  properties,
}: {
  properties: SidebarProperties;
}) {
  const { menuItems, backgroundColor } = properties;
  const setCurrentPage = useSetRecoilState(currentPageState);

  function handleSelectionChange(key: Key) {
    setCurrentPage(key.toString());
  }

  return (
    <div
      className="max-w-52 h-full"
      style={{ backgroundColor: backgroundColor }}
    >
      <div key="tabs" className="flex w-full justify-center p-5">
        <Tabs
          aria-label="Sidebar"
          isVertical
          onSelectionChange={handleSelectionChange}
          color="primary"
          className="max-w-40 min-w-20"
          classNames={{
            tabList: "bg-transparent",
            tab: "justify-start",
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
