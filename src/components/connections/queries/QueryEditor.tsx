import QuerySelectionList from "@/components/connections/queries/QuerySelectionList";
import {
  Connection,
  ConnectionType,
  HTTP_METHOD,
  MONGO_METHOD,
  Query,
  QueryParameter,
} from "@/types/connections";
import { useState } from "react";
import RestQueryEditor from "@/components/connections/queries/rest/RestQueryEditor";
import QueryParametersDrawer from "@/components/connections/queries/QueryParametersDrawer";
import MongoQueryEditor from "@/components/connections/queries/mongo/MongoQueryEditor";

const getDefaultQuery = (connection: Connection | null, id: string) => {
  switch (connection?.type) {
    case ConnectionType.REST:
      return {
        id: id,
        name: "New Query",
        connection_id: connection?.id || "",
        connection_type: ConnectionType.REST,
        metadata: {
          method: HTTP_METHOD.GET,
        },
      };
    case ConnectionType.MONGO:
      return {
        id: id,
        name: "New Query",
        connection_id: connection?.id || "",
        connection_type: ConnectionType.MONGO,
        metadata: {
          method: MONGO_METHOD.FIND,
        },
      };
    default:
      return {
        id: id,
        name: "New Query",
        connection_id: connection?.id || "",
        connection_type: ConnectionType.SQL,
        metadata: {},
      };
  }
};

const QueryEditor = ({
  connection,
  queries,
  onQueryUpdate,
}: {
  connection: Connection | null;
  queries: Query[];
  onQueryUpdate: (index: number, query: Query | null) => void;
}) => {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState<number>(0);

  const defaultQuery: Query = getDefaultQuery(connection, "0 new");

  const selectedQuery = queries[selectedQueryIndex] || defaultQuery;

  const handleChange = (query: Query | null) => {
    if (!query) {
      setSelectedQueryIndex(0);
    }

    onQueryUpdate(selectedQueryIndex, query);
  };

  const queryEditor = {
    [ConnectionType.REST]: (
      <RestQueryEditor
        connection={connection as Connection}
        query={selectedQuery}
        onChange={handleChange}
      />
    ),
    [ConnectionType.MONGO]: (
      <MongoQueryEditor
        connection={connection as Connection}
        query={selectedQuery}
        onChange={handleChange}
      />
    ),
    [ConnectionType.SQL]: <div></div>,
  };

  const renderQueryEditor = () => {
    return connection ? queryEditor[connection?.type] : null;
  };

  return (
    <section className={"w-full h-full flex gap-10"}>
      <QuerySelectionList
        type={connection?.type as ConnectionType}
        queries={queries.length ? queries : [defaultQuery]}
        selectedQuery={queries[selectedQueryIndex] || defaultQuery}
        onSelectQuery={(index: number) => setSelectedQueryIndex(index)}
        onAddClick={() => {
          onQueryUpdate(
            queries.length,
            getDefaultQuery(connection, `${queries.length + 1} new`),
          );
          setSelectedQueryIndex(queries.length);
        }}
      />
      {renderQueryEditor()}
    </section>
  );
};

export default QueryEditor;
