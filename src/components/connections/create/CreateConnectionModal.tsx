import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ConnectionType } from "@/types/connections";
import ConnectionTypeButton from "@/components/connections/create/ConnectionTypeButton";
import { useState } from "react";

const CreateConnectionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [connectionType, setConnectionType] = useState<ConnectionType | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const handleCreateConnection = () => {
    setLoading(true);
    // TODO: Validate fields and implement connection creation
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalContent className={"p-4"}>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl font-medium">
              Create Connection
            </ModalHeader>
            <ModalBody>
              <div className={"flex flex-col flex-1 justify-between"}>
                <div className={"flex flex-col gap-1.5"}>
                  <p className={"text-xl"}>Settings</p>
                  <p className={"mt-2"}>Name</p>
                  <Input
                    size={"lg"}
                    className={"w-full"}
                    placeholder={"Connection Name"}
                  />
                  <p className={"mt-4"}>Type</p>
                  <div className={"flex gap-5 justify-between"}>
                    {Object.values(ConnectionType).map((type) => (
                      <ConnectionTypeButton
                        key={type}
                        type={type}
                        onClick={() => setConnectionType(type)}
                        selected={connectionType === type}
                      />
                    ))}
                  </div>
                </div>
                <div className={"flex flex-col gap-1.5"}>
                  <p className={"text-xl mt-8"}>Credentials</p>
                  <p className={"mt-2"}>Main URL</p>
                  <Input
                    size={"lg"}
                    className={"w-full"}
                    placeholder={"api.example.com"}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          https://
                        </span>
                      </div>
                    }
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleCreateConnection}
                isLoading={loading}
              >
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateConnectionModal;
