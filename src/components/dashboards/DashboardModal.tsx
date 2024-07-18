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
import { dashboardService } from "@/lib/services/dashboards";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dashboard) {
      setName(dashboard.name);
      setFolderId(dashboard?.folder_id || null);
    } else {
      setName("");
      setFolderId(null);
    }
  }, [dashboard, isOpen]);

  const handleCreate = async () => {
    try {
      setLoading(true);
      const newDashboard = await dashboardService.createDashboard(
        name,
        folderId,
      );
      onSuccess(newDashboard);
      onClose();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const updatedDashboard = await dashboardService.updateDashboard(
        dashboard?.id as string,
        name,
        folderId,
      );
      onSuccess(updatedDashboard);
      onClose();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (dashboard) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  const emptyOptions = [
    <SelectItem key={0} isDisabled>
      No folders available
    </SelectItem>,
  ];

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
            isLoading={loading}
          >
            {dashboard ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DashboardModal;
