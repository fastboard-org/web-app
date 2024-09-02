import { Connection, Query, QueryParameter } from "@/types/connections";
import EditableTitle from "@/components/shared/EditableTitle";
import { useRecoilValue } from "recoil";
import { isMethodListClosedState } from "@/atoms/rest-query-editor";
import QueryButtons from "@/components/connections/queries/QueryButtons";
import MongoMethodSelector from "@/components/connections/queries/mongo/MongoMethodSelector";
import { Button, Card, Tab, Tabs } from "@nextui-org/react";
import QueryParametersDrawer from "@/components/connections/queries/QueryParametersDrawer";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import BodyEditor from "@/components/connections/queries/BodyEditor";
import { useEffect, useState } from "react";
import { isValidBody } from "@/lib/queries";

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
  const [body, setBody] = useState<string>(
    JSON.stringify(query?.metadata?.body, null, 4) || "{}",
  );

  useEffect(() => {
    setBody(JSON.stringify(query?.metadata?.body, null, 4) || "{}");
  }, [query]);

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
              body: JSON.parse(body),
            })}
            onSaveSuccess={(query) => {
              onChange(query);
            }}
            onDeleteSuccess={() => {
              onChange(null);
            }}
            query={query}
            connection={connection}
            saveDisabled={!isValidBody(body)}
          />
        </div>
        <div className={"flex w-full gap-3 justify-between"}>
          <MongoMethodSelector
            method={query?.metadata?.method ?? ""}
            onMethodChange={(method: string) =>
              onChange({ ...query, metadata: { ...query.metadata, method } })
            }
          />
          <Button color={"primary"} isDisabled={!isValidBody(body)}>
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
            <Tab key={"body"} title={"Body"}>
              <BodyEditor
                body={body || "{}"}
                onChange={setBody}
                invalidBody={!isValidBody(body)}
              />
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
