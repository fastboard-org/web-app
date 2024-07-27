import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import scrollbarStyles from "@/styles/scrollbar.module.css";

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
  function mapfield(item: any): any {
    if (Array.isArray(item)) {
      return "array";
    } else if (typeof item === "object") {
      return "object";
    } else if (typeof item === "boolean") {
      return item ? "true" : "false";
    }
    return item;
  }

  function renderData(data: any) {
    if (!data) return null;

    return Object.keys(data).map((key) => {
      return (
        <div key={key} className={"flex flex-row justify-between"}>
          <p className="font-medium">{key}</p>
          <p>{mapfield(data[key])}</p>
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
