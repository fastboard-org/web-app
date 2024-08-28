import { editorCanvasRefState, previewAccessTokenState } from "@/atoms/editor";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { getLayout } from "./fastboard-components/utils";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { useEffect, useRef } from "react";
import { useCanvasTransform } from "@/hooks/editor/useCanvasTransform";
import AuthVerifier from "@/components/editor/auth/AuthVerifier";
import FastboardComponent from "./fastboard-components/FastboardComponent";
import useNavigation from "@/hooks/useNavigation";

export default function EditorCanvas() {
  const { dashboard, getComponent } = useDashboard();
  const setPreviewAccessToken = useSetRecoilState(previewAccessTokenState);
  const { currentPage } = useNavigation();
  const editorCanvasRef = useRef<HTMLDivElement>(null);
  const setEditorCanvasRef = useSetRecoilState(editorCanvasRefState);
  const { x } = useCanvasTransform();

  useEffect(() => {
    if (dashboard?.metadata?.auth?.previewAccessToken) {
      setPreviewAccessToken(dashboard.metadata.auth.previewAccessToken);
    }
  }, [dashboard]);

  const sidebarVisible = dashboard?.metadata?.sidebar?.visible ?? false;
  const isHeaderVisible = dashboard?.metadata?.header?.isVisible ?? false;
  const layoutsWidth = dashboard?.metadata?.sidebar?.visible ? "80%" : "100%";
  const layoutsHeight = isHeaderVisible ? "90%" : "100%";
  const header = getComponent(
    dashboard?.metadata?.header?.componentId as string,
  );
  const sidebar = dashboard?.metadata?.sidebar?.id
    ? getComponent(dashboard.metadata.sidebar?.id)
    : null;
  const selectedPage = dashboard?.metadata?.pages[currentPage]
    ? currentPage
    : "home";

  useEffect(() => {
    setEditorCanvasRef(editorCanvasRef.current);
  }, []);

  return (
    <motion.div
      ref={editorCanvasRef}
      animate={{
        x,
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
      <AuthVerifier
        dashboardId={dashboard?.id || ""}
        auth={dashboard?.metadata?.auth}
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
        <div
          className="flex flex-row h-full w-full"
          style={{
            height: layoutsHeight,
          }}
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
          <div className="w-full h-full" style={{ width: layoutsWidth }}>
            {dashboard?.metadata?.pages[selectedPage].map((layout, index) =>
              getLayout(layout, currentPage, index, "editable"),
            )}
          </div>
        </div>
      </AuthVerifier>
    </motion.div>
  );
}
