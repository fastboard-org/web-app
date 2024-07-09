import CustomSkeleton from "@/components/shared/CustomSkeleton";
import usePaginatedData from "@/hooks/usePaginatedData";
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
import { useEffect } from "react";
import { IoIosMore } from "react-icons/io";
import { TableColumnProperties } from "./ReorderableColumns";

export class FastboardTableProperties {
  query: { id: string; url: string; field: string | null } = {
    id: "1",
    url: "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
    field: "results",
  };
  rowsPerPage: number = 10;
  emptyMessage: string = "No rows to display.";
  columns: TableColumnProperties[] = [
    { column: { key: "name", label: "Name" }, visible: true },
    { column: { key: "url", label: "URL" }, visible: true },
  ];
  actions: { key: string; label: string }[] = [];
  hideHeader: boolean = false;
  isStriped: boolean = false;

  static default(): FastboardTableProperties {
    return new FastboardTableProperties();
  }
}

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
    emptyMessage,
    columns,
    actions,
    hideHeader,
    isStriped,
    rowsPerPage,
  } = properties;
  const { items, isLoading, error, page, setPage, pages, updateQuery } =
    usePaginatedData(rowsPerPage);
  const finalColumns = getFinalColumns(columns, actions);

  useEffect(() => {
    console.log("update query");
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
              <DropdownItem key={action.key}>{action.label}</DropdownItem>
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
