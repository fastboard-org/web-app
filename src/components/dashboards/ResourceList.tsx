"use client";
import { Dashboard, Folder } from "@/types/dashboards";
import ItemCard from "@/components/dashboards/ItemCard";
import { Element, Folder2 } from "iconsax-react";

const ResourceList = ({
  dashboards,
  folders,
  search,
  onFolderClick = (folder: Folder) => {},
  onFolderActionClick = (folder: Folder, action: "edit" | "delete") => {},
  onDashboardClick,
  onDashboardActionClick,
}: {
  dashboards: Dashboard[];
  folders: Folder[];
  search: string;
  onFolderClick?: (folder: Folder) => void;
  onFolderActionClick?: (folder: Folder, action: "edit" | "delete") => void;
  onDashboardClick: (dashboard: Dashboard) => void;
  onDashboardActionClick: (
    dashboard: Dashboard,
    action: "edit" | "delete",
  ) => void;
}) => {
  const isEmpty = folders.length === 0 && dashboards.length === 0;

  return (
    <section className={"flex flex-wrap w-full h-full gap-10 mt-5 "}>
      {isEmpty && (
        <p
          className={"text-center w-full text-xl text-foreground-400 mt-[15%]"}
        >
          You don't have any dashboards or folders yet.
        </p>
      )}
      {folders
        .filter((folder) =>
          folder.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((folder) => (
          <ItemCard
            key={folder.id}
            name={folder.name}
            icon={<Folder2 className={"text-primary"} size={20} />}
            onClick={() => onFolderClick(folder)}
            onEditClick={() => onFolderActionClick(folder, "edit")}
            onDeleteClick={() => onFolderActionClick(folder, "delete")}
          />
        ))}
      {dashboards
        .filter(
          (dashboard) =>
            dashboard.name.toLowerCase().includes(search.toLowerCase()) &&
            !dashboard.folder_id,
        )
        .map((dashboard) => (
          <ItemCard
            key={dashboard.id}
            name={dashboard.name}
            icon={<Element className={"text-primary"} size={20} />}
            onClick={() => onDashboardClick(dashboard)}
            onEditClick={() => onDashboardActionClick(dashboard, "edit")}
            onDeleteClick={() => onDashboardActionClick(dashboard, "delete")}
          />
        ))}
    </section>
  );
};

export default ResourceList;
