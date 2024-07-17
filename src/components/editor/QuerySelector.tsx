import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import ConnectionIcon from "../shared/ConnectionIcon";
import { ConnectionType, HTTP_METHOD } from "@/types/connections";
import { Hierarchy3 } from "iconsax-react";
import { Key } from "react";

export default function QuerySelector({
  queries,
  selectedQueryId,
  onSelectionChange,
}: {
  queries: any[];
  selectedQueryId: string;
  onSelectionChange: (key: Key) => void;
}) {
  return (
    <Autocomplete
      aria-label="Query selector"
      allowsCustomValue
      defaultItems={queries}
      disabledKeys={queries
        .filter((q) => q.connection.type !== ConnectionType.REST)
        .map((q) => q.id)}
      defaultSelectedKey={queries[0]?.id}
      selectedKey={queries.find((q) => q.id === selectedQueryId)?.id}
      label="Query"
      labelPlacement="outside"
      placeholder="Select query"
      startContent={<Hierarchy3 className={"text-primary"} />}
      onSelectionChange={onSelectionChange}
    >
      {(query) => (
        <AutocompleteItem
          key={query.id}
          startContent={
            <ConnectionIcon
              type={query.connection.type}
              size={20}
              className={"text-primary"}
            />
          }
        >
          {query.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
