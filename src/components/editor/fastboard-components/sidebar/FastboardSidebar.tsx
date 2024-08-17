import { currentPageState } from "@/atoms/editor";
import { SidebarProperties } from "@/types/editor/sidebar-types";
import { Tab, Tabs } from "@nextui-org/react";
import { Folder } from "iconsax-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, useCallback } from "react";
import { useSetRecoilState } from "recoil";

export default function FastboardSidebar({
  properties,
}: {
  properties: SidebarProperties;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { menuItems, backgroundColor } = properties;
  const setCurrentPage = useSetRecoilState(currentPageState);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleSelectionChange(key: Key) {
    setCurrentPage(key.toString());
    router.push(pathname + "?" + createQueryString("page", key.toString()));
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
          classNames={{
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
