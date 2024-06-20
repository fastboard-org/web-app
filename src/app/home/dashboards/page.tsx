"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import AddDashboardButton from "@/components/dashboards/AddDashboardButton";
import ResourceList from "@/components/dashboards/ResourceList";
import useDashboards from "@/hooks/useDashboards";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import { SetStateAction, useState } from "react";
import { Dashboard, Folder } from "@/types/dashboards";
import Search from "@/components/shared/Search";

export default function Dashboards() {
  const { dashboards, folders, loading } = useDashboards();
  const [search, setSearch] = useState("");
  const [folderSelected, setFolderSelected] = useState<Folder | null>(
    null,
  );

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const handleFolderClick = (folder: Folder) => {
    setFolderSelected(folder);
  };

  const handleDashboardClick = (dashboard: Dashboard) => {
    //TODO redirect to editor
  };

  const handleBack = () => {
    setFolderSelected(null);
  };

  return (
    <main className="flex min-h-screen flex-col p-16 w-full h-full gap-4">
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
          <AddDashboardButton />
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
          />
        ) : (
          <ResourceList
            dashboards={dashboards}
            folders={folders}
            search={search}
            onFolderClick={handleFolderClick}
            onDashboardClick={handleDashboardClick}
          />
        )}
      </CustomSkeleton>
    </main>
  );
}
