import {
  Connection,
  Query,
  QueryParameter,
  RestHeader,
} from "@/types/connections";
import EditableTitle from "@/components/shared/EditableTitle";
import QueryParametersDrawer from "@/components/connections/queries/QueryParametersDrawer";
import MethodAndPathSelector from "@/components/connections/queries/rest/MethodAndPathSelector";
import { Button, Card, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import HeadersTable from "@/components/connections/queries/rest/HeadersTable";
import { useEffect, useState } from "react";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { Lock } from "iconsax-react";
import RestResponse from "@/components/connections/queries/rest/RestResponse";
import AuthModal from "@/components/connections/queries/rest/AuthModal";
import { useRecoilValue } from "recoil";
import { isMethodListClosedState } from "@/atoms/rest-query-editor";

const fillParams = (query: Query, params: QueryParameter[]) => {
  //TODO: this will be done by the backend instead
  const filledPath =
    params?.reduce((path, param) => {
      return path?.replace(`{{${param.name}}}`, param.preview);
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
  const [response, setResponse] = useState<any>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [responseLoading, setResponseLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("headers");
  const [previewToken, setPreviewToken] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMethodListClosed = useRecoilValue(isMethodListClosedState);

  useEffect(() => {
    setResponse(null);
    setResponseData(null);
  }, [query.id]);

  const handleSend = async () => {
    setResponseLoading(true);
    const { filledPath, filledHeaders } = fillParams(query, [
      ...(query.metadata.parameters ?? []),
      {
        name: "token",
        preview: previewToken,
      },
    ]);

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

    setSelectedTab("response");
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
    <div
      className={`flex ${!isMethodListClosed ? "w-[calc(100%-250px)]" : "w-full"} h-full gap-10`}
    >
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
            <Button
              isLoading={saveLoading}
              onClick={handleSave}
              variant={"flat"}
            >
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
        <Card className={"w-full h-full p-4"}>
          <Tabs
            classNames={{
              panel:
                "p-0 mt-2 h-full overflow-y-auto " + scrollbarStyles.scrollbar,
            }}
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
          >
            <Tab key={"headers"} title={"Headers"}>
              <HeadersTable
                headers={query?.metadata?.headers}
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
            <Tab key={"response"} title={"Response"}>
              <RestResponse response={response} responseData={responseData} />
            </Tab>
          </Tabs>
          <Button
            className={"absolute right-5 top-4"}
            variant={"flat"}
            onClick={onOpen}
          >
            <Lock size={15} />
            Auth
          </Button>
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
      <AuthModal
        preview_token={previewToken}
        onChange={(preview_token) => {
          setPreviewToken(preview_token);
        }}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default RestQueryEditor;
