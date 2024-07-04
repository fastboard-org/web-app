import {
  Connection,
  Query,
  QueryParameter,
  RestHeader,
} from "@/types/connections";
import EditableTitle from "@/components/shared/EditableTitle";
import QueryParametersDrawer from "@/components/connections/queries/QueryParametersDrawer";
import MethodAndPathSelector from "@/components/connections/queries/rest/MethodAndPathSelector";
import { Button, Card, Tab, Tabs } from "@nextui-org/react";
import HeadersTable from "@/components/connections/queries/rest/HeadersTable";
import { useEffect, useState } from "react";
import {
  collapseAllNested,
  darkStyles,
  defaultStyles,
  JsonView,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { useTheme } from "next-themes";

const fillParams = (query: Query, params: QueryParameter[]) => {
  //TODO: this will be done by the backend instead
  const filledPath =
    params?.reduce((path, param) => {
      return path.replace(`{{${param.name}}}`, param.preview);
    }, query.metadata.path) ?? query.metadata.path;

  const filledHeaders = query?.metadata?.headers
    ?.map((header: RestHeader) => {
      return {
        key: params?.reduce((key, param) => {
          return key.replace(`{{${param.name}}}`, param.preview);
        }, header.key),
        value: params?.reduce((value, param) => {
          return value.replace(`{{${param.name}}}`, param.preview);
        }, header.value),
      };
    })
    .filter((header: RestHeader) => header.key && header.value);

  return {
    filledPath,
    filledHeaders,
  };
};

const RestQueryEditor = ({
  connection,
  query,
  onChange,
}: {
  connection: Connection;
  query: Query;
  onChange: (query: Query) => void;
}) => {
  const { theme } = useTheme();
  const [response, setResponse] = useState<any>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [responseLoading, setResponseLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    setResponse(null);
    setResponseData(null);
  }, [query.id]);

  const handleSend = async () => {
    setResponseLoading(true);
    const { filledPath, filledHeaders } = fillParams(
      query,
      query.metadata.parameters,
    );

    let response;
    try {
      response = await fetch(connection?.credentials?.url + filledPath, {
        method: query.metadata.method,
        headers: filledHeaders?.reduce(
          (headers: any, header: { key: any; value: any }) => {
            return { ...headers, [header.key]: header.value };
          },
          {},
        ),
      });
    } catch (e) {
      //TODO: show error message to user
      console.error(e);
    }

    setResponse(response);

    try {
      setResponseData(await response?.json());
    } catch (e) {
      console.error(e);
      setResponseData({});
    }
    setResponseLoading(false);
  };

  const handleSave = () => {
    setSaveLoading(true);
    setTimeout(() => {
      //TODO: save query to the backend
      setSaveLoading(false);
    }, 2000);
  };

  return (
    <div className={"flex w-[calc(100%-250px)] h-full gap-10"}>
      <div className={"flex w-[calc(100%-300px)] h-full flex-col gap-3"}>
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
          <div className={"flex gap-2"}>
            <Button isLoading={saveLoading} onClick={handleSave}>
              Save
            </Button>
            <Button
              color={"primary"}
              onClick={handleSend}
              isLoading={responseLoading}
            >
              Send
            </Button>
          </div>
        </div>
        <MethodAndPathSelector
          method={query.metadata.method ?? ""}
          path={query.metadata.path ?? ""}
          onMethodChange={(method: string) =>
            onChange({ ...query, metadata: { ...query.metadata, method } })
          }
          onPathChange={(path: string) =>
            onChange({ ...query, metadata: { ...query.metadata, path } })
          }
        />
        <Tabs
          classNames={{
            panel: "max-h-[30%] p-0",
          }}
        >
          <Tab key={"headers"} title={"Headers"}>
            <HeadersTable
              headers={
                query.metadata?.headers?.length
                  ? query.metadata.headers
                  : [
                      {
                        key: "",
                        value: "",
                      },
                    ]
              }
              onChange={(headers: RestHeader[]) => {
                onChange({
                  ...query,
                  metadata: { ...query.metadata, headers },
                });
              }}
            />
          </Tab>
          <Tab key={"body"} title={"Body"}>
            {/*TODO: implement body editor*/}
          </Tab>
        </Tabs>
        <Card className={"w-full h-full p-4"}>
          {response && (
            <>
              <p className={"text-sm absolute right-10 text-foreground-500"}>
                Status: {response.status}
              </p>
              <JsonView
                data={responseData}
                shouldExpandNode={collapseAllNested}
                style={{
                  ...(theme === "dark" ? darkStyles : defaultStyles),
                  container:
                    "bg-transparent overflow-y-auto text-md " +
                    scrollbarStyles.scrollbar,
                }}
              />
            </>
          )}
        </Card>
      </div>
      <QueryParametersDrawer
        queryParameters={query.metadata.parameters ?? []}
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

export default RestQueryEditor;
