import CustomSkeleton from "@/components/shared/CustomSkeleton";
import useExecuteQuery from "@/hooks/adapter/useExecuteQuery";
import {
  FastboardTableProperties,
  TableActionProperty,
  TableColumnProperties,
} from "@/types/editor/table-types";
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  SortDescriptor,
  Spacer,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  semanticColors,
} from "@nextui-org/react";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { IoIosMore } from "react-icons/io";
import DeleteActionModal from "../shared/DeleteActionModal";
import useData from "@/hooks/useData";
import { toast } from "sonner";
import { useRecoilState } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";
import { ComponentId, ComponentType } from "@/types/editor";
import ViewActionModal from "../shared/ViewActionModal";
import { InvalidateQueryFilters } from "@tanstack/react-query";
import { ArrowDown2, ArrowUp2, Edit, Eye, Trash } from "iconsax-react";
import useDashboard from "@/hooks/dashboards/useDashboard";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import AddRowForm from "./AddRowForm";
import { useParams } from "next/navigation";
import useModalFrame from "@/hooks/editor/useModalFrame";
import { useTheme } from "next-themes";
import CsvExporter from "@/components/shared/CsvExporter";
import {
  Cell,
  Column,
  ColumnDef,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Header,
  Row,
  SortingFn,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { HTTP_METHOD } from "@/types/connections";
import {
  fillParameters,
  getExportData,
  getFinalColumns,
  sortFunction,
} from "@/lib/table.utils";

export default function FastboardTable({
  id,
  properties,
}: {
  id: ComponentId;
  properties: FastboardTableProperties;
}) {
  const { theme } = useTheme();
  const { id: dashboardId } = useParams();
  const { updateComponentProperties } = useDashboard();
  const { openModal } = useModalFrame();
  const {
    sourceQueryData,
    emptyMessage,
    columns,
    actions,
    pinActions,
    addOns: { addRowForm, downloadData },
    hideHeader,
    headerSticky,
    isStriped,
    rowsPerPage,
    headerColor,
    headerTextColor,
  } = properties;
  const {
    data,
    fulldata,
    keys,
    page,
    setPage,
    pages,
    isFetching: dataFetching,
    isError: isDataError,
    error: dataError,
  } = useData(`${ComponentType.Table}-${id}`, sourceQueryData, rowsPerPage);
  const [shouldUpdateColumns, setShouldUpdateColumns] = useState(false);
  const [propertiesState, setPropertiesState] = useRecoilState(
    propertiesDrawerState
  );
  const {
    execute,
    reset,
    data: executeData,
    isPending: actionLoading,
    isSuccess: isExecuteQuerySuccess,
    isError: isExecuteQueryError,
    error: executeQueryError,
  } = useExecuteQuery({
    dashboardId: dashboardId as string,
  });
  const finalColumns = getFinalColumns(columns, actions);
  const exportData = useMemo(() => {
    return getExportData(fulldata, finalColumns);
  }, [finalColumns]);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRowAction, setSelectedRowAction] = useState<{
    action: TableActionProperty;
    item: any;
  } | null>(null);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns: finalColumns.map((c) => ({
      accessorKey: c.key,
      id: c.key,
      header: c.label,
      enableSorting: c.key !== "actions",
      footer: (props) => props.column.id,
      cell: ({ cell, row }) => {
        return renderCell(cell, row);
      },
      sortingFn: sortFunction,
    })),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnPinning,
      sorting,
    },
    onColumnPinningChange: setColumnPinning,
    onSortingChange: setSorting,
  });

  useEffect(() => {
    if (pinActions) {
      setColumnPinning({
        right: ["actions"],
      });
    } else {
      setColumnPinning({
        right: [],
      });
    }
  }, [pinActions]);

  useEffect(() => {
    if (!sourceQueryData) {
      return;
    }

    if (columns.length === 0) {
      setPage(1);
      setShouldUpdateColumns(true);
    }
  }, [sourceQueryData]);

  useEffect(() => {
    if (!shouldUpdateColumns) {
      return;
    }

    updateComponentProperties(id, {
      ...properties,
      columns: keys.map((key) => {
        return {
          column: { key, label: key },
          visible: true,
        };
      }),
    });
    setPropertiesState((previous) => {
      if (previous.selectedComponentId !== id) {
        return previous;
      }
      return {
        ...previous,
        properties: {
          ...previous.properties,
          columns: keys.map((key) => {
            return {
              column: { key, label: key },
              visible: true,
            };
          }),
        },
      };
    });
    setShouldUpdateColumns(false);
  }, [keys]);

  useEffect(() => {
    if (isDataError) {
      toast.error("Failed loading data", {
        description: dataError?.message,
      });
    }
    if (isExecuteQueryError) {
      toast.error("Failed executing action", {
        description: executeQueryError?.message,
      });
      setViewModalOpen(false);
    }
  }, [isDataError, isExecuteQueryError]);

  useEffect(() => {
    if (isExecuteQuerySuccess) {
      toast.success("Action executed successfully");
    }
  }, [isExecuteQuerySuccess]);

  if (isDataError) {
    return (
      <Card className="flex flex-col w-full h-full p-5 justify-center items-center">
        <p className="text-xl text-danger">Failed loading data</p>
      </Card>
    );
  }

  if (!dataFetching && finalColumns.length === 0) {
    return (
      <Card className="flex flex-col w-full h-full p-5 justify-center items-center">
        <p className="text-xl text-danger">No columns selected</p>
      </Card>
    );
  }

  function executeAction(
    selectedRowAction: {
      action: TableActionProperty;
      item: any;
    } | null,
    invalidateQueries?: InvalidateQueryFilters
  ) {
    if (!selectedRowAction) {
      return;
    }
    if (!selectedRowAction.action.query) {
      toast.warning("No query found for this action");
      return;
    }
    reset();
    execute({
      //TODO: change selectedRowAction.action to type RestQueryData
      queryData: {
        queryId: selectedRowAction.action.query.id,
        connectionId: selectedRowAction.action.query.connection_id,
        method: selectedRowAction.action.query.metadata.method as HTTP_METHOD,
      },
      parameters: fillParameters(
        selectedRowAction.action.parameters,
        columns,
        selectedRowAction.item
      ),
      invalidateQueries,
    });
  }

  const renderHeader = (header: Header<any, unknown>) => {
    const canSort = header.column.getCanSort();
    const isSorted = header.column.getIsSorted();

    return (
      <div
        className={
          "flex flex-row items-center justify-center gap-x-2 whitespace-nowrap  " +
          (canSort ? "cursor-pointer select-none" : " ")
        }
        onClick={header.column.getToggleSortingHandler()}
      >
        {header.isPlaceholder
          ? null
          : flexRender(
              header.column.columnDef.header?.toString().toUpperCase(),
              header.getContext()
            )}

        {isSorted && (
          <div>
            {isSorted === "asc" ? (
              <ArrowUp2 size={15} />
            ) : (
              <ArrowDown2 size={15} />
            )}
          </div>
        )}
      </div>
    );
  };

  const renderCell = (cell: Cell<any, any>, row: Row<any>) => {
    const columnKey = cell.column.id;
    const item = row.original;

    if (columnKey === "actions") {
      return (
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <IoIosMore size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            {actions.map((action) => (
              <DropdownItem
                key={action.key}
                startContent={
                  (action.type === "view" && <Eye size={15} />) ||
                  (action.type === "edit" && <Edit size={15} />) ||
                  (action.type === "delete" && <Trash size={15} />)
                }
                onPress={() => {
                  setSelectedRowAction({ action, item });
                  if (action.type === "view") {
                    executeAction({ action, item });
                    setViewModalOpen(action.query ? true : false);
                  } else if (action.type === "delete") {
                    setDeleteModalOpen(true);
                  } else if (action.type === "edit") {
                    updateComponentProperties(id, {
                      ...properties,
                      selectedRow: item,
                    });
                    openModal(action.modalId ?? "");
                  }
                }}
              >
                {action.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      );
    }
    return item[columnKey];
  };

  const getCommonPinningStyles = (
    column: Column<any>,
    isStriped: boolean = false
  ): CSSProperties => {
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn =
      isPinned === "left" && column.getIsLastColumn("left");
    const isFirstRightPinnedColumn =
      isPinned === "right" && column.getIsFirstColumn("right");

    return {
      boxShadow: isLastLeftPinnedColumn
        ? "-2px 0 2px -2px gray inset"
        : isFirstRightPinnedColumn
        ? "2px 0 2px -2px gray inset"
        : undefined,
      backgroundColor:
        isPinned && !isStriped
          ? theme === "light"
            ? // @ts-ignore
              semanticColors.light.background.DEFAULT // @ts-ignore
            : semanticColors.dark.content1.DEFAULT
          : undefined,
      left:
        isPinned === "left" ? `${column.getStart("left") - 21}px` : undefined,
      right:
        isPinned === "right" ? `${column.getAfter("right") - 21}px` : undefined,
      position: isPinned ? "sticky" : "relative",
      zIndex: isPinned ? 1 : 0,
    };
  };

  function TopContent() {
    return addRowForm && <AddRowForm properties={addRowForm} />;
  }

  function BottomContent() {
    return (
      <div className="flex w-full justify-center items-center gap-2">
        <Pagination
          isCompact
          showControls
          showShadow
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
        {downloadData && <CsvExporter data={exportData} />}
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {selectedRowAction && (
        <ViewActionModal
          isOpen={viewModalOpen}
          isLoading={actionLoading}
          data={executeData?.body}
          onClose={() => {
            setViewModalOpen(false);
          }}
        />
      )}

      {selectedRowAction && (
        <DeleteActionModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
          }}
          onConfirm={async () => {
            executeAction(selectedRowAction);
          }}
        />
      )}

      <div className="flex flex-col w-full h-full gap-y-2">
        <TopContent />
        <div
          className={
            "flex flex-col gap-y-2 w-full max-h-[80%] grow-0 p-5 overflow-auto shadow-lg rounded-large dark:bg-content1 border dark:border-content1  " +
            scrollbarStyles.scrollbar
          }
        >
          <table className="table-auto">
            {!hideHeader && (
              <thead
                style={{
                  height: "40px",
                }}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const { column } = header;

                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className="p-2 text-xs font-semibold"
                          style={{
                            ...getCommonPinningStyles(column),
                            backgroundColor:
                              theme === "light"
                                ? headerColor.light
                                : headerColor.dark,
                            color:
                              theme === "light"
                                ? headerTextColor.light
                                : headerTextColor.dark,
                            borderTopRightRadius: column.getIsLastColumn()
                              ? "10px"
                              : undefined,
                            borderBottomRightRadius: column.getIsLastColumn()
                              ? "10px"
                              : undefined,
                            borderTopLeftRadius: column.getIsFirstColumn()
                              ? "10px"
                              : undefined,
                            borderBottomLeftRadius: column.getIsFirstColumn()
                              ? "10px"
                              : undefined,
                          }}
                        >
                          {renderHeader(header)}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
            )}

            <tbody className="h-full relative">
              {!dataFetching &&
                table.getRowModel().rows.map((row, index) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const { column } = cell;
                      const bgColor = !isStriped
                        ? ""
                        : index % 2
                        ? "bg-content2"
                        : "bg-background dark:bg-content1 ";
                      return (
                        <td
                          key={cell.id}
                          className={"p-2 text-center text-xs " + bgColor}
                          style={{
                            ...getCommonPinningStyles(column, isStriped),
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
          {!dataFetching && table.getRowModel().rows.length === 0 && (
            <div
              className="flex items-center justify-center"
              style={{
                height: "200px",
              }}
            >
              <h1 className="text-center text-md text-default-400">
                {emptyMessage}
              </h1>
            </div>
          )}
          {dataFetching && (
            <div className="flex items-center justify-center w-full z-50 min-h-28">
              <Spinner />
            </div>
          )}
        </div>
        <BottomContent />
      </div>
    </div>
  );
}
