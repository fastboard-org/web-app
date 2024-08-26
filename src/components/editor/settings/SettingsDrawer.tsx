import { isSettingsDrawerOpen } from "@/atoms/editor";
import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import LayoutSelection from "./LayoutSelection";
import HeaderSettings from "./HeaderSettings";
import useDashboard from "@/hooks/dashboards/useDashboard";
import SidebarSettings from "./SidebarSettings";

export default function SettingsDrawer() {
  const { dashboard, changeLayout } = useDashboard();
  const isOpen = useRecoilValue(isSettingsDrawerOpen);

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
        <LayoutSelection
          selectedLayout={dashboard?.metadata?.pages["home"][0].type ?? null}
          onLayoutSelect={(layoutType) => {
            changeLayout("home", 0, layoutType);
          }}
        />
        <HeaderSettings />
        <SidebarSettings />
      </div>
    </motion.div>
  );
}
