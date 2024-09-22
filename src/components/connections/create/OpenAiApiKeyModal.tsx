import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { BsStars } from "react-icons/bs";

const OpenAiApiKeyModal = ({
  isOpen,
  onClose,
  apiKeyValue,
  onApiKeyChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  apiKeyValue: string;
  onApiKeyChange: (value: string) => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalContent className={"py-2 px-2"}>
        <ModalHeader className={"flex items-center gap-2"}>
          AI Connection
          <BsStars />
        </ModalHeader>
        <ModalBody>
          <p>
            Add your OpenAI API key to create vector search queries in your
            Mongo connection.
          </p>
          <p>
            You can get your API key by signing up for an account at{" "}
            <a
              href={"https://platform.openai.com/signup"}
              target={"_blank"}
              rel={"noreferrer"}
              className={"text-blue-500"}
            >
              OpenAI
            </a>
          </p>
          <Input
            label={"API Key"}
            labelPlacement={"outside"}
            placeholder={"Enter your OpenAI API key"}
            value={apiKeyValue}
            onChange={(e) => onApiKeyChange(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color={"primary"} onPress={onClose}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OpenAiApiKeyModal;
