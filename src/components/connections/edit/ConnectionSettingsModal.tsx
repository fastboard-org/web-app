import { useEffect, useState } from "react";
import { Connection, ConnectionType } from "@/types/connections";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import ConnectionVariablesTable from "@/components/connections/edit/ConnectionVariablesTable";
import { useUpdateConnection } from "@/hooks/connections/useUpdateConnection";
import { toast } from "sonner";
import UrlInput from "@/components/shared/UrlInput";

const ConnectionSettingsModal = ({
  isOpen,
  connection,
  onSubmit,
  onClose,
}: {
  isOpen: boolean;
  connection: Connection;
  onSubmit: (connection: Connection) => void;
  onClose: () => void;
}) => {
  const [credentials, setCredentials] = useState<any>(connection?.credentials);
  const [variableEntries, setVariableEntries] = useState<any>(
    Object.entries(connection?.variables || {}),
  );
  const [name, setName] = useState<string>(connection?.name || "");

  const { updateConnection, loading } = useUpdateConnection({
    onSuccess: (connection: Connection) => {
      onSubmit(connection);
      onClose();
    },
    onError: (error: any) => {
      console.error("Error updating connection", error);
      toast.error("Error updating connection, try again later.");
    },
  });

  useEffect(() => {
    setCredentials(connection?.credentials);
    setVariableEntries(Object.entries(connection?.variables || {}));
    setName(connection?.name);
  }, [connection, isOpen]);

  const handleSave = () => {
    updateConnection({
      id: connection.id,
      name,
      credentials,
      variables: Object.fromEntries(variableEntries),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalContent className={"px-2"}>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl font-medium">
              Edit Connection
            </ModalHeader>
            <ModalBody>
              <div className={"flex flex-col flex-1 justify-between"}>
                <div className={"flex flex-col gap-1.5"}>
                  <p className={"text-lg mt-2"}>Name</p>
                  <Input
                    size={"lg"}
                    className={"w-full"}
                    placeholder={"Connection Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={"flex flex-col gap-1.5"}>
                  <p className={"text-lg mt-8"}>Credentials</p>
                  <UrlInput
                    label={""}
                    placeholder={"Main URL"}
                    value={credentials?.main_url}
                    showHttps={connection.type === ConnectionType.REST}
                    onChange={(newValue) =>
                      setCredentials({
                        ...credentials,
                        main_url:
                          connection.type === ConnectionType.REST
                            ? `https://${newValue}`
                            : newValue,
                      })
                    }
                  />
                </div>
                <div className={"flex flex-col gap-1.5"}>
                  <p className={"text-lg mt-8"}>Variables</p>
                  <ConnectionVariablesTable
                    entries={variableEntries}
                    setEntries={setVariableEntries}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSave} isLoading={loading}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConnectionSettingsModal;
