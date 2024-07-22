import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Connection, ConnectionType } from "@/types/connections";
import ConnectionTypeButton from "@/components/connections/create/ConnectionTypeButton";
import { useState } from "react";
import { connectionsService } from "@/lib/services/connections";

const CreateConnectionModal = ({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (connection: Connection) => void;
}) => {
  const [connectionType, setConnectionType] = useState<ConnectionType | null>(
    null,
  );
  const [connectionName, setConnectionName] = useState("");
  const [mainUrl, setMainUrl] = useState("https://");
  const [loading, setLoading] = useState(false);

  const refreshStates = () => {
    setConnectionType(null);
    setConnectionName("");
    setMainUrl("https://");
  };

  const handleCreateConnection = async () => {
    setLoading(true);

    try {
      const connection = await connectionsService.createConnection(
        connectionName,
        connectionType!,
        { main_url: mainUrl },
      );

      onSuccess(connection);
      onClose();
      refreshStates();
    } catch (error) {
      console.error("Error creating connection", error);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalContent className={"py-2 px-2"}>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl font-medium">
              Create Connection
            </ModalHeader>
            <ModalBody>
              <div className={"flex flex-col flex-1 justify-between"}>
                <div className={"flex flex-col gap-1.5"}>
                  <p className={"text-xl mb-3"}>Settings</p>
                  <Input
                    label={"Name"}
                    labelPlacement={"outside"}
                    isRequired
                    size={"lg"}
                    className={"w-full"}
                    placeholder={"Connection Name"}
                    value={connectionName}
                    onChange={(e) => setConnectionName(e.target.value)}
                  />
                  <label
                    className={
                      "mt-4 after:content-['*'] after:text-danger after:ml-0.5 rtl:after:ml-[unset] rtl:after:mr-0.5"
                    }
                  >
                    Type
                  </label>
                  <div className={"flex gap-5 justify-between"}>
                    {Object.values(ConnectionType).map((type) => (
                      <ConnectionTypeButton
                        key={type}
                        type={type}
                        onClick={() => setConnectionType(type)}
                        selected={connectionType === type}
                        isDisabled={type !== ConnectionType.REST}
                      />
                    ))}
                  </div>
                </div>
                <div className={"flex flex-col gap-1.5"}>
                  <p className={"text-xl mt-8 mb-3"}>Credentials</p>
                  <Input
                    size={"lg"}
                    className={"w-full"}
                    label={"Main URL"}
                    labelPlacement={"outside"}
                    isRequired
                    placeholder={"api.example.com"}
                    value={mainUrl?.split("://")[1]}
                    onChange={(e) => setMainUrl(`https://${e.target.value}`)}
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
                isDisabled={
                  !connectionType || !connectionName || !mainUrl.split("://")[1]
                }
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
