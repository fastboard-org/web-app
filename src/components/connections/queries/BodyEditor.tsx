import { Button, Textarea } from "@nextui-org/react";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

const BodyEditor = ({
  body,
  onChange,
  invalidBody,
  label,
  placeholder = "Enter request body here",
  defaultValue = "{}",
}: {
  body: string;
  onChange: (body: string) => void;
  invalidBody: boolean;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
}) => {
  const { theme } = useTheme();
  const beautify = () => {
    if (!invalidBody) {
      onChange(JSON.stringify(JSON.parse(body), null, 4));
    }
  };

  return (
    <div
      className={
        "flex flex-col gap-2 h-full w-full relative " +
        scrollbarStyles.scrollbar
      }
    >
      <Button
        size={"sm"}
        variant={"light"}
        className={"absolute z-[100] right-2 top-2"}
        color={"primary"}
        onClick={beautify}
        isDisabled={invalidBody}
      >
        Beautify
      </Button>
      <p
        className={
          "text-sm absolute right-5 bottom-2 text-foreground-500 z-[100]"
        }
      >
        {label}
      </p>
      <Editor
        className={scrollbarStyles.scrollbar}
        height="90vh"
        language="json"
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        value={body}
        onChange={(value, event) => {
          console.log("here is the current model value:", value);
          if (!value) {
            return;
          }
          onChange(value);
        }}
      />
    </div>
  );
};

export default BodyEditor;
