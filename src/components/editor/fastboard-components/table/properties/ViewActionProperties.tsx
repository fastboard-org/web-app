import { Code, Input, Tooltip } from "@nextui-org/react";
import { RiQuestionLine } from "react-icons/ri";
import { TableActionProperty } from "@/types/editor/table-types";
import QuerySelection from "@/components/editor/QuerySelection";

export function ViewActionProperties({
  action,
  onChange,
}: {
  action: TableActionProperty;
  onChange: (action: TableActionProperty) => void;
}) {
  const { label, query, parameters } = action;

  return (
    <div className="flex flex-col w-full gap-y-2">
      <Input
        label="Text"
        labelPlacement="outside"
        placeholder="Set action text"
        value={label}
        onValueChange={(newValue) => {
          onChange({
            ...action,
            label: newValue,
          });
        }}
      />
      <QuerySelection
        selectedQueryId={query?.id || ""}
        onQuerySelect={(query) => {
          onChange({
            ...action,
            query: query,
            parameters: query.metadata.parameters?.map(
              (p: { name: string; preview: string }) => ({
                name: p.name,
                value: p.preview,
              })
            ),
          });
        }}
      />
      {parameters?.length > 0 && (
        <div className="flex justify-between">
          <h1 className="text-small">Parameters</h1>
          <Tooltip
            content={
              <div>
                Use <Code className={"text-xs"}>{"{{row.columnName}}"}</Code>{" "}
                syntax to access row values.
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
          <Input
            key={`parameter-${index}`}
            label={parameter.name}
            labelPlacement="outside-left"
            placeholder="Action label"
            value={parameter.value}
            onValueChange={(newValue) => {
              const newParameters = parameters.map((p) =>
                p.name === parameter.name ? { ...p, value: newValue } : p
              );
              onChange({
                ...action,
                parameters: newParameters,
              });
            }}
            fullWidth
          />
        ))}
      </div>
    </div>
  );
}
