import { Query, QueryParameter } from "@/types/connections";
import EditableTitle from "@/components/shared/EditableTitle";
import QueryParametersDrawer from "@/components/connections/queries/QueryParametersDrawer";
import MethodAndPathSelector from "@/components/connections/queries/rest/MethodAndPathSelector";
import { Button, ButtonGroup, Tab, Tabs } from "@nextui-org/react";

const RestQueryEditor = ({
  query,
  onChange,
}: {
  query: Query;
  onChange: (query: Query) => void;
}) => {
  return (
    <div className={"flex flex-1 h-full gap-10"}>
      <div className={"flex flex-1 h-full flex-col gap-3"}>
        <EditableTitle
          value={query.name}
          onChange={(name: string) => onChange({ ...query, name })}
          titleClassName={
            "text-3xl h-[50px] flex items-center hover:text-foreground-400"
          }
          inputClassName={
            "text-3xl w-full border-none bg-transparent h-[50px] outline-none text-foreground-300 placeholder-foreground-300"
          }
          placeholder={"Enter a query name"}
        />
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
        <Tabs>
          <Tab key={"headers"} title={"Headers"} />
          <Tab key={"body"} title={"Body"} />
        </Tabs>
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
