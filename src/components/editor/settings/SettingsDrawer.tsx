import { isSettingsDrawerOpen } from "@/atoms/editor";
import { Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import LayoutSelection from "./LayoutSelection";
import HeaderSettings from "./HeaderSettings";
import useDashboard from "@/hooks/dashboards/useDashboard";
import SidebarSettings from "./SidebarSettings";
import { Moon, Sun1 } from "iconsax-react";

export default function SettingsDrawer() {
  const { dashboard, changeLayout, changeDefaultTheme, updateDashboard } =
    useDashboard();
  const isOpen = useRecoilValue(isSettingsDrawerOpen);
  const hasSidebar = dashboard?.metadata?.sidebar ? true : false;
  const sidebarVisible = dashboard?.metadata?.sidebar?.visible ?? false;

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ ease: "easeInOut" }}
      className={
        "h-full w-[22%] bg-background shadow-lg absolute top-0 left-0 z-10 p-5"
      }
    >
      <h3 className={"text-xl font-medium p-2 mb-2"}>Settings</h3>
      <Divider />
      <div className="flex flex-col gap-5 mt-5">
        {!(hasSidebar && sidebarVisible) && (
          <LayoutSelection
            selectedLayout={
              dashboard?.metadata?.pages["home"].layouts[0].type ?? null
            }
            onLayoutSelect={(layoutType) => {
              changeLayout("home", 0, layoutType);
            }}
          />
        )}
        <HeaderSettings />
        <SidebarSettings />
        <Input
          label="Page title"
          labelPlacement="outside"
          placeholder="Enter page title"
          value={dashboard?.metadata?.pageTitle}
          onValueChange={(value) => {
            updateDashboard((prev) => ({
              ...prev,
              metadata: {
                ...prev.metadata,
                pageTitle: value,
              },
            }));
          }}
        />
        <Select
          label="Default theme"
          labelPlacement="outside"
          placeholder="Select default theme"
          disallowEmptySelection
          selectedKeys={[dashboard?.metadata.defaultTheme ?? "light"]}
          onChange={(e) => {
            changeDefaultTheme(e.target.value as "light" | "dark");
          }}
          startContent={
            dashboard?.metadata.defaultTheme === "light" ? (
              <Sun1 size="20" variant="Bold" className="text-foreground-400" />
            ) : (
              <Moon size="20" variant="Bold" />
            )
          }
        >
          <SelectItem
            key={"light"}
            startContent={
              <Sun1 size="20" variant="Bold" className="text-foreground-400" />
            }
          >
            Light
          </SelectItem>
          <SelectItem
            key={"dark"}
            startContent={
              <Moon size="20" variant="Bold" className="text-foreground-400" />
            }
          >
            Dark
          </SelectItem>
        </Select>
      </div>
    </motion.div>
  );
}
