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
import {
  Connection,
  ConnectionType,
  HTTP_METHOD,
  MONGO_METHOD,
  Query,
  QueryMethod,
  QueryType,
} from "@/types/connections";
import CustomSkeleton from "../shared/CustomSkeleton";
import useMyQueries from "@/hooks/connections/useMyQueries";
import { useMemo } from "react";
import { methodColor as restMethodColor } from "@/lib/rest-methods";
import { methodColor as mongoMethodColor } from "@/lib/mongo-methods";
import { getQueryType } from "@/lib/queries";

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

const methodColor = (connectionType: ConnectionType, method: QueryMethod) => {
  switch (connectionType) {
    case ConnectionType.REST:
      return restMethodColor(method as HTTP_METHOD);
    case ConnectionType.MONGO:
      return mongoMethodColor(method as MONGO_METHOD);
    default:
      return "gray";
  }
};

export default function QuerySelection({
  selectedQueryId,
  onQuerySelect,
  label = "Query",
  placeholder = "Select query",
  isDisabled = false,
  type = null,
}: {
  selectedQueryId: string;
  onQuerySelect: (query: Query) => void;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  type?: QueryType | null;
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
      queries?.reduce(
        (acc, query) => {
          if (!acc[query.connection_id]) {
            acc[query.connection_id] = [];
          }
          acc[query.connection_id].push(query);
          return acc;
        },
        {} as Record<string, Query[]>,
      ) || {}
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
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        isDisabled={isDisabled}
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
          const filteredQueries = groupedQueries[connection.id]?.filter(
            (query) => {
              if (type) {
                return query?.metadata?.method && getQueryType(query) === type;
              }
              return true;
            },
          );
          return (
            <AutocompleteSection
              key={connection.id}
              title={connection.name}
              style={{
                display: filteredQueries.length > 0 ? "block" : "none",
              }}
            >
              {filteredQueries.map((query) => (
                <AutocompleteItem
                  key={query.id}
                  value={query.id}
                  startContent={
                    <div className="flex flex-row gap-x-1">
                      <span
                        className={`text-${methodColor(
                          query.connection?.type as ConnectionType,
                          query?.metadata?.method as QueryMethod,
                        )}`}
                      >
                        {query?.metadata?.method}
                      </span>
                    </div>
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
