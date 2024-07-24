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
import RestBodyEditor from "@/components/connections/queries/rest/RestBodyEditor";
import { connectionsService } from "@/lib/services/connections";
import { convertToHeaders, convertToObject } from "@/lib/rest-queries";
import QuestionModal from "@/components/shared/QuestionModal";
import { adapterService } from "@/lib/services/adapter";

const fillParams = (
  params: QueryParameter[],
  body: string,
  headers: RestHeader[],
  path: string,
) => {
  //TODO: this will be done by the backend instead
  const filledPath =
    params?.reduce((path, param) => {
      return path?.replace(`{{${param.name}}}`, param.preview);
    }, path) ?? path;

  const filledHeaders = headers
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

  const queryBody = body;

  const filledBody =
    params?.reduce((body, param) => {
      return body.replace(`{{${param.name}}}`, param.preview);
    }, queryBody) ?? queryBody;

  return {
    filledPath,
    filledHeaders,
    filledBody,
  };
};

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
  const [responseLoading, setResponseLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("headers");
  const [previewToken, setPreviewToken] = useState<string>("");

  const [headers, setHeaders] = useState<RestHeader[]>(
    convertToHeaders(query?.metadata?.headers),
  );
  const [path, setPath] = useState<string>(query?.metadata?.path || "");
  const [body, setBody] = useState<string>(
    JSON.stringify(query?.metadata?.body) || "{}",
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const isMethodListClosed = useRecoilValue(isMethodListClosedState);

  const queryExists = !query?.id?.includes(" new");

  useEffect(() => {
    setResponse(null);
    setResponseData(null);
    setPath(query?.metadata?.path || "");
    setBody(JSON.stringify(query?.metadata?.body) || "{}");
    setHeaders(convertToHeaders(query?.metadata?.headers));
  }, [query.id]);

  const handleSend = async () => {
    setResponseLoading(true);
    let response;
    try {
      const parameters =
        query?.metadata?.parameters?.reduce(
          (acc: any, param: QueryParameter) => {
            return { ...acc, [param.name]: param.preview };
          },
          {},
        ) ?? {};

      response = await adapterService.previewQuery(
        connection.id,
        query.metadata.method,
        path,
        convertToObject(headers),
        JSON.parse(body),
        parameters,
      );
    } catch (e) {
      //TODO: show error message to user
      console.error(e);
    }

    console.log("RESPONSE", response);

    setResponse(response);
    setResponseData(response?.body);
    setSelectedTab("response");
    setResponseLoading(false);
  };

  const hasValidBody = () => {
    if (!body) return true;
    try {
      JSON.parse(body);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSave = async () => {
    setSaveLoading(true);
    const shouldCreate = !queryExists;
    const headersObject = convertToObject(headers);
    if (shouldCreate) {
      const newQuery = await connectionsService.createQuery(
        query.name,
        connection.id,
        {
          ...query.metadata,
          path,
          headers: headersObject,
          body: JSON.parse(body),
        },
      );
      onChange(newQuery);
    } else {
      const updatedQuery = await connectionsService.updateQuery(
        query.id,
        query.name,
        {
          ...query.metadata,
          path,
          headers: headersObject,
          body: JSON.parse(body),
        },
      );
      onChange(updatedQuery);
    }
    setSaveLoading(false);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);

    await connectionsService.deleteQuery(query.id);
    onChange(null);

    setDeleteLoading(false);
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
          <div className={"flex gap-2 items-center"}>
            {queryExists && (
              <Button
                variant={"flat"}
                color={"danger"}
                size={"sm"}
                isLoading={deleteLoading}
                onClick={onOpenDeleteModal}
              >
                Delete
              </Button>
            )}
            <Button
              size={"sm"}
              isLoading={saveLoading}
              onClick={handleSave}
              variant={"flat"}
              isDisabled={!hasValidBody()}
            >
              Save
            </Button>
          </div>
        </div>
        <MethodAndPathSelector
          method={query?.metadata?.method ?? ""}
          path={path}
          onMethodChange={(method: string) =>
            onChange({ ...query, metadata: { ...query.metadata, method } })
          }
          onPathChange={(path: string) => setPath(path)}
          onSendClick={handleSend}
          loading={responseLoading}
          disabled={!hasValidBody()}
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
                headers={headers}
                onChange={(headers: RestHeader[]) => {
                  setHeaders(headers);
                }}
              />
            </Tab>
            <Tab key={"body"} title={"Body"}>
              <RestBodyEditor
                body={body || "{}"}
                onChange={(body) => {
                  if (!body) {
                    setBody("{}");
                  } else {
                    setBody(body);
                  }
                }}
                invalidBody={!hasValidBody()}
              />
            </Tab>
            <Tab key={"response"} title={"Response"}>
              <RestResponse response={response} responseData={responseData} />
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
      <QuestionModal
        titleText={"Delete Query"}
        questionText={"Are you sure you want to delete this query?"}
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default RestQueryEditor;
