import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import ConnectionIcon from "../shared/ConnectionIcon";
import { Query } from "@/types/connections";
import CustomSkeleton from "../shared/CustomSkeleton";
import useMyQueries from "@/hooks/useMyQueries";

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
            type={selectedQuery?.connection_type ?? null}
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
        errorMessage="Something went wrong, queries not found"
        isInvalid={isError}
      >
        {(query) => (
          <AutocompleteItem
            key={query.id}
            startContent={
              <ConnectionIcon
                type={query.connection_type}
                size={20}
                className={"text-primary"}
              />
            }
          >
            {query.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </CustomSkeleton>
  );
}
