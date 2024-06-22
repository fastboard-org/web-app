import { isComponentsDrawerOpen, isPropertiesDrawerOpen } from "@/atoms/editor";
import useData from "@/hooks/useData";
import {
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
import { useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";

export class FastboardTableProperties {
  hideHeader: boolean;
  isStriped: boolean;

  constructor(hideHeader: boolean, isStriped: boolean) {
    this.hideHeader = hideHeader;
    this.isStriped = isStriped;
  }

  static default(): FastboardTableProperties {
    return {
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
  const { hideHeader, isStriped } = props.properties;
  const { keys, isLoading, items, page, setPage, pages } = useData(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
    4
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
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
