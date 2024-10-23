"use client";
import { isComponentsDrawerOpen } from "@/atoms/editor";
import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import { DraggableSections } from "@/types/editor";
import { getDraggableComponent } from "./fastboard-components/utils";
import scrollbarStyles from "@/styles/scrollbar.module.css";

export default function ComponentsDrawer() {
  const isOpen = useRecoilValue(isComponentsDrawerOpen);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ ease: "easeInOut" }}
      className={
        "h-full w-[22%] bg-background shadow-lg absolute top-0 left-0 z-10 p-5  overflow-y-auto " +
        scrollbarStyles.scrollbar
      }
    >
      <h3 className={"text-xl font-medium p-2 mb-2"}>Components</h3>
      <Divider />

      {Object.entries(DraggableSections).map(([section, components]) => (
        <div key={section} className="mt-5">
          <h4 className="text-md font-medium">{section}</h4>
          <div className="flex flex-wrap justify-between mt-2 gap-y-2">
            {components.map((componentType) =>
              getDraggableComponent(componentType)
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
