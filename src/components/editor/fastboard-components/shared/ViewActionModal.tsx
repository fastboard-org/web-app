import {
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import React from "react";

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
    if (Array.isArray(item)) {
      return <p>[...]</p>;
    } else if (typeof item === "object") {
      return <p>{"{...}"}</p>;
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
