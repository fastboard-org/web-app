import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

const QuestionModal = ({
  titleText = "",
  questionText = "",
  warningText = "",
  isOpen = false,
  onClose,
  onConfirm,
  size = "md",
  isLoading = false,
}: {
  titleText?: string;
  questionText: string;
  warningText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  isLoading?: boolean;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent className={"py-4 px-2"}>
        <ModalHeader className={"font-normal"}>{titleText}</ModalHeader>
        <ModalBody>
          <div className={"flex flex-col gap-4"}>
            <p className={"text-md"}>{questionText}</p>
            {warningText && <p className={"text-sm"}>{warningText}</p>}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant={"light"} color={"danger"} onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={async () => {
              setLoading(true);
              await onConfirm();
              setLoading(false);
              onClose();
            }}
            isLoading={loading || isLoading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuestionModal;
