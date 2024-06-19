"use client";
import { isComponentsDrawerOpen } from "@/atoms/editor";
import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import FastboardTableDraggeable from "./fastboard-components/FastboardTableDraggeable";

export default function ComponentsDrawer() {
  const isOpen = useRecoilValue(isComponentsDrawerOpen);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ ease: "easeInOut" }}
      className={"h-full w-[22%] bg-background shadow-lg absolute top-0 left-0"}
    >
      <h3 className={"text-xl font-semibold p-5"}>Components</h3>
      <Divider />
      <FastboardTableDraggeable
        onDrop={(element) => {}}
        onDragStart={() => {}}
        onDragEnd={() => {}}
      />
    </motion.div>
  );
}
