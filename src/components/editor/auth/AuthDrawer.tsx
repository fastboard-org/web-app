import { isAuthDrawerOpen } from "@/atoms/editor";
import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import useDashboard from "@/hooks/dashboards/useDashboard";

const AuthDrawer = () => {
  const { dashboard, updateDashboard } = useDashboard();
  const isOpen = useRecoilValue(isAuthDrawerOpen);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ ease: "easeInOut" }}
      className={
        "h-full w-[22%] bg-background shadow-lg absolute top-0 left-0 z-10 p-5"
      }
    >
      <h3 className={"text-xl font-medium p-2 mb-2"}>Authentication</h3>
      <Divider />
      <div className="flex flex-col gap-5 mt-5"></div>
    </motion.div>
  );
};

export default AuthDrawer;
