import { editorCanvasRefState } from "@/atoms/editor";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { useEffect, useRef } from "react";
import { useCanvasTransform } from "@/hooks/editor/useCanvasTransform";
import Viewport from "../shared/Viewport";

export default function EditorCanvas() {
  const editorCanvasRef = useRef<HTMLDivElement>(null);
  const setEditorCanvasRef = useSetRecoilState(editorCanvasRefState);
  const { x } = useCanvasTransform();

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
      <Viewport mode="editor" />
    </motion.div>
  );
}
