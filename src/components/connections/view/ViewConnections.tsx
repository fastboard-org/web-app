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
import useConnections from "@/hooks/useConnections";
import QuestionModal from "@/components/shared/QuestionModal";
import { connectionsService } from "@/lib/services/connections";

const ViewConnections = ({
  onConnectionClick,
}: {
  onConnectionClick: (connection: Connection) => void;
}) => {
  const { connections, loading, operations } = useConnections();

  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [connectionToDelete, setConnectionToDelete] =
    useState<Connection | null>(null);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleSearch = (e: { target: { value: string } }) => {
    setSearch(e.target.value);
  };

  const handleConnectionClick = (connection: Connection) => {
    onConnectionClick(connection);
  };

  const handleDelete = async (connection: Connection) => {
    await connectionsService.deleteConnection(connection.id);
    operations.deleteConnection(connection.id);
    setConnectionToDelete(null);
    onDeleteClose();
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
          onConnectionAction={(connection, action) => {
            if (action === "edit") {
              handleConnectionClick(connection);
            } else {
              setConnectionToDelete(connection);
              onDeleteOpen();
            }
          }}
        />
      </CustomSkeleton>
      <CreateConnectionModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={operations.addConnection}
      />
      <QuestionModal
        titleText={"Delete Connection"}
        questionText={"Are you sure you want to delete this connection?"}
        isOpen={isDeleteOpen}
        size={"lg"}
        onClose={onDeleteClose}
        onConfirm={async () => {
          if (connectionToDelete) {
            await handleDelete(connectionToDelete);
          }
        }}
      />
    </>
  );
};

export default ViewConnections;
