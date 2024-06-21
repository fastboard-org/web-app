import { isComponentsDrawerOpen, isPropertiesDrawerOpen } from "@/atoms/editor";
import {
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

  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  return (
    <Table
      isHeaderSticky
      classNames={{
        thead: "-z-10",
        table: "cursor-pointer",
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
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
