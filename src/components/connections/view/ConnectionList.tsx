import { Connection } from "@/types/connections";
import ConnectionCard from "@/components/connections/view/ConnectionCard";

const ConnectionList = ({
  connections,
  search,
  onConnectionClick,
}: {
  connections: Connection[];
  search: string;
  onConnectionClick: (connection: Connection) => void;
}) => {
  return (
    <section className={"flex flex-wrap w-full h-full gap-10 mt-5 "}>
      {connections
        .filter((connection) =>
          connection.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((connection) => (
          <ConnectionCard
            key={connection.id}
            connection={connection}
            onClick={onConnectionClick}
          />
        ))}
    </section>
  );
};

export default ConnectionList;
