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
  onQueryUpdate: (index: number, query: Query) => void;
}) => {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState<number>(0);

  const querySelection = {
    [ConnectionType.REST]: (
      <RestQueriesSelectionList
        queries={queries}
        selectedQuery={queries[selectedQueryIndex] || null}
        onSelectQuery={(index: number) => setSelectedQueryIndex(index)}
      />
    ),
    [ConnectionType.MONGO]: <div></div>,
    [ConnectionType.SQL]: <div></div>,
  };

  const queryEditor = {
    [ConnectionType.REST]: (
      <RestQueryEditor
        query={queries[selectedQueryIndex] || {}}
        onChange={(query: Query) => {
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