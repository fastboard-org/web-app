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
  useDisclosure,
} from "@nextui-org/react";
import ConnectionVariablesTable from "@/components/connections/edit/ConnectionVariablesTable";
import { useUpdateConnection } from "@/hooks/connections/useUpdateConnection";
import { toast } from "sonner";
import UrlInput from "@/components/shared/UrlInput";
import { BsStars } from "react-icons/bs";
import OpenAiApiKeyModal from "@/components/connections/create/OpenAiApiKeyModal";

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
  const [newOpenAiApiKey, setNewOpenAiApiKey] = useState<string>(
    connection?.credentials?.openai_api_key_preview || "",
  );

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
    setNewOpenAiApiKey(connection?.credentials?.openai_api_key_preview);
  }, [connection, isOpen]);

  const openAiApiKeyModified =
    newOpenAiApiKey !== connection?.credentials?.openai_api_key_preview;

  const handleSave = () => {
    updateConnection({
      id: connection.id,
      name,
      credentials: {
        ...credentials,
        openai_api_key: openAiApiKeyModified ? newOpenAiApiKey : undefined,
      },
      variables: Object.fromEntries(variableEntries),
    });
  };

  const {
    isOpen: isOpenAiModalOpen,
    onOpen: onOpenAiModalOpen,
    onClose: onOpenAiModalClose,
  } = useDisclosure();

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
                  <div className={"flex items-center mt-8 mb-3 gap-5"}>
                    <p className={"text-lg"}>Credentials</p>
                    {connection.type === ConnectionType.MONGO && (
                      <Button
                        size={"sm"}
                        color={"primary"}
                        onClick={onOpenAiModalOpen}
                      >
                        <BsStars />
                        AI settings
                      </Button>
                    )}
                  </div>
                  <UrlInput
                    label={""}
                    placeholder={"Main URL"}
                    value={credentials?.main_url}
                    prefix={
                      connection.type === ConnectionType.REST ? "https://" : ""
                    }
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
      <OpenAiApiKeyModal
        isOpen={isOpenAiModalOpen}
        onClose={onOpenAiModalClose}
        apiKeyValue={newOpenAiApiKey}
        onApiKeyChange={setNewOpenAiApiKey}
      />
    </Modal>
  );
};

export default ConnectionSettingsModal;
