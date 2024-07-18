import CustomSkeleton from "@/components/shared/CustomSkeleton";
import useExecuteQuery from "@/hooks/useExecuteQuery";
import usePaginatedData from "@/hooks/usePaginatedData";
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
import DeleteActionModal from "./shared/DeleteActionModal";
import useData from "@/hooks/useData";

function getFinalColumns(
  columns: TableColumnProperties[],
  actions: { key: string; label: string }[]
) {
  const finalColumns = columns
    .filter((column) => column.visible)
    .map((column) => column.column);
  if (actions.length > 0) {
    finalColumns.push({ key: "actions", label: "Actions" });
  }
  return finalColumns;
}

export default function FastboardTable({
  properties,
}: {
  properties: FastboardTableProperties;
}) {
  const {
    query,
    sourceQuery,
    emptyMessage,
    columns,
    actions,
    hideHeader,
    isStriped,
    rowsPerPage,
  } = properties;
  const { items, isLoading, error, page, setPage, pages, updateQuery } =
    usePaginatedData(rowsPerPage);
  useData(sourceQuery);
  const { executeQuery, data } = useExecuteQuery();
  const finalColumns = getFinalColumns(columns, actions);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRowAction, setSelectedRowAction] = useState<{
    action: TableActionProperty;
    item: any;
  } | null>(null);

  useEffect(() => {
    updateQuery(query.url, query.field);
  }, [query?.url, query?.field]);

  if (error) {
    return (
      <Card className="flex flex-col w-full h-[30%] p-5 justify-center items-center">
        <p className="text-xl text-danger">Failed loading data</p>
      </Card>
    );
  }

  if (finalColumns.length === 0) {
    return (
      <Card className="flex flex-col w-full h-full p-5 justify-center items-center">
        {" "}
        <p className="text-xl text-danger">No columns selected</p>
      </Card>
    );
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
                onPress={() => {
                  setSelectedRowAction({ action, item });
                  setDeleteModalOpen(true);
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

  return (
    <CustomSkeleton
      isLoaded={!isLoading}
      onlyRenderOnLoad
      className="w-full h-full"
    >
      <DeleteActionModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={() => {
          console.log(selectedRowAction);
          if (selectedRowAction) {
            executeQuery(selectedRowAction.action.query);
          }
        }}
      />
      <Table
        aria-label="Fastboard table component"
        isHeaderSticky
        classNames={{
          thead: "-z-10",
        }}
        hideHeader={hideHeader}
        isStriped={isStriped}
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
            <TableColumn key={column.key}>
              {column.label.toUpperCase()}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          items={items}
          emptyContent={emptyMessage}
        >
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey as string)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CustomSkeleton>
  );
}
