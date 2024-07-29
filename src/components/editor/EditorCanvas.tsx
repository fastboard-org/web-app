import {
  isComponentsDrawerOpen,
  isPropertiesDrawerOpen,
  isSettingsDrawerOpen,
} from "@/atoms/editor";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { getLayout } from "./fastboard-components/utils";
import useDashboard from "@/hooks/useDashboard";
import { useParams } from "next/navigation";

export default function EditorCanvas() {
  const { id } = useParams();
  const { dashboard } = useDashboard(id as string);
  const isComponentsOpen = useRecoilValue(isComponentsDrawerOpen);
  const isPropertiesOpen = useRecoilValue(isPropertiesDrawerOpen);
  const isSettingsOpen = useRecoilValue(isSettingsDrawerOpen);

  return (
    <motion.div
      animate={{
        x:
          isComponentsOpen || isSettingsOpen
            ? "15%"
            : isPropertiesOpen
            ? "-15%"
            : 0,
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
      {dashboard?.metadata?.layouts.map((layout, index) =>
        getLayout(layout, index, "editable")
      )}
    </motion.div>
  );
}
