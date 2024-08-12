import {
  editorCanvasRefState,
  isComponentsDrawerOpen,
  isPropertiesDrawerOpen,
  isSettingsDrawerOpen,
} from "@/atoms/editor";
import { motion } from "framer-motion";
import { useRecoilValue, useSetRecoilState } from "recoil";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { getLayout } from "./fastboard-components/utils";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { useEffect, useRef } from "react";

export default function EditorCanvas() {
  const { dashboard } = useDashboard();
  const editorCanvasRef = useRef<HTMLDivElement>(null);
  const setEditorCanvasRef = useSetRecoilState(editorCanvasRefState);
  const isComponentsOpen = useRecoilValue(isComponentsDrawerOpen);
  const isPropertiesOpen = useRecoilValue(isPropertiesDrawerOpen);
  const isSettingsOpen = useRecoilValue(isSettingsDrawerOpen);

  useEffect(() => {
    setEditorCanvasRef(editorCanvasRef.current);
  }, []);

  return (
    <motion.div
      ref={editorCanvasRef}
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
