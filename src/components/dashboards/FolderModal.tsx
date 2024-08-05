import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Folder } from "@/types/dashboards";
import { useEffect, useState } from "react";
import { useCreateFolder } from "@/hooks/dashboards/useCreateFolder";
import { toast } from "sonner";
import { useUpdateFolder } from "@/hooks/dashboards/useUpdateFolder";

const FolderModal = ({
  isOpen,
  onClose,
  onSuccess,
  folder,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (folder: Folder) => void;
  folder?: Folder | null;
}) => {
  const [name, setName] = useState(folder?.name || "");

  const { createFolder, loading: createLoading } = useCreateFolder({
    onSuccess: (folder: Folder) => {
      onSuccess(folder);
      onClose();
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Error creating folder, try again later.");
    },
  });

  const { updateFolder, loading: updateLoading } = useUpdateFolder({
    onSuccess: (folder: Folder) => {
      onSuccess(folder);
      onClose();
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Error updating folder, try again later.");
    },
  });

  useEffect(() => {
    if (folder) {
      setName(folder?.name);
    } else {
      setName("");
    }
  }, [folder, isOpen]);

  const handleUpdate = () => {
    updateFolder({
      id: folder?.id as string,
      name,
    });
  };

  const handleCreate = () => {
    createFolder({
      name,
    });
  };

  const handleSubmit = () => {
    if (folder) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalContent className={"py-2 px-2"}>
        <ModalHeader className="flex flex-col gap-1 text-2xl font-medium">
          {folder ? "Edit Folder" : "Add Folder"}
        </ModalHeader>
        <ModalBody>
          <div className={"flex flex-col flex-1 justify-between"}>
            <div className={"flex flex-col gap-1.5"}>
              <Input
                size={"lg"}
                className={"w-full mb-3"}
                placeholder={"Folder Name"}
                label={"Name"}
                labelPlacement={"outside"}
                isRequired
                onChange={(e) => setName(e.target.value)}
                value={name}
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
            onPress={handleSubmit}
            isDisabled={!name}
            isLoading={createLoading || updateLoading}
          >
            {folder ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FolderModal;
