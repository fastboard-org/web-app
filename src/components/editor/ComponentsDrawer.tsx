"use client";
import { isComponentsDrawerOpen } from "@/atoms/editor";
import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

interface ComponentsDrawerProps {
  open: boolean;
  onClick: () => void;
  setGridElements: React.Dispatch<React.SetStateAction<Object[]>>;
}

export default function ComponentsDrawer({
  open,
  onClick,
  setGridElements,
}: ComponentsDrawerProps) {
  const isOpen = useRecoilValue(isComponentsDrawerOpen);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{
        ease: "easeInOut",
      }}
      className={"h-full w-[20%] bg-content3"}
    >
      <h3 className={"text-xl font-semibold p-5"}>Components</h3>
      <Divider />
    </motion.div>
  );
}
