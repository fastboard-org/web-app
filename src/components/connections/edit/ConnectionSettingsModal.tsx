import { useEffect, useState } from "react";
import { Connection } from "@/types/connections";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCredentials(connection?.credentials);
    setVariableEntries(Object.entries(connection?.variables || {}));
    setName(connection?.name);
  }, [connection]);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      // TODO: Validate fields and update connection in db
      setLoading(false);
      onSubmit({
        ...connection,
        credentials,
        variables: Object.fromEntries(variableEntries),
        name,
      });
      onClose();
    }, 1000);
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
                  <Input
                    size={"lg"}
                    className={"w-full"}
                    placeholder={"Main URL"}
                    value={credentials?.url?.split("://")[1]}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          https://
                        </span>
                      </div>
                    }
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        url: `https://${e.target.value}`,
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
