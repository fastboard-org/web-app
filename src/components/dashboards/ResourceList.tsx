"use client";
import { DashboardInterface, FolderInterface } from "@/types";
import ItemCard from "@/components/dashboards/ItemCard";

const DashboardList = ({
  dashboards,
  folders,
  search,
}: {
  dashboards: DashboardInterface[];
  folders: FolderInterface[];
  search: string;
}) => {
  const getItemsToRender = (): {
    dashboards: DashboardInterface[];
    folders: FolderInterface[];
  } => {};

  return (
    <section className={"flex flex-wrap w-full h-full gap-10 mt-5 "}>
      {dashboards
        .filter((dashboard) =>
          dashboard.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((dashboard) => (
          <ItemCard key={dashboard.id} name={dashboard.name} />
        ))}
    </section>
  );
};

export default DashboardList;
