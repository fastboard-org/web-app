import { Query } from "@/types/connections";
import { Input, Listbox, ListboxItem } from "@nextui-org/react";

const RestQueriesSelectionList = ({
  queries,
  selectedQuery,
  onSelectQuery,
}: {
  queries: Query[];
  selectedQuery: Query;
  onSelectQuery: (index: number) => void;
}) => {
  return (
    <div className={"w-[250px] h-full"}>
      <Listbox
        aria-label="Single selection example"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[selectedQuery.id]}
        itemClasses={{
          base: `data-[hover=true]:bg-primary data-[hover=true]:bg-opacity-10
                 data-[selected=true]:bg-primary data-[selected=true]:bg-opacity-20 
                 data-[selectable=true]:focus:bg-unset
                 p-3 mb-1`,
        }}
      >
        {queries.map((query, index) => (
          <ListboxItem
            key={query.id}
            value={query.id}
            onClick={() => onSelectQuery(index)}
            classNames={{
              title: "text-md",
            }}
          >
            <span className={`text-foreground-400 inline-block w-[50px]`}>
              {query.metadata.method}
            </span>{" "}
            {query.name}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default RestQueriesSelectionList;
