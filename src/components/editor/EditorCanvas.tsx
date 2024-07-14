import {
  dashboardMetadataState,
  isComponentsDrawerOpen,
  isPropertiesDrawerOpen,
} from "@/atoms/editor";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { getLayout } from "./fastboard-components/utils";

export default function EditorCanvas() {
  const isComponentsOpen = useRecoilValue(isComponentsDrawerOpen);
  const isPropertiesOpen = useRecoilValue(isPropertiesDrawerOpen);
  const dashboardMetadata = useRecoilValue(dashboardMetadataState);

  return (
    <motion.div
      animate={{
        x: isComponentsOpen ? "15%" : isPropertiesOpen ? "-15%" : 0,
      }}
      transition={{
        ease: "easeInOut",
      }}
      className={
        "flex justify-center items-center h-full w-[75%] bg-background shadow-lg overflow-y-auto rounded-lg" +
        " " +
        scrollbarStyles.scrollbar
      }
    >
      {dashboardMetadata.layouts.map((layout, index) =>
        getLayout(layout, index, "editable")
      )}
    </motion.div>
  );
}
