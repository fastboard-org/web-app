import { Query } from "@/types/connections";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import scrollbarStyles from "@/styles/scrollbar.module.css";

const RestQueriesSelectionList = ({
  queries,
  selectedQuery,
  onSelectQuery,
  onAddClick,
}: {
  queries: Query[];
  selectedQuery: Query;
  onSelectQuery: (index: number) => void;
  onAddClick: () => void;
}) => {
  return (
    <div className={"w-[18%] max-w-[250px] h-full flex items-center flex-col"}>
      <Listbox
        aria-label="Single selection example"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[selectedQuery.id]}
        classNames={{
          base:
            "overflow-y-auto w-full max-h-full " + scrollbarStyles.scrollbar,
        }}
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
      <Button className={"w-[95%]"} onClick={onAddClick}>
        Add Query
      </Button>
    </div>
  );
};

export default RestQueriesSelectionList;
