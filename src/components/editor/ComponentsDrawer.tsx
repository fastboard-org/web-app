"use client";
import { isComponentsDrawerOpen } from "@/atoms/editor";
import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import { ComponentType } from "@/types/editor";
import { getDraggableComponent } from "./fastboard-components/utils";

export default function ComponentsDrawer() {
  const isOpen = useRecoilValue(isComponentsDrawerOpen);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ ease: "easeInOut" }}
      className={
        "h-full w-[22%] bg-background shadow-lg absolute top-0 left-0 z-10 p-5"
      }
    >
      <h3 className={"text-xl font-medium p-2 mb-2"}>Components</h3>
      <Divider />
      <div className="flex flex-wrap justify-between mt-5 gap-y-3">
        {Object.values(ComponentType).map((componentType) =>
          getDraggableComponent(componentType)
        )}
      </div>
    </motion.div>
  );
}
