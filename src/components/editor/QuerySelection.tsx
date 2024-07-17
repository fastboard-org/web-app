import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import ConnectionIcon from "../shared/ConnectionIcon";
import { ConnectionType } from "@/types/connections";
import { Key } from "react";
import useQueries from "@/hooks/useQueries";
import CustomSkeleton from "../shared/CustomSkeleton";

export default function QuerySelection({
  selectedQueryId,
  onSelectionChange,
}: {
  selectedQueryId: string;
  onSelectionChange: (key: Key) => void;
}) {
  const { queries, loading, isError, error } = useQueries("");

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
        allowsCustomValue
        defaultItems={queries}
        disabledKeys={queries
          ?.filter((q) => q.metadata.type !== ConnectionType.REST)
          .map((q) => q.id)}
        defaultSelectedKey={selectedQuery?.id}
        selectedKey={selectedQuery?.id}
        label="Query"
        labelPlacement="outside"
        placeholder="Select query"
        startContent={
          <ConnectionIcon
            type={selectedQuery?.metadata.type}
            size={25}
            className="text-primary"
          />
        }
        onSelectionChange={onSelectionChange}
        errorMessage="Something went wrong, queries not found"
        isInvalid={isError}
      >
        {(query) => (
          <AutocompleteItem
            key={query.id}
            startContent={
              <ConnectionIcon
                type={query.metadata.type}
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
