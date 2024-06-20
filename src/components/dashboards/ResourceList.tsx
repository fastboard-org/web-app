"use client";
import { Dashboard, Folder } from "@/types/dashboards";
import ItemCard from "@/components/dashboards/ItemCard";
import { Element, Folder2 } from "iconsax-react";

const ResourceList = ({
  dashboards,
  folders,
  search,
  onFolderClick = (folder: Folder) => {},
  onDashboardClick,
}: {
  dashboards: Dashboard[];
  folders: Folder[];
  search: string;
  onFolderClick?: (folder: Folder) => void;
  onDashboardClick: (dashboard: Dashboard) => void;
}) => {
  return (
    <section className={"flex flex-wrap w-full h-full gap-10 mt-5 "}>
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
          />
        ))}
    </section>
  );
};

export default ResourceList;
