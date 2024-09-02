import { ConnectionType, HTTP_METHOD, Query } from "@/types/connections";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { methodColor } from "@/lib/rest-methods";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { isMethodListClosedState } from "@/atoms/rest-query-editor";

const RestQueryContent = ({ query }: { query: Query }) => {
  return (
    <>
      <span
        className={`text-${methodColor(
          query?.metadata?.method as HTTP_METHOD,
        )} inline-block w-[60px]`}
      >
        {query?.metadata?.method}
      </span>{" "}
      {query?.name}
    </>
  );
};

const MongoQueryContent = ({ query }: { query: Query }) => {
  return <>{query?.name}</>;
};

const queryContents = {
  [ConnectionType.REST]: RestQueryContent,
  [ConnectionType.MONGO]: MongoQueryContent,
  [ConnectionType.SQL]: RestQueryContent,
};

const QuerySelectionList = ({
  type,
  queries,
  selectedQuery,
  onSelectQuery,
  onAddClick,
}: {
  type: ConnectionType;
  queries: Query[];
  selectedQuery: Query;
  onSelectQuery: (index: number) => void;
  onAddClick: () => void;
}) => {
  const [isClosed, setIsClosed] = useRecoilState(isMethodListClosedState);

  return (
    <div
      className={`h-full flex items-center flex-col`}
      style={{
        width: isClosed ? "1%" : "250px",
      }}
    >
      <div
        className={`w-full flex items-center justify-between pl-1 ${
          isClosed ? "rounded w-10" : ""
        } `}
      >
        {isClosed && (
          <div className={"flex items-center justify-center h-full w-5"}>
            <div
              className={
                "flex items-center justify-center w-5 bg-content1 dark:bg-foreground-50 h-32 absolute bottom-1/2 top-1/2 m-auto rounded cursor-pointer hover:opacity-70 shadow-medium"
              }
              onClick={() => setIsClosed((prev) => !prev)}
            >
              <ArrowRight2
                size={"15"}
                className={"text-foreground-400 cursor-pointer z-10"}
              />
            </div>
          </div>
        )}
        {!isClosed && (
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={"text-foreground-400"}
          >
            Queries
          </motion.h3>
        )}
        {!isClosed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ArrowLeft2
              size={"15"}
              className={"text-foreground-400 hover:opacity-50 cursor-pointer"}
              onClick={() => setIsClosed((prev) => !prev)}
            />
          </motion.div>
        )}
      </div>
      {!isClosed && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{
            bounce: 0,
          }}
          className={"w-full h-full flex flex-col items-center"}
        >
          <Listbox
            aria-label="Queries List"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={[selectedQuery?.id]}
            classNames={{
              base:
                "overflow-y-auto w-full max-h-[90%] " +
                scrollbarStyles.scrollbar,
            }}
            itemClasses={{
              base: `data-[hover=true]:bg-primary data-[hover=true]:bg-opacity-10
                 data-[selected=true]:bg-primary data-[selected=true]:bg-opacity-20 
                 data-[selectable=true]:focus:bg-unset
                 p-3 mb-1`,
            }}
          >
            {queries.map((query, index) => {
              const content = type ? queryContents[type]({ query }) : null;
              return (
                <ListboxItem
                  key={query.id}
                  value={query.id}
                  onClick={() => onSelectQuery(index)}
                  classNames={{
                    title: "text-md",
                  }}
                >
                  {content}
                </ListboxItem>
              );
            })}
          </Listbox>
          <Button className={"w-[95%]"} onClick={onAddClick} variant={"flat"}>
            Add Query
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default QuerySelectionList;
