"use client";
import { isPropertiesDrawerOpen } from "@/atoms/editor";
import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";

export default function PropertiesDrawer() {
  const isOpen = useRecoilValue(isPropertiesDrawerOpen);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ ease: "easeInOut" }}
      className={
        "h-full w-[22%] bg-background shadow-lg absolute top-0 right-0"
      }
    >
      <h3 className={"text-xl font-semibold p-5"}>Properties</h3>
      <Divider />
    </motion.div>
  );
}
