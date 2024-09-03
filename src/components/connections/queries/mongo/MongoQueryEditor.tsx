import {
  Connection,
  MONGO_METHOD,
  Query,
  QueryParameter,
} from "@/types/connections";
import EditableTitle from "@/components/shared/EditableTitle";
import { useRecoilValue } from "recoil";
import { isMethodListClosedState } from "@/atoms/rest-query-editor";
import QueryButtons from "@/components/connections/queries/QueryButtons";
import MongoMethodSelector from "@/components/connections/queries/mongo/MongoMethodSelector";
import { Button, Card, Input, Tab, Tabs } from "@nextui-org/react";
import QueryParametersDrawer from "@/components/connections/queries/QueryParametersDrawer";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import BodyEditor from "@/components/connections/queries/BodyEditor";
import { useEffect, useState } from "react";
import { isValidBody } from "@/lib/queries";
import { methodHasUpdateBody } from "@/lib/mongo-methods";

const MongoQueryEditor = ({
  connection,
  query,
  onChange,
}: {
  connection: Connection;
  query: Query;
  onChange: (query: Query | null) => void;
}) => {
  const isMethodListClosed = useRecoilValue(isMethodListClosedState);

  const [filterBody, setFilterBody] = useState<string>(
    JSON.stringify(query?.metadata?.filter_body, null, 4) || "{}",
  );

  const [updateBody, setUpdateBody] = useState<string>(
    JSON.stringify(query?.metadata?.update_body, null, 4) || "{}",
  );

  const [collectionName, setCollectionName] = useState<string>(
    query?.metadata?.collection ?? "",
  );

  useEffect(() => {
    setFilterBody(
      JSON.stringify(query?.metadata?.filter_body, null, 4) || "{}",
    );
    setUpdateBody(
      JSON.stringify(query?.metadata?.update_body, null, 4) || "{}",
    );
    setCollectionName(query?.metadata?.collection ?? "");
  }, [query]);

  const canSave =
    isValidBody(filterBody) &&
    isValidBody(updateBody) &&
    collectionName &&
    query.metadata.method;

  return (
    <div
      className={`flex ${
        !isMethodListClosed ? "w-[calc(100%-250px)]" : "w-[calc(100%-50px)]"
      } h-full gap-10`}
    >
      <div
        className={
          "flex w-[calc(100%-330px)] max-w-[calc(100%-330px)] h-full flex-col gap-3 "
        }
      >
        <div className={"flex items-center justify-between"}>
          <EditableTitle
            value={query.name}
            onChange={(name: string) => onChange({ ...query, name })}
            titleClassName={
              "text-3xl h-[50px] w-[60%] max-w-[300px] flex items-center hover:text-foreground-400 truncate"
            }
            inputClassName={
              "text-3xl border-none w-[60%] max-w-[400px] bg-transparent h-[50px] outline-none text-foreground-300 placeholder-foreground-300"
            }
            placeholder={"Enter a query name"}
          />
          <QueryButtons
            newMetadata={() => ({
              filter_body: JSON.parse(filterBody),
              update_body: JSON.parse(updateBody),
              collection: collectionName,
            })}
            onSaveSuccess={(query) => {
              onChange(query);
            }}
            onDeleteSuccess={() => {
              onChange(null);
            }}
            query={query}
            connection={connection}
            saveDisabled={!canSave}
          />
        </div>
        <div className={"flex w-full gap-3 justify-between"}>
          <MongoMethodSelector
            method={query?.metadata?.method ?? ""}
            onMethodChange={(method: string) =>
              onChange({ ...query, metadata: { ...query.metadata, method } })
            }
          />
          <Input
            placeholder={"Collection Name"}
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            isClearable
            onClear={() => setCollectionName("")}
          />
          <Button
            color={"primary"}
            isDisabled={!isValidBody(filterBody) && !isValidBody(updateBody)}
          >
            Send
          </Button>
        </div>
        <Card className={"w-full h-full p-4"}>
          <Tabs
            classNames={{
              panel:
                "p-0 mt-2 h-full overflow-y-auto " + scrollbarStyles.scrollbar,
            }}
          >
            <Tab key={"body"} title={"Body"} className={"flex gap-5"}>
              <BodyEditor
                body={filterBody}
                onChange={setFilterBody}
                invalidBody={!isValidBody(filterBody)}
                label={"Filter Body"}
                placeholder={"Enter filter body here"}
                defaultValue={
                  query.metadata.method === MONGO_METHOD.AGGREGATE ? "[]" : "{}"
                }
              />
              {methodHasUpdateBody(query.metadata.method) && (
                <BodyEditor
                  body={updateBody}
                  onChange={setUpdateBody}
                  invalidBody={!isValidBody(updateBody)}
                  label={"Update Body"}
                  placeholder={"Enter update body here"}
                />
              )}
            </Tab>
            <Tab key={"response"} title={"Response"}></Tab>
          </Tabs>
        </Card>
      </div>
      <QueryParametersDrawer
        queryParameters={query?.metadata?.parameters ?? []}
        setQueryParameters={(queryParameters: QueryParameter[]) =>
          onChange({
            ...query,
            metadata: { ...query.metadata, parameters: queryParameters },
          })
        }
      />
    </div>
  );
};

export default MongoQueryEditor;
