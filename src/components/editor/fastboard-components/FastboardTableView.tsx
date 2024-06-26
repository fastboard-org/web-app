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
import { FastboardTableProperties } from "./FastboardTable";

const FastboardTableView = ({
  properties,
}: {
  properties: FastboardTableProperties;
}) => {
  const { query, hideHeader, isStriped } = properties;
  const { keys, items, isLoading, error, page, setPage, pages, updateQuery } =
    usePaginatedData(4);

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
    <CustomSkeleton isLoaded={!isLoading} onlyRenderOnLoad className="w-full">
      <Table
        isHeaderSticky
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
          emptyContent={"No rows to display."}
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
      <h1>test</h1>
    </CustomSkeleton>
  );
};

export default FastboardTableView;
