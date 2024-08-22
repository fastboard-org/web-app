import { isSettingsDrawerOpen } from "@/atoms/editor";
import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import LayoutSelection from "./LayoutSelection";
import HeaderSettings from "./HeaderCheckbox";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { changeLayout } from "@/lib/editor.utils";

export default function SettingsDrawer() {
  const { dashboard, updateDashboard } = useDashboard();
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
          selectedLayout={dashboard?.metadata?.layouts[0].type ?? null}
          onLayoutSelect={(layoutType) => {
            updateDashboard((previous) => ({
              ...previous,
              metadata: changeLayout(0, layoutType, previous.metadata),
            }));
          }}
        />

        <HeaderSettings
          isSelected={Boolean(dashboard?.metadata?.header?.isVisible)}
          shouldCreateHeader={!dashboard?.metadata?.header?.componentId}
        />
      </div>
    </motion.div>
  );
}
