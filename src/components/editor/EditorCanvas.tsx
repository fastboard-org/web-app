import {
  dashboardMetadataState,
  isComponentsDrawerOpen,
  isPropertiesDrawerOpen,
} from "@/atoms/editor";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { Layout, LayoutType } from "@/types/editor";
import FullLayout from "./layouts/FullLayout";

export default function EditorCanvas() {
  const isComponentsOpen = useRecoilValue(isComponentsDrawerOpen);
  const isPropertiesOpen = useRecoilValue(isPropertiesDrawerOpen);
  const dashboardMetadata = useRecoilValue(dashboardMetadataState);

  function getLayoutComponent(layout: Layout) {
    switch (layout.type) {
      case LayoutType.Full:
        return (
          <FullLayout
            index={0}
            component1={dashboardMetadata.layouts[0].component1}
          />
        );
    }
  }

  return (
    <motion.div
      animate={{
        x: isComponentsOpen ? "15%" : isPropertiesOpen ? "-15%" : 0,
      }}
      transition={{
        ease: "easeInOut",
      }}
      className="flex justify-center items-center h-full min-w-[75%] bg-background shadow-lg overflow-y-auto rounded-lg"
    >
      {getLayoutComponent(dashboardMetadata.layouts[0])}
    </motion.div>
  );
}
