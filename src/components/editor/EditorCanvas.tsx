import { editorCanvasRefState, previewAccessTokenState } from "@/atoms/editor";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { getLayout } from "./fastboard-components/utils";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { useEffect, useRef } from "react";
import { useCanvasTransform } from "@/hooks/editor/useCanvasTransform";
import AuthVerifier from "@/components/editor/auth/AuthVerifier";
import { DashboardAuth } from "@/types/editor";

export default function EditorCanvas() {
  const { dashboard } = useDashboard();
  const setPreviewAccessToken = useSetRecoilState(previewAccessTokenState);
  const editorCanvasRef = useRef<HTMLDivElement>(null);
  const setEditorCanvasRef = useSetRecoilState(editorCanvasRefState);
  const { x } = useCanvasTransform();

  useEffect(() => {
    if (dashboard?.metadata?.auth?.previewAccessToken) {
      setPreviewAccessToken(dashboard.metadata.auth.previewAccessToken);
    }
  }, [dashboard]);

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
        "flex justify-center items-center h-full w-[75%] bg-background shadow-lg overflow-y-auto rounded-lg" +
        " " +
        scrollbarStyles.scrollbar
      }
    >
      <AuthVerifier
        dashboardId={dashboard?.id || ""}
        auth={dashboard?.metadata?.auth}
      >
        {dashboard?.metadata?.layouts.map((layout, index) =>
          getLayout(layout, index, "editable"),
        )}
      </AuthVerifier>
    </motion.div>
  );
}
