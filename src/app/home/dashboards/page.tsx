"use client";
import { Input } from "@nextui-org/react";
import { Back } from "iconsax-react";
import { CiSearch } from "react-icons/ci";
import AddDashboardButton from "@/components/dashboards/AddDashboardButton";
import ResourceList from "@/components/dashboards/ResourceList";
import useDashboards from "@/hooks/useDashboards";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import { SetStateAction, useState } from "react";
import { DashboardInterface, FolderInterface } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

export default function Dashboards() {
  const { dashboards, folders, loading } = useDashboards();
  const [search, setSearch] = useState("");
  const [folderSelected, setFolderSelected] = useState<FolderInterface | null>(
    null,
  );

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const handleFolderClick = (folder: FolderInterface) => {
    setFolderSelected(folder);
  };

  const handleDashboardClick = (dashboard: DashboardInterface) => {
    //TODO redirect to editor
  };

  return (
    <main className="flex min-h-screen flex-col p-16 w-full h-full gap-4">
      <h2 className="text-[40px] flex items-center">
        Dashboards{" "}
        <AnimatePresence>
          {folderSelected && (
            <motion.span
              className={"ml-2.5 flex items-center gap-3"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {" "}
              | {folderSelected.name}
              <Back
                className={
                  "cursor-pointer text-primary hover:text-primary-300 hover:scale-90 transition-transform transition-colors"
                }
                size={40}
                onClick={() => setFolderSelected(null)}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </h2>
      <div
        className={"flex justify-between w-full items-center gap-8 flex-wrap"}
      >
        <CustomSkeleton className={"rounded-lg"} isLoaded={!loading}>
          <Input
            className={"w-[450px] bg-opacity-5"}
            isClearable
            startContent={<CiSearch className={"text-primary"} size={25} />}
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
