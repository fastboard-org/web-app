import {
  Button,
  Code,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Lock } from "iconsax-react";

const AuthModal = ({
  preview_token,
  onChange,
  isOpen,
  onClose,
}: {
  preview_token: string;
  onChange: (preview_token: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalContent className={"py-2 px-2"}>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-2 items-center">
              Preview Auth Token
              <Lock size={15} />
            </ModalHeader>
            <ModalBody>
              <p>
                Enter a preview access token to test your queries.
                <br />
                You can access the token in your query by using the{" "}
                <Code>{"{{token}}"}</Code> syntax.
              </p>
              <Input
                className={"w-full mb-10"}
                value={preview_token}
                onChange={(e) => onChange(e.target.value)}
                placeholder={"Enter a preview token"}
                isClearable
                onClear={() => onChange("")}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
