import {
  Connection,
  ContentType,
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
import ResponseViewer from "@/components/connections/queries/ResponseViewer";
import AuthModal from "@/components/connections/queries/rest/AuthModal";
import { useRecoilValue } from "recoil";
import { isMethodListClosedState } from "@/atoms/rest-query-editor";
import BodyEditor from "@/components/connections/queries/BodyEditor";
import { convertToHeaders, convertToObject } from "@/lib/rest-queries";
import { toast } from "sonner";
import { Toaster } from "@/components/shared/Toaster";
import { usePreviewQuery } from "@/hooks/adapter/usePreviewQuery";
import QueryButtons from "@/components/connections/queries/QueryButtons";
import { isValidBody } from "@/lib/queries";

const RestQueryEditor = ({
  connection,
  query,
  onChange,
}: {
  connection: Connection;
  query: Query;
  onChange: (query: Query | null) => void;
}) => {
  const [response, setResponse] = useState<any>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<string>("headers");
  const [previewToken, setPreviewToken] = useState<string>("");

  const [headers, setHeaders] = useState<RestHeader[]>(
    convertToHeaders(query?.metadata?.headers)
  );
  const [path, setPath] = useState<string>(query?.metadata?.path || "");
  const [contentType, setContentType] = useState<ContentType>(
    query?.metadata?.contentType || ContentType.JSON
  );
  const [body, setBody] = useState<string>(
    JSON.stringify(query?.metadata?.body, null, 4) || "{}"
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { previewQuery, loading: previewQueryLoading } = usePreviewQuery({
    onSuccess: (response: any) => {
      setResponse(response);
      setResponseData(response?.body);
      setSelectedTab("response");
    },
    onError: (error: any) => {
      console.error("Error previewing query", error);
      const axiosError = error?.response?.data?.error;
      toast.error(
        `Failed to send request: ${axiosError?.description || error}`
      );
    },
  });

  const isMethodListClosed = useRecoilValue(isMethodListClosedState);

  useEffect(() => {
    setResponse(null);
    setResponseData(null);
    setPath(query?.metadata?.path || "");
    setContentType(query?.metadata?.contentType || ContentType.JSON);
    setBody(JSON.stringify(query?.metadata?.body, null, 4) || "{}");
    setHeaders(convertToHeaders(query?.metadata?.headers));
  }, [query.id]);

  const handleSend = async () => {
    let parameters = query?.metadata?.parameters ?? [];

    if (previewToken) {
      parameters = [
        ...parameters,
        { name: "token", type: "text", preview: previewToken },
      ];
    }

    const finalBody = JSON.parse(body);

    previewQuery({
      connectionId: connection.id,
      queryMetadata: {
        method: query.metadata.method,
        path,
        headers: convertToObject(headers),
        contentType,
        body: finalBody,
      },
      parameters,
      config: {
        headers: {
          "Content-Type": contentType,
        },
      },
    });
  };

  return (
    <>
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
              newMetadata={() => {
                return {
                  path,
                  headers: convertToObject(headers),
                  contentType: contentType,
                  body: JSON.parse(body),
                };
              }}
              onSaveSuccess={(query) => onChange(query)}
              onDeleteSuccess={() => onChange(null)}
              query={query}
              connection={connection}
              saveDisabled={!isValidBody(body)}
            />
          </div>
          <MethodAndPathSelector
            method={query?.metadata?.method ?? ""}
            path={path}
            onMethodChange={(method: string) =>
              onChange({ ...query, metadata: { ...query.metadata, method } })
            }
            onPathChange={(path: string) => setPath(path)}
            onSendClick={handleSend}
            loading={previewQueryLoading}
            disabled={!isValidBody(body)}
          />
          <Card className={"w-full h-full p-4"}>
            <Tabs
              classNames={{
                panel:
                  "p-0 mt-2 h-full overflow-y-auto " +
                  scrollbarStyles.scrollbar,
              }}
              selectedKey={selectedTab}
              onSelectionChange={(key) => setSelectedTab(key as string)}
            >
              <Tab key={"headers"} title={"Headers"}>
                <HeadersTable
                  headers={headers}
                  onChange={(headers: RestHeader[]) => {
                    setHeaders(headers);
                  }}
                />
              </Tab>
              <Tab key={"body"} title={"Body"}>
                <BodyEditor
                  body={body || "{}"}
                  onChange={setBody}
                  invalidBody={!isValidBody(body)}
                />
              </Tab>
              <Tab key={"response"} title={"Response"}>
                <ResponseViewer
                  status={response?.status_code}
                  data={responseData}
                />
              </Tab>
            </Tabs>
            <Button
              className={"absolute right-4 top-4"}
              variant={"flat"}
              onClick={onOpen}
            >
              <Lock size={15} />
              Auth
            </Button>
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
        <AuthModal
          preview_token={previewToken}
          onChange={(preview_token) => {
            setPreviewToken(preview_token);
          }}
          isOpen={isOpen}
          onClose={onClose}
        />
      </div>
      <div className={"absolute"}>
        <Toaster position={"bottom-right"} />
      </div>
    </>
  );
};

export default RestQueryEditor;
