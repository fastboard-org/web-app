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
import useNavigation from "@/hooks/useNavigation";

export default function EditorCanvas() {
  const { dashboard, getComponent } = useDashboard();
  const { currentPage } = useNavigation();
  const editorCanvasRef = useRef<HTMLDivElement>(null);
  const setEditorCanvasRef = useSetRecoilState(editorCanvasRefState);
  const isComponentsOpen = useRecoilValue(isComponentsDrawerOpen);
  const isPropertiesOpen = useRecoilValue(isPropertiesDrawerOpen);
  const isSettingsOpen = useRecoilValue(isSettingsDrawerOpen);

  const sidebar = dashboard?.metadata?.sidebar?.id
    ? getComponent(dashboard.metadata.sidebar?.id)
    : null;
  const selectedPage = dashboard?.metadata?.pages[currentPage]
    ? currentPage
    : "home";
  const sidebarVisible = dashboard?.metadata?.sidebar?.visible ?? false;
  const layoutsWidth = dashboard?.metadata?.sidebar?.visible ? "80%" : "100%";

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
        "flex justify-center items-center h-full w-[75%] bg-background shadow-lg overflow-y-auto overflow-x-hidden rounded-lg" +
        " " +
        scrollbarStyles.scrollbar
      }
    >
      {sidebar && sidebarVisible && (
        <div className="w-[20%] h-full">
          <FastboardComponent
            id={sidebar.id}
            name="sidebar"
            type={sidebar.type}
            properties={sidebar.properties}
            context={{
              type: "sidebar",
            }}
            canDelete={false}
            mode="editable"
          />
        </div>
      )}

      <div
        className="w-full h-full"
        style={{
          width: layoutsWidth,
        }}
      >
        {dashboard?.metadata?.pages[selectedPage].map((layout, index) =>
          getLayout(layout, currentPage, index, "editable")
        )}
      </div>
    </motion.div>
  );
}
