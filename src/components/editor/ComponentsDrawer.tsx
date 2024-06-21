"use client";
import { isComponentsDrawerOpen } from "@/atoms/editor";
import { Divider, Spacer } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import FastboardTableDraggeable from "./fastboard-components/FastboardTableDraggeable";
import FastboardTableDraggeable2 from "./fastboard-components/FastboardTableDraggeable copy";

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
      <h3 className={"text-xl font-semibold p-5"}>Components</h3>
      <Divider />
      <div className="flex flex-col">
        <FastboardTableDraggeable />
        <FastboardTableDraggeable2 />
      </div>
    </motion.div>
  );
}
