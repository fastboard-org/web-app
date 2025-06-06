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
import { Connection, ConnectionType } from "@/types/connections";
import ConnectionTypeButton from "@/components/connections/create/ConnectionTypeButton";
import { useState } from "react";
import { useCreateConnection } from "@/hooks/connections/useCreateConnection";
import { toast } from "sonner";
import UrlInput from "@/components/shared/UrlInput";
import { BsStars } from "react-icons/bs";
import OpenAiApiKeyModal from "@/components/connections/create/OpenAiApiKeyModal";

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
  const [mainUrl, setMainUrl] = useState("");

  const { createConnection, loading } = useCreateConnection({
    onSuccess: (connection: Connection) => {
      onSuccess(connection);
      onClose();
      refreshStates();
    },
    onError: (error: any) => {
      console.error("Error creating connection", error);
      toast.error("Error creating connection, try again later.");
    },
  });

  const refreshStates = () => {
    setConnectionType(null);
    setConnectionName("");
    setMainUrl("");
  };

  const handleCreateConnection = () => {
    let connectionUrl = "";

    if (connectionType === ConnectionType.REST) {
      connectionUrl = mainUrl.startsWith("https://")
        ? mainUrl
        : `https://${mainUrl}`;
    } else {
      connectionUrl = mainUrl;
    }

    createConnection({
      name: connectionName,
      type: connectionType!,
      credentials: {
        main_url: connectionUrl,
        openai_api_key: openAiApiKey || undefined,
      },
    });
  };

  const urlPlaceholders = {
    [ConnectionType.REST]: "api.example.com",
    [ConnectionType.MONGO]: "mongodb://<user>:<pass>@<host>/<db>",
    [ConnectionType.SQL]: "mysql://",
  };

  const {
    isOpen: isOpenAiModalOpen,
    onOpen: onOpenAiModalOpen,
    onClose: onOpenAiModalClose,
  } = useDisclosure();

  const [openAiApiKey, setOpenAiApiKey] = useState("");

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
                        isDisabled={type === ConnectionType.SQL}
                      />
                    ))}
                  </div>
                </div>
                <div className={"flex flex-col gap-1.5"}>
                  <div className={"flex items-center mt-8 mb-3 gap-5"}>
                    <p className={"text-xl"}>Credentials</p>
                    {connectionType === ConnectionType.MONGO && (
                      <Button
                        size={"sm"}
                        color={"primary"}
                        onPress={onOpenAiModalOpen}
                      >
                        <BsStars />
                        Add AI
                      </Button>
                    )}
                  </div>
                  <UrlInput
                    value={mainUrl}
                    onChange={setMainUrl}
                    prefix={
                      connectionType === ConnectionType.REST ? "https://" : ""
                    }
                    placeholder={
                      connectionType ? urlPlaceholders[connectionType] : ""
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
                isDisabled={!connectionType || !connectionName || !mainUrl}
              >
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
      <OpenAiApiKeyModal
        isOpen={isOpenAiModalOpen}
        onClose={onOpenAiModalClose}
        apiKeyValue={openAiApiKey}
        onApiKeyChange={setOpenAiApiKey}
      />
    </Modal>
  );
};

export default CreateConnectionModal;
