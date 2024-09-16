import { Connection } from "@/types/connections";
import ConnectionCard from "@/components/connections/view/ConnectionCard";

const ConnectionList = ({
  connections,
  search,
  onConnectionClick,
  onConnectionAction,
}: {
  connections: Connection[];
  search: string;
  onConnectionClick: (connection: Connection) => void;
  onConnectionAction: (
    connection: Connection,
    action: "edit" | "delete",
  ) => void;
}) => {
  return (
    <section className={"flex flex-wrap w-full  gap-10 mt-5 "}>
      {connections.length === 0 && (
        <p
          className={"text-center w-full text-xl text-foreground-400 mt-[15%]"}
        >
          You don't have any connections yet.
        </p>
      )}
      {connections
        .filter((connection) =>
          connection.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((connection) => (
          <ConnectionCard
            key={connection.id}
            connection={connection}
            onClick={onConnectionClick}
            onAction={(action: "edit" | "delete") => {
              onConnectionAction(connection, action);
            }}
          />
        ))}
    </section>
  );
};

export default ConnectionList;
