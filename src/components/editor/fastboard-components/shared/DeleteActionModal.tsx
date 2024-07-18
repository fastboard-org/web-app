import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export default function DeleteActionModal({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Action
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this item?</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  if (onCancel) {
                    onCancel();
                  }
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  if (onConfirm) {
                    onConfirm();
                  }
                  onClose();
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
