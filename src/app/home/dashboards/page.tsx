"use client";
import { Input } from "@nextui-org/react";
import { SearchNormal1 } from "iconsax-react";
import AddDashboardButton from "@/components/dashboards/AddDashboardButton";
import DashboardList from "@/components/dashboards/DashboardList";
import useDashboards from "@/hooks/useDashboards";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import { SetStateAction, useState } from "react";

export default function Dashboards() {
  const { dashboards, loading } = useDashboards();
  const [search, setSearch] = useState("");
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col p-16 w-full h-full gap-4">
      <h2 className="text-[40px] mb-">Dashboards</h2>
      <div
        className={"flex justify-between w-full items-center gap-8 flex-wrap"}
      >
        <CustomSkeleton className={"rounded-lg"} isLoaded={!loading}>
          <Input
            className={"w-[450px] bg-opacity-5"}
            isClearable
            startContent={<SearchNormal1 className={"text-primary"} />}
            placeholder={"Search"}
            size={"lg"}
            onChange={handleSearch}
            onClear={() => setSearch("")}
            value={search}
          />
        </CustomSkeleton>

        <CustomSkeleton className={"rounded-lg"} isLoaded={!loading}>
          <AddDashboardButton />
        </CustomSkeleton>
      </div>
      <CustomSkeleton isLoaded={!loading} className={"h-full rounded-lg"}>
        <DashboardList dashboards={dashboards} search={search} />
      </CustomSkeleton>
    </main>
  );
}
