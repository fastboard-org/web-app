"use client";
import { DashboardInterface } from "@/types";
import DashboardCard from "@/components/dashboards/DashboardCard";

const DashboardList = ({
  dashboards,
  search,
}: {
  dashboards: DashboardInterface[];
  search: string;
}) => {
  return (
    <section className={"flex flex-wrap w-full h-full gap-10 mt-5 "}>
      {dashboards
        .filter((dashboard) =>
          dashboard.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((dashboard) => (
          <DashboardCard key={dashboard.id} dashboard={dashboard} />
        ))}
    </section>
  );
};

export default DashboardList;
