import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@nextui-org/react";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import React from "react";
import {
  collapseAllNested,
  JsonView,
  darkStyles,
  defaultStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { useTheme } from "next-themes";

function ObjectFieldView({ data }: { data: any }) {
  const { theme } = useTheme();

  if (!data) {
    return <p className="text-primary-700">null</p>;
  }

  const icon = Array.isArray(data) ? "[...]" : "{...}";

  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button isIconOnly variant="light" className="">
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <JsonView
          data={data}
          shouldExpandNode={collapseAllNested}
          style={{
            ...(theme === "dark" ? darkStyles : defaultStyles),
            container:
              "h-40 bg-transparent overflow-y-auto text-md " +
              scrollbarStyles.scrollbar,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default function ViewActionModal({
  isOpen,
  isLoading,
  data,
  onClose,
}: {
  isOpen: boolean;
  isLoading: boolean;
  data: any;
  onClose: () => void;
}) {
  function mapfield(item: any): React.ReactElement {
    if (Array.isArray(item) || typeof item === "object") {
      return <ObjectFieldView data={item} />;
    } else if (typeof item === "boolean") {
      return (
        <p className={item ? "text-primary" : "text-danger"}>
          {item ? "true" : "false"}
        </p>
      );
    } else if (typeof item === "number") {
      return <p className="text-success-700">{item}</p>;
    }

    //check if item is an url
    if (item.match(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/)) {
      return (
        <Link href={item} isExternal showAnchorIcon>
          {item}
        </Link>
      );
    }

    return item;
  }

  function renderData(data: any) {
    if (!data) return null;

    return Object.keys(data).map((key) => {
      return (
        <div key={key} className={"flex flex-row justify-between"}>
          <p className="font-medium">{key}</p>
          {mapfield(data[key])}
        </div>
      );
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"2xl"}
      scrollBehavior="inside"
    >
      <ModalContent className={"py-4 px-2"}>
        <ModalHeader className={"font-normal"}></ModalHeader>
        <ModalBody>
          {isLoading && <Spinner />}
          <div className={"flex flex-col gap-4"}>{renderData(data)}</div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
