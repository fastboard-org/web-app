import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Button,
  Divider,
  Link,
  Spacer,
} from "@nextui-org/react";
import ConnectionIcon from "../shared/ConnectionIcon";
import { Connection, Query } from "@/types/connections";
import CustomSkeleton from "../shared/CustomSkeleton";
import useMyQueries from "@/hooks/connections/useMyQueries";
import { useMemo } from "react";

function CreateQuery() {
  return (
    <div>
      <Button
        href="/home/connections"
        as={Link}
        color="primary"
        showAnchorIcon
        variant="solid"
        className="w-full h-8"
      >
        Create query
      </Button>
      <Spacer y={1} />
      <Divider />
    </div>
  );
}

function EmptyContent() {
  return (
    <div>
      <span>You don't have any queries yet</span>
    </div>
  );
}

export default function QuerySelection({
  selectedQueryId,
  onQuerySelect,
}: {
  selectedQueryId: string;
  onQuerySelect: (query: Query) => void;
}) {
  const { queries, loading, isError, error } = useMyQueries();

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const connections = useMemo(() => {
    return (
      queries?.reduce((acc, query) => {
        if (!query.connection) {
          return acc;
        }

        if (!acc.find((c) => c.id === query.connection?.id)) {
          acc.push(query.connection);
        }
        return acc;
      }, [] as Connection[]) || []
    );
  }, [queries]);
  const groupedQueries = useMemo(() => {
    return (
      queries?.reduce((acc, query) => {
        if (!acc[query.connection_id]) {
          acc[query.connection_id] = [];
        }
        acc[query.connection_id].push(query);
        return acc;
      }, {} as Record<string, Query[]>) || {}
    );
  }, [queries]);

  const selectedQuery = queries?.find((q) => q.id === selectedQueryId);

  return (
    <CustomSkeleton
      isLoaded={!loading}
      loadingClassName="h-10 rounded-lg"
      onlyRenderOnLoad
    >
      <Autocomplete
        aria-label="Query selector"
        defaultItems={queries}
        disabledKeys={[]}
        defaultSelectedKey={selectedQuery?.id || ""}
        selectedKey={selectedQuery?.id || ""}
        label="Query"
        labelPlacement="outside"
        placeholder="Select query"
        startContent={
          <ConnectionIcon
            type={selectedQuery?.connection?.type ?? null}
            size={25}
            className="text-primary"
          />
        }
        onSelectionChange={(key) => {
          const query = queries?.find((q) => q.id === key);
          if (query) {
            onQuerySelect(query);
          }
        }}
        listboxProps={{
          topContent: <CreateQuery />,
          emptyContent: <EmptyContent />,
        }}
        errorMessage="Something went wrong, queries not found"
        isInvalid={isError}
      >
        {connections.map((connection) => {
          return (
            <AutocompleteSection key={connection.id} title={connection.name}>
              {groupedQueries[connection.id]?.map((query) => (
                <AutocompleteItem
                  key={query.id}
                  value={query.id}
                  startContent={
                    <ConnectionIcon
                      type={query.connection?.type ?? null}
                      size={20}
                      className="text-primary"
                    />
                  }
                >
                  {query.name}
                </AutocompleteItem>
              ))}
            </AutocompleteSection>
          );
        })}
      </Autocomplete>
    </CustomSkeleton>
  );
}
