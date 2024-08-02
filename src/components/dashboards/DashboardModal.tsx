import { Dashboard, Folder } from "@/types/dashboards";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useCreateDashboard } from "@/hooks/dashboards/useCreateDashboard";
import { toast } from "sonner";
import { useUpdateDashboard } from "@/hooks/dashboards/useUpdateDashboard";

const DashboardModal = ({
  isOpen,
  onClose,
  onSuccess,
  folders,
  dashboard,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (dashboard: Dashboard) => void;
  folders: Folder[];
  dashboard?: Dashboard | null;
}) => {
  const [name, setName] = useState(dashboard?.name || "");
  const [folderId, setFolderId] = useState<string | null>(
    dashboard?.folder_id || null,
  );

  const { createDashboard, loading: createLoading } = useCreateDashboard({
    onSuccess: (dashboard: Dashboard) => {
      onSuccess(dashboard);
      onClose();
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Error creating dashboard, try again later.");
    },
  });

  const { updateDashboard, loading: updateLoading } = useUpdateDashboard({
    onSuccess: (dashboard: Dashboard) => {
      onSuccess(dashboard);
      onClose();
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Error updating dashboard, try again later.");
    },
  });

  useEffect(() => {
    if (dashboard) {
      setName(dashboard.name);
      setFolderId(dashboard?.folder_id || null);
    } else {
      setName("");
      setFolderId(null);
    }
  }, [dashboard, isOpen]);

  const handleCreate = () => {
    createDashboard({ name, folderId });
  };

  const handleUpdate = () => {
    updateDashboard({
      id: dashboard?.id as string,
      name,
      folderId: folderId || null,
    });
  };

  const handleSubmit = () => {
    if (dashboard) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const emptyOptions = !folders.length
    ? [
        <SelectItem key={0} isDisabled>
          No folders available
        </SelectItem>,
      ]
    : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalContent className={"py-2 px-2"}>
        <ModalHeader className="flex flex-col gap-1 text-2xl font-medium">
          {dashboard ? "Edit Dashboard" : "Add Dashboard"}
        </ModalHeader>
        <ModalBody>
          <div className={"flex flex-col flex-1 justify-between"}>
            <div className={"flex flex-col gap-1.5"}>
              <Input
                size={"lg"}
                className={"w-full mb-3"}
                placeholder={"Dashboard Name"}
                label={"Name"}
                labelPlacement={"outside"}
                isRequired
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Select
                label={"Folder"}
                labelPlacement={"outside"}
                placeholder={"Select folder"}
                size={"lg"}
                onChange={(e) => setFolderId(e.target.value)}
                value={folderId || ""}
                selectedKeys={[folderId || ""]}
                multiple={false}
              >
                {[
                  ...folders?.map((folder) => (
                    <SelectItem key={folder.id}>{folder.name}</SelectItem>
                  )),
                  ...emptyOptions,
                ]}
              </Select>
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
            {dashboard ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DashboardModal;
