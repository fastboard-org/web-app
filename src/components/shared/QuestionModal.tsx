import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import { useState } from "react";

const QuestionModal = ({
  questionText = "",
  warningText = "",
  isOpen = false,
  onClose,
  onConfirm,
  size = "lg",
}: {
  questionText: string;
  warningText: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent className={"py-2 px-2"}>
        <ModalBody>
          <div className={"flex flex-col gap-4"}>
            <p className={"text-md text-center"}>{questionText}</p>
            {warningText && (
              <p className={"text-sm text-center"}>{warningText}</p>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant={"flat"} onPress={onClose} className={"w-1/2"}>
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
            isLoading={loading}
            className={"w-1/2"}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuestionModal;
