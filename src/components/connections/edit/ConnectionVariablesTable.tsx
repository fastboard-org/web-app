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
import { useState } from "react";

const ConnectionVariablesTable = ({
  entries,
  setEntries,
}: {
  entries: [string, string][];
  setEntries: (entries: [string, string][]) => void;
}) => {
  const [newEntries, setNewEntries] = useState<[string, string][]>([
    ...entries,
    ["", ""],
  ]);

  const isDuplicate = (name: string, index: number) => {
    return newEntries.some(([key], i) => key === name && i !== index);
  };
  const isInvalid = (name: string, value: string, index: number) =>
    name === "" || isDuplicate(name, index) || value === "";

  return (
    <Table
      aria-label="Variables table"
      removeWrapper
      className={"overflow-y-auto max-h-[180px] pr-2"}
    >
      <TableHeader>
        <TableColumn>Key</TableColumn>
        <TableColumn>Value</TableColumn>
        <TableColumn>
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody>
        {newEntries.map(([key, value], index) => {
          const isLast = index === newEntries.length - 1;
          const buttonDisabled = isLast && isInvalid(key, value, index);
          const isError = isDuplicate(key, index);
          const onButtonClick = () => {
            if (isLast) {
              setEntries(newEntries);
              setNewEntries([...newEntries, ["", ""]]);
            } else {
              setNewEntries(newEntries.filter((_, i) => i !== index));
              setEntries(entries.filter((_, i) => i !== index));
            }
          };

          return (
            <TableRow key={index}>
              <TableCell className={"p-0"}>
                <Input
                  value={key}
                  placeholder={"variable_name"}
                  onChange={(e) => {
                    const updatedEntries = [...newEntries];
                    updatedEntries[index] = [
                      e.target.value,
                      newEntries[index][1],
                    ];
                    setNewEntries(updatedEntries);
                    setEntries(updatedEntries.slice(0, -1));
                  }}
                  color={isError ? "danger" : "default"}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={value}
                  placeholder={"variable_value"}
                  onChange={(e) => {
                    const updatedEntries = [...newEntries];
                    updatedEntries[index] = [
                      newEntries[index][0],
                      e.target.value,
                    ];
                    setNewEntries(updatedEntries);
                    setEntries(updatedEntries.slice(0, -1));
                  }}
                />
              </TableCell>
              <TableCell className={"p-0"}>
                <Button
                  isIconOnly
                  color={isLast ? "primary" : "danger"}
                  variant={isLast ? "solid" : "flat"}
                  onClick={onButtonClick}
                  isDisabled={buttonDisabled}
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

export default ConnectionVariablesTable;
