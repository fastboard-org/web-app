import { Code, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { RiQuestionLine } from "react-icons/ri";
import { Column, TableActionProperty } from "@/types/editor/table-types";
import QuerySelection from "@/components/editor/QuerySelection";
import { QueryType } from "@/types/connections";
import { queryToRestQueryData } from "@/lib/rest-queries";

const actionToQueryType = (action: TableActionProperty) => {
  switch (action.type) {
    case "view":
      return QueryType.GET;
    default:
      return QueryType.UPDATE;
  }
};

export function ActionProperties({
  action,
  columns,
  onChange,
}: {
  action: TableActionProperty;
  columns: Column[];
  onChange: (action: TableActionProperty) => void;
}) {
  const { label, query, parameters } = action;

  return (
    <div className="flex flex-col w-full gap-y-2">
      <Input
        label="Label"
        labelPlacement="outside"
        placeholder="Set action label"
        value={label}
        onValueChange={(newValue) => {
          onChange({
            ...action,
            label: newValue,
          });
        }}
      />
      <QuerySelection
        selectedQueryId={query?.queryId || ""}
        onQuerySelect={(query) => {
          onChange({
            ...action,
            query: queryToRestQueryData(query),
            parameters: query.metadata.parameters?.map(
              (p: { name: string; preview: string }) => ({
                name: p.name,
                columnKey: "",
                value: p.preview,
              }),
            ),
          });
        }}
        type={actionToQueryType(action)}
      />
      {parameters?.length > 0 && (
        <div className="flex justify-between">
          <h1 className="text-small">Parameters</h1>
          <Tooltip
            content={
              <div>
                If no column is selected for a parameter we use{" "}
                <Code className={"text-xs"}>{"preview value"}</Code> setting on
                queries editor.
              </div>
            }
            className={"p-3 w-[275px] -translate-x-[35px] text-xs"}
            placement={"bottom"}
            offset={10}
            closeDelay={0}
          >
            <div>
              <RiQuestionLine className={"text-foreground-500"} size={15} />
            </div>
          </Tooltip>
        </div>
      )}
      <div className="flex flex-col gap-2 px-2 w-full">
        {parameters?.map((parameter, index) => (
          <div className="flex flex-row items-center justify-between gap-x-2">
            <h2 className="w-full text-sm">{parameter.name}</h2>
            <Select
              items={columns}
              placeholder="Select column"
              selectedKeys={[parameter.columnKey]}
              onSelectionChange={(key) => {
                const columnKey = key.currentKey as string;
                const newParameters = parameters.map((p) => {
                  if (p.name === parameter.name) {
                    return {
                      ...p,
                      columnKey: columnKey,
                    };
                  }
                  return p;
                });
                onChange({
                  ...action,
                  parameters: newParameters,
                });
              }}
            >
              {(column) => (
                <SelectItem key={column.key} value={column.key}>
                  {column.label}
                </SelectItem>
              )}
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}
