import CustomSkeleton from "@/components/shared/CustomSkeleton";
import usePaginatedData from "@/hooks/usePaginatedData";
import {
  Card,
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

export class FastboardTableProperties {
  query: { url: string; field: string | null } = {
    url: "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
    field: "results",
  };
  rowsPerPage: number = 10;
  emptyMessage: string = "No rows to display.";
  hideHeader: boolean = false;
  isStriped: boolean = false;

  static default(): FastboardTableProperties {
    return new FastboardTableProperties();
  }
}

export default function FastboardTable({
  properties,
}: {
  properties: FastboardTableProperties;
}) {
  const { query, emptyMessage, hideHeader, isStriped, rowsPerPage } =
    properties;
  const { keys, items, isLoading, error, page, setPage, pages, updateQuery } =
    usePaginatedData(rowsPerPage);

  console.log(properties);
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

  return (
    <CustomSkeleton
      isLoaded={!isLoading}
      onlyRenderOnLoad
      className="w-full h-full"
    >
      <Table
        isHeaderSticky
        classNames={{
          thead: "-z-10",
        }}
        hideHeader={hideHeader}
        isStriped={isStriped}
        aria-label="Example table with dynamic content"
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
        <TableHeader columns={keys}>
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
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CustomSkeleton>
  );
}
