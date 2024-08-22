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
import FastboardComponent from "./fastboard-components/FastboardComponent";

export default function EditorCanvas() {
  const { dashboard, getComponent } = useDashboard();
  const editorCanvasRef = useRef<HTMLDivElement>(null);
  const setEditorCanvasRef = useSetRecoilState(editorCanvasRefState);
  const isComponentsOpen = useRecoilValue(isComponentsDrawerOpen);
  const isPropertiesOpen = useRecoilValue(isPropertiesDrawerOpen);
  const isSettingsOpen = useRecoilValue(isSettingsDrawerOpen);

  const header = getComponent(
    dashboard?.metadata?.header?.componentId as string
  );

  const isHeaderVisible = dashboard?.metadata?.header?.isVisible;

  const layoutsHeight = isHeaderVisible ? "90%" : "100%";

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
        "flex flex-col justify-center items-center h-full w-[75%] bg-background shadow-lg overflow-y-auto rounded-lg" +
        " " +
        scrollbarStyles.scrollbar
      }
    >
      {isHeaderVisible && header && (
        <div className="h-[10%] w-full">
          <FastboardComponent
            id={header.id}
            name="Header"
            type={header.type}
            properties={header.properties}
            context={{ type: "header" }}
            mode="editable"
            canDelete={false}
          />
        </div>
      )}
      {/* map through the layouts and render them */}
      <div className="w-full" style={{ height: layoutsHeight }}>
        {dashboard?.metadata?.layouts.map((layout, index) =>
          getLayout(layout, index, "editable")
        )}
      </div>
    </motion.div>
  );
}
