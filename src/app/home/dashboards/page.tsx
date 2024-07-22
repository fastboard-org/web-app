"use client";
import { BreadcrumbItem, Breadcrumbs, useDisclosure } from "@nextui-org/react";
import AddDashboardButton from "@/components/dashboards/AddDashboardButton";
import ResourceList from "@/components/dashboards/ResourceList";
import useDashboards from "@/hooks/useDashboards";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import { SetStateAction, useState } from "react";
import { Dashboard, Folder } from "@/types/dashboards";
import Search from "@/components/shared/Search";
import { useRouter } from "next/navigation";
import DashboardModal from "@/components/dashboards/DashboardModal";
import QuestionModal from "@/components/shared/QuestionModal";
import { dashboardService } from "@/lib/services/dashboards";
import FolderModal from "@/components/dashboards/FolderModal";

export default function Dashboards() {
  const { dashboards, folders, loading, operations } = useDashboards();
  const [search, setSearch] = useState("");
  const [folderSelectedIndex, setFolderSelectedIndex] = useState<number | null>(
    null,
  );
  const [dashboardToEdit, setDashboardToEdit] = useState<Dashboard | null>(
    null,
  );
  const [dashboardToDelete, setDashboardToDelete] = useState<Dashboard | null>(
    null,
  );
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  const {
    isOpen: dashboardModalOpen,
    onOpen: onDashboardModalOpen,
    onClose: onDashboardModalClose,
  } = useDisclosure();

  const {
    isOpen: deleteDashboardModalOpen,
    onOpen: onDeleteDashboardModalOpen,
    onClose: onDeleteDashboardModalClose,
  } = useDisclosure();

  const {
    isOpen: folderModalOpen,
    onOpen: onFolderModalOpen,
    onClose: onFolderModalClose,
  } = useDisclosure();

  const {
    isOpen: deleteFolderModalOpen,
    onOpen: onDeleteFolderModalOpen,
    onClose: onDeleteFolderModalClose,
  } = useDisclosure();

  const router = useRouter();

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const handleFolderClick = (index: number) => {
    setFolderSelectedIndex(index);
  };

  const handleDashboardClick = (dashboard: Dashboard) => {
    //TODO redirect to editor
    //TODO this line is only for "presentacion de medio termino"
    router.push("/editor");
  };

  const handleBack = () => {
    setFolderSelectedIndex(null);
  };

  const handleDashboardActionClick = (
    dashboard: Dashboard,
    action: "edit" | "delete",
  ) => {
    if (action === "edit") {
      setDashboardToEdit(dashboard);
      onDashboardModalOpen();
    } else {
      setDashboardToDelete(dashboard);
      onDeleteDashboardModalOpen();
    }
  };

  const handleFolderActionClick = (
    folder: Folder,
    action: "edit" | "delete",
  ) => {
    if (action === "edit") {
      setFolderToEdit(folder);
      onFolderModalOpen();
    } else {
      setFolderToDelete(folder);
      onDeleteFolderModalOpen();
    }
  };

  const handleAddDashboardClick = () => {
    setDashboardToEdit(null);
    onDashboardModalOpen();
  };

  const handleAddFolderClick = () => {
    setFolderToEdit(null);
    onFolderModalOpen();
  };

  const handleDeleteDashboard = async () => {
    if (dashboardToDelete) {
      await dashboardService.deleteDashboard(dashboardToDelete.id);
      operations.deleteDashboard(dashboardToDelete);
      setDashboardToDelete(null);
    }
  };

  const handleDeleteFolder = async () => {
    if (folderToDelete) {
      await dashboardService.deleteFolder(folderToDelete.id);
      operations.deleteFolder(folderToDelete);
      setFolderToDelete(null);
    }
  };

  return (
    <>
      <Breadcrumbs
        itemClasses={{
          item: "text-[40px]",
          separator: "text-[40px]",
        }}
      >
        <BreadcrumbItem onClick={handleBack}>
          <h2>Dashboards</h2>
        </BreadcrumbItem>
        {folderSelectedIndex !== null && (
          <BreadcrumbItem>{folders[folderSelectedIndex].name}</BreadcrumbItem>
        )}
      </Breadcrumbs>
      <div
        className={"flex justify-between w-full items-center gap-8 flex-wrap"}
      >
        <CustomSkeleton className={"rounded-lg"} isLoaded={!loading}>
          <Search
            search={search}
            onChange={handleSearch}
            onClear={() => setSearch("")}
          />
        </CustomSkeleton>

        <CustomSkeleton className={"rounded-lg"} isLoaded={!loading}>
          <AddDashboardButton
            onDashboardClick={handleAddDashboardClick}
            onFolderClick={handleAddFolderClick}
          />
        </CustomSkeleton>
      </div>
      <CustomSkeleton isLoaded={!loading} className={"h-full rounded-lg"}>
        {folderSelectedIndex !== null ? (
          <ResourceList
            dashboards={folders[folderSelectedIndex].dashboards.map(
              (dashboard: Dashboard) => ({
                ...dashboard,
                folder_id: undefined,
              }),
            )}
            folders={[]}
            search={search}
            onDashboardClick={handleDashboardClick}
            onDashboardActionClick={handleDashboardActionClick}
            emptyText={"This folder is empty."}
            folderId={folders[folderSelectedIndex].id}
          />
        ) : (
          <ResourceList
            dashboards={dashboards}
            folders={folders}
            search={search}
            onFolderClick={handleFolderClick}
            onDashboardClick={handleDashboardClick}
            onFolderActionClick={handleFolderActionClick}
            onDashboardActionClick={handleDashboardActionClick}
            emptyText={"You don't have any dashboards or folders yet."}
          />
        )}
      </CustomSkeleton>
      <DashboardModal
        isOpen={dashboardModalOpen}
        onClose={onDashboardModalClose}
        onSuccess={
          dashboardToEdit ? operations.updateDashboard : operations.addDashboard
        }
        folders={folders}
        dashboard={dashboardToEdit}
      />
      <FolderModal
        isOpen={folderModalOpen}
        onClose={onFolderModalClose}
        onSuccess={
          folderToEdit ? operations.updateFolder : operations.addFolder
        }
        folder={folderToEdit}
      />
      <QuestionModal
        titleText={"Delete Dashboard"}
        questionText={"Are you sure you want to delete this dashboard?"}
        isOpen={deleteDashboardModalOpen}
        onClose={onDeleteDashboardModalClose}
        onConfirm={handleDeleteDashboard}
      />
      <QuestionModal
        titleText={"Delete Folder"}
        questionText={"Are you sure you want to delete this folder?"}
        isOpen={deleteFolderModalOpen}
        onClose={onDeleteFolderModalClose}
        onConfirm={handleDeleteFolder}
      />
    </>
  );
}
