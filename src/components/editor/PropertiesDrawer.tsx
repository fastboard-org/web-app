"use client";
import { isPropertiesDrawerOpen, propertiesDrawerState } from "@/atoms/editor";
import { Divider, Spacer } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { getPropertiesComponent } from "./fastboard-components/utils";
import useDashboard from "@/hooks/dashboards/useDashboard";

export default function PropertiesDrawer() {
  const { updateComponentProperties } = useDashboard();
  const isOpen = useRecoilValue(isPropertiesDrawerOpen);
  const [propertiesDrawerComponent, setPropertiesDrawerState] = useRecoilState(
    propertiesDrawerState
  );

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ ease: "easeInOut" }}
      className={
        "h-full w-[22%] bg-background shadow-lg absolute top-0 right-0 p-5 overflow-y-auto" +
        " " +
        scrollbarStyles.scrollbar
      }
    >
      <h3 className={"text-xl font-medium p-2 mb-2"}>Properties</h3>
      <Divider />
      <Spacer y={4} />
      {isOpen &&
        getPropertiesComponent(propertiesDrawerComponent, (properties) => {
          if (!propertiesDrawerComponent.selectedComponentId) return;

          setPropertiesDrawerState((prev) => ({
            ...prev,
            properties: properties,
            context: propertiesDrawerComponent.context,
          }));
          updateComponentProperties(
            propertiesDrawerComponent.selectedComponentId,
            properties
          );
        })}
    </motion.div>
  );
}
