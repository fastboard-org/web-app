import { isComponentsDrawerOpen, isPropertiesDrawerOpen } from "@/atoms/editor";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import usePaginatedData from "@/hooks/usePaginatedData";
import {
  Card,
  Pagination,
  Spacer,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useSetRecoilState } from "recoil";

export class FastboardTableProperties {
  query: Object;
  hideHeader: boolean;
  isStriped: boolean;

  constructor(query: Object, hideHeader: boolean, isStriped: boolean) {
    this.query = query;
    this.hideHeader = hideHeader;
    this.isStriped = isStriped;
  }

  static default(): FastboardTableProperties {
    return {
      query: {
        url: "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
        field: "results",
      },
      hideHeader: false,
      isStriped: false,
    };
  }
}

interface FastboardTableProps {
  properties: FastboardTableProperties;
  onClick: () => void;
}

export default function FastboardTable(props: FastboardTableProps) {
  const setIsComponentsDrawerOpen = useSetRecoilState(isComponentsDrawerOpen);
  const setIsPropertiesDrawerOpen = useSetRecoilState(isPropertiesDrawerOpen);
  const { query, hideHeader, isStriped } = props.properties;
  const { keys, items, isLoading, error, page, setPage, pages, updateQuery } =
    usePaginatedData(query.url, query.field, 4);

  updateQuery(query.url, query.field);

  if (error) {
    return (
      <Card className="flex flex-col w-full h-[30%] p-5 justify-center items-center">
        <h1 className="text-xl text-danger">Failed loading data</h1>
      </Card>
    );
  }

  return (
    <>
      {isLoading ? (
        <Card className="flex flex-col w-full h-[30%] p-5">
          <div className="flex flex-row">
            <CustomSkeleton className="w-full rounded-lg">
              <Spinner />
            </CustomSkeleton>
            <Spacer x={2} />
            <CustomSkeleton className="w-full rounded-lg">
              <Spinner />
            </CustomSkeleton>
          </div>
          <Spacer y={2} />
          <CustomSkeleton className="w-full h-full rounded-lg">
            <Spinner />
          </CustomSkeleton>
        </Card>
      ) : (
        <Table
          isHeaderSticky
          classNames={{
            thead: "-z-10",
          }}
          hideHeader={hideHeader}
          isStriped={isStriped}
          aria-label="Example table with dynamic content"
          onClick={(e) => {
            e.preventDefault();
            setIsComponentsDrawerOpen(false);
            setIsPropertiesDrawerOpen(true);
            props.onClick();
          }}
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
      )}
    </>
  );
}
