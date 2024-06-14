import { isComponentsDrawerOpen, isPropertiesDrawerOpen } from "@/atoms/editor";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";

export default function EditorCanvas() {
  const isComponentsOpen = useRecoilValue(isComponentsDrawerOpen);
  const isPropertiesOpen = useRecoilValue(isPropertiesDrawerOpen);

  return (
    <motion.div
      animate={{
        x: isComponentsOpen ? "15%" : isPropertiesOpen ? "-15%" : 0,
      }}
      transition={{
        ease: "easeInOut",
      }}
      className="flex justify-center items-center h-full min-w-[90rem] bg-background overflow-y-auto"
    >
      Some content here
    </motion.div>
  );
}
