import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import Search from "@/components/shared/Search";
import { Add } from "iconsax-react";
import ConnectionList from "@/components/connections/view/ConnectionList";
import { Connection } from "@/types/connections";
import { useState } from "react";
import CreateConnectionModal from "@/components/connections/create/CreateConnectionModal";

const ViewConnections = ({
  connections,
  loading,
  onConnectionClick,
}: {
  connections: Connection[];
  loading: boolean;
  onConnectionClick: (connection: Connection) => void;
}) => {
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = (e: { target: { value: string } }) => {
    setSearch(e.target.value);
  };

  const handleConnectionClick = (connection: Connection) => {
    onConnectionClick(connection);
  };

  return (
    <>
      <Breadcrumbs
        itemClasses={{
          item: "text-[40px]",
          separator: "text-[40px]",
        }}
      >
        <BreadcrumbItem>
          <h2>Connections</h2>
        </BreadcrumbItem>
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
          <Button
            color={"primary"}
            size={"lg"}
            startContent={<Add />}
            onClick={onOpen}
          >
            Add New
          </Button>
        </CustomSkeleton>
      </div>
      <CustomSkeleton isLoaded={!loading} className={"h-full rounded-lg"}>
        <ConnectionList
          connections={connections}
          search={search}
          onConnectionClick={handleConnectionClick}
        />
      </CustomSkeleton>
      <CreateConnectionModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ViewConnections;
