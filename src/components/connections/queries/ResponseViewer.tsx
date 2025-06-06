import {
  collapseAllNested,
  darkStyles,
  defaultStyles,
  JsonView,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { useTheme } from "next-themes";
import { Editor } from "@monaco-editor/react";

const ResponseViewer = ({
  status = "",
  data,
}: {
  status?: string;
  data: any;
}) => {
  const { theme } = useTheme();
  return data ? (
    <>
      {status && (
        <p className={"text-sm absolute right-5 bottom-5 text-foreground-500"}>
          Status: {status}
        </p>
      )}
      <Editor
        language="json"
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{ readOnly: true, minimap: { enabled: false } }}
        value={JSON.stringify(data, null, 4)}
      />
    </>
  ) : (
    <div className={"flex justify-center items-center h-full"}>
      <p className={"text-foreground-500 mb-10 text-center text-sm"}>
        You haven't sent a request yet. Click the send button to see the
        response.
      </p>
    </div>
  );
};

export default ResponseViewer;
