import {
  Button,
  Code,
  Input,
  Select,
  SelectItem,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import { RiQuestionLine } from "react-icons/ri";
import { Column, TableActionProperty } from "@/types/editor/table-types";
import QuerySelection from "@/components/editor/QuerySelection";
import { queryToRestQueryData } from "@/lib/rest-queries";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { Add } from "iconsax-react";
import useNavigation from "@/hooks/useNavigation";
import { IoIosClose } from "react-icons/io";

export function ViewActionProperties({
  action,
  columns,
  onChange,
}: {
  action: TableActionProperty;
  columns: Column[];
  onChange: (action: TableActionProperty) => void;
}) {
  const { label, mode, query, parameters, pageId, queryStrings } = action;
  const { addPage } = useDashboard();
  const { changePage } = useNavigation();

  function createViewPage() {
    const pageId = addPage();
    if (!pageId) return;

    onChange({
      ...action,
      pageId: pageId,
    });
  }

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

      <Tabs
        selectedKey={mode ?? "modal"}
        onSelectionChange={(key) => {
          onChange({
            ...action,
            mode: key.toString() as "modal" | "page",
          });
        }}
      >
        <Tab key="modal" title="Modal">
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
                    If no column is selected for a parameter we use{" "}
                    <Code className={"text-xs"}>{"preview value"}</Code> setting
                    on queries editor.
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
        </Tab>

        <Tab key="page" title="Page">
          {!pageId && <Button onPress={createViewPage}>Create new page</Button>}
          {pageId && (
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-end w-full">
                <Button
                  startContent={<Add size={20} />}
                  variant={"flat"}
                  onPress={() => {
                    onChange({
                      ...action,
                      queryStrings: queryStrings
                        ? [
                            ...queryStrings,
                            {
                              name: "",
                              columnKey: "",
                            },
                          ]
                        : [{ name: "", columnKey: "" }],
                    });
                  }}
                >
                  Add Query String
                </Button>
              </div>

              {queryStrings?.map((queryString, index) => (
                <div key={index} className="flex flex-row items-center gap-x-2">
                  <Input
                    value={queryString.name}
                    placeholder="Query string name"
                    onValueChange={(value) => {
                      const newQueryStrings = queryStrings.map((qs, i) => {
                        if (i === index) {
                          return {
                            ...qs,
                            name: value,
                          };
                        }
                        return qs;
                      });
                      onChange({
                        ...action,
                        queryStrings: newQueryStrings,
                      });
                    }}
                  />

                  <Select
                    aria-label="Select column"
                    items={columns}
                    placeholder="Select column"
                    selectedKeys={[queryString.columnKey]}
                    onSelectionChange={(key) => {
                      const columnKey = key.currentKey as string;
                      const newQueryStrings = queryStrings.map((qs, i) => {
                        if (i === index) {
                          return {
                            ...qs,
                            columnKey: columnKey,
                          };
                        }
                        return qs;
                      });
                      onChange({
                        ...action,
                        queryStrings: newQueryStrings,
                      });
                    }}
                  >
                    {(column) => (
                      <SelectItem key={column.key} value={column.key}>
                        {column.label}
                      </SelectItem>
                    )}
                  </Select>

                  <Button
                    variant="light"
                    isIconOnly
                    onPress={() => {
                      const newQueryStrings = queryStrings.filter(
                        (_, i) => i !== index
                      );
                      onChange({
                        ...action,
                        queryStrings: newQueryStrings,
                      });
                    }}
                  >
                    <IoIosClose size={20} className="text-foreground-600" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
