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

export default function Dashboards() {
  const { dashboards, folders, loading, operations } = useDashboards();
  const [search, setSearch] = useState("");
  const [folderSelected, setFolderSelected] = useState<Folder | null>(null);
  const [dashboardToEdit, setDashboardToEdit] = useState<Dashboard | null>(
    null,
  );
  const [dashboardToDelete, setDashboardToDelete] = useState<Dashboard | null>(
    null,
  );

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

  const router = useRouter();

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const handleFolderClick = (folder: Folder) => {
    setFolderSelected(folder);
  };

  const handleDashboardClick = (dashboard: Dashboard) => {
    //TODO redirect to editor
    //TODO this line is only for "presentacion de medio termino"
    router.push("/editor");
  };

  const handleBack = () => {
    setFolderSelected(null);
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
      //TODO
    }
  };

  const handleDeleteDashboard = async () => {
    if (dashboardToDelete) {
      await dashboardService.deleteDashboard(dashboardToDelete.id);
      operations.deleteDashboard(dashboardToDelete);
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
        {folderSelected && (
          <BreadcrumbItem>{folderSelected.name}</BreadcrumbItem>
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
          <AddDashboardButton onDashboardClick={onDashboardModalOpen} />
        </CustomSkeleton>
      </div>
      <CustomSkeleton isLoaded={!loading} className={"h-full rounded-lg"}>
        {folderSelected ? (
          <ResourceList
            dashboards={folderSelected.dashboards.map((dashboard) => ({
              ...dashboard,
              folder_id: undefined,
            }))}
            folders={[]}
            search={search}
            onDashboardClick={handleDashboardClick}
            onDashboardActionClick={handleDashboardActionClick}
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
      <QuestionModal
        questionText={"Are you sure you want to delete this dashboard?"}
        warningText={"This action cannot be undone."}
        isOpen={deleteDashboardModalOpen}
        onClose={onDeleteDashboardModalClose}
        onConfirm={handleDeleteDashboard}
      />
    </>
  );
}
