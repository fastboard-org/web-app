import { Button, Textarea } from "@nextui-org/react";
import scrollbarStyles from "@/styles/scrollbar.module.css";

const BodyEditor = ({
  body,
  onChange,
  invalidBody,
}: {
  body: string;
  onChange: (body: string) => void;
  invalidBody: boolean;
}) => {
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
      <Textarea
        value={body}
        onChange={(e) => {
          const newBody = e.target.value;
          if (!body) {
            onChange("{}");
          } else {
            onChange(newBody);
          }
        }}
        className={"h-full w-full"}
        size={"lg"}
        placeholder={"Enter request body here"}
        classNames={{
          inputWrapper: "!h-full",
          input: "h-full " + scrollbarStyles.scrollbar,
        }}
        disableAutosize
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            e.currentTarget.value =
              e.currentTarget.value.substring(0, start) +
              "    " +
              e.currentTarget.value.substring(end);
            e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
              start + 4;
          }
        }}
      />
      {invalidBody && <p className={"text-danger text-sm"}>Invalid JSON</p>}
    </div>
  );
};

export default BodyEditor;
