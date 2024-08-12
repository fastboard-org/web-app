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
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import DeleteActionModal from "../shared/DeleteActionModal";
import useData from "@/hooks/useData";
import { toast } from "sonner";
import { useRecoilState } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";
import { ComponentId, ComponentType } from "@/types/editor";
import ViewActionModal from "../shared/ViewActionModal";
import { InvalidateQueryFilters } from "@tanstack/react-query";
import { Edit, Eye, Trash } from "iconsax-react";
import useDashboard from "@/hooks/dashboards/useDashboard";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import AddRowForm from "./AddRowForm";

function getFinalColumns(
  columns: TableColumnProperties[],
  actions: { key: string; label: string }[]
) {
  if (columns.length === 0) {
    return [{ key: "empty-data", label: "" }];
  }
  const finalColumns = columns
    .filter((column) => column.visible)
    .map((column) => column.column);

  if (actions.length > 0) {
    finalColumns.push({ key: "actions", label: "Actions" });
  }
  return finalColumns;
}

export default function FastboardTable({
  id,
  properties,
}: {
  id: ComponentId;
  properties: FastboardTableProperties;
}) {
  const { updateComponentProperties } = useDashboard();
  const {
    sourceQuery,
    emptyMessage,
    columns,
    actions,
    addOns: { addRowForm },
    hideHeader,
    isStriped,
    rowsPerPage,
  } = properties;
  const {
    data,
    keys,
    page,
    setPage,
    pages,
    isFetching: dataFetching,
    isError: isDataError,
    error: dataError,
  } = useData(`${ComponentType.Table}-${id}`, sourceQuery, rowsPerPage);
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
  } = useExecuteQuery({});
  const finalColumns = getFinalColumns(columns, actions);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRowAction, setSelectedRowAction] = useState<{
    action: TableActionProperty;
    item: any;
  } | null>(null);

  useEffect(() => {
    if (!sourceQuery) {
      return;
    }

    if (columns.length === 0) {
      setShouldUpdateColumns(true);
    }
  }, [sourceQuery]);

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
      query: selectedRowAction.action.query,
      parameters: fillParameters(
        selectedRowAction.action.parameters,
        selectedRowAction.item
      ),
      invalidateQueries,
    });
  }

  const renderCell = (item: any, columnKey: string) => {
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
    return getKeyValue(item, columnKey);
  };

  function fillParameters(
    parameters: { name: string; value: string }[],
    item: any
  ) {
    //TODO: fix this in backend
    if (!parameters) {
      return {};
    }

    const filledParams = parameters.map((parameter) => {
      const regex = /^{{row\.(\w+)}}$/;
      const match = parameter.value.match(regex);
      if (!match) {
        return parameter;
      }

      //Get column key from column label
      const columnKey =
        columns.find(
          (column) =>
            column.column.label.toLowerCase() === match[1].toLowerCase()
        )?.column.key ?? "";

      const value = getKeyValue(item, columnKey);
      return {
        ...parameter,
        value,
      };
    });
    return filledParams.reduce((acc, parameter) => {
      return { ...acc, [parameter.name]: parameter.value };
    }, {});
  }

  return (
    <CustomSkeleton
      isLoaded={!dataFetching}
      onlyRenderOnLoad
      className="w-full h-full"
    >
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

      <Table
        aria-label="Fastboard table component"
        className="grow-0 h-full "
        classNames={{
          thead: "-z-10",
          wrapper: `${scrollbarStyles.scrollbar}`,
        }}
        hideHeader={hideHeader}
        isStriped={isStriped}
        topContent={addRowForm && <AddRowForm properties={addRowForm} />}
        topContentPlacement="outside"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        bottomContentPlacement="outside"
      >
        <TableHeader columns={finalColumns}>
          {(column) => (
            <TableColumn className="text-center" key={column.key}>
              {column.label.toUpperCase()}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={dataFetching}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={emptyMessage}
        >
          {data.map((item) => (
            <TableRow key={item.key} className="text-center">
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey as string)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomSkeleton>
  );
}