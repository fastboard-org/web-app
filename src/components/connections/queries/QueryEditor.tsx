import RestQueriesSelectionList from "@/components/connections/queries/rest/RestQueriesSelectionList";
import { Connection, ConnectionType, Query } from "@/types/connections";
import { useState } from "react";
import RestQueryEditor from "@/components/connections/queries/rest/RestQueryEditor";

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

  const restDefaultQuery: Query = {
    id: "0 new",
    name: "New Query",
    connection_id: connection?.id || "",
    metadata: {
      method: "GET",
    },
  };

  const querySelection = {
    [ConnectionType.REST]: (
      <RestQueriesSelectionList
        queries={queries.length ? queries : [restDefaultQuery]}
        selectedQuery={queries[selectedQueryIndex] || restDefaultQuery}
        onSelectQuery={(index: number) => setSelectedQueryIndex(index)}
        onAddClick={() => {
          onQueryUpdate(queries.length, {
            id: `${queries.length + 1} new`,
            name: "New Query",
            connection_id: connection?.id || "",
            metadata: {
              method: "GET",
            },
          });
          setSelectedQueryIndex(queries.length);
        }}
      />
    ),
    [ConnectionType.MONGO]: <div></div>,
    [ConnectionType.SQL]: <div></div>,
  };

  const queryEditor = {
    [ConnectionType.REST]: (
      <RestQueryEditor
        connection={connection as Connection}
        query={queries[selectedQueryIndex] || restDefaultQuery}
        onChange={(query: Query | null) => {
          if (!query) {
            setSelectedQueryIndex(0);
          }
          onQueryUpdate(selectedQueryIndex, query);
        }}
      />
    ),
    [ConnectionType.MONGO]: <div></div>,
    [ConnectionType.SQL]: <div></div>,
  };

  const renderQuerySelection = () => {
    return connection ? querySelection[connection?.type] : null;
  };

  const renderQueryEditor = () => {
    return connection ? queryEditor[connection?.type] : null;
  };

  return (
    <section className={"w-full h-full flex gap-10"}>
      {renderQuerySelection()}
      {renderQueryEditor()}
    </section>
  );
};

export default QueryEditor;
