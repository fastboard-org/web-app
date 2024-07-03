import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Add, Trash } from "iconsax-react";
import { RestHeader } from "@/types/connections";
import scrollBarStyles from "@/styles/scrollbar.module.css";

const HeadersTable = ({
  headers,
  onChange,
}: {
  headers: RestHeader[];
  onChange: (headers: RestHeader[]) => void;
}) => {
  return (
    <Table
      aria-label="Variables table"
      removeWrapper
      className={"overflow-y-auto h-[100%] pr-2 " + scrollBarStyles.scrollbar}
    >
      <TableHeader>
        <TableColumn>Key</TableColumn>
        <TableColumn>Value</TableColumn>
        <TableColumn>
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody>
        {headers.map(({ key, value }, index) => {
          const isLast = index === headers.length - 1;
          return (
            <TableRow key={index}>
              <TableCell className={"p-0 w-1/2"}>
                <Input
                  value={key}
                  placeholder={"header_key"}
                  onChange={(e) => {
                    const newHeaders = headers.map((header, i) => {
                      if (i === index) {
                        return { ...header, key: e.target.value };
                      }
                      return header;
                    });
                    onChange(newHeaders);
                  }}
                />
              </TableCell>
              <TableCell className={"w-1/2"}>
                <Input
                  value={value}
                  placeholder={"header_value"}
                  onChange={(e) => {
                    const newHeaders = headers.map((header, i) => {
                      if (i === index) {
                        return { ...header, value: e.target.value };
                      }
                      return header;
                    });
                    onChange(newHeaders);
                  }}
                />
              </TableCell>
              <TableCell className={"p-0"}>
                <Button
                  isIconOnly
                  onClick={() => {
                    if (isLast) {
                      onChange([...headers, { key: "", value: "" }]);
                    } else {
                      onChange(headers.filter((_, i) => i !== index));
                    }
                  }}
                >
                  {isLast ? <Add size={20} /> : <Trash size={20} />}
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default HeadersTable;
