import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Draggable from "./Draggeable";

interface DraggableTableProps {
  onDrop: (tableElement: Object) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

export default function FastboardTableDraggeable({
  onDragStart,
  onDragEnd,
  onDrop,
}: DraggableTableProps) {
  return (
    <>
      <h4 className={"text-lg font-semibold p-5 pb-2 w-full"}>Table</h4>
      <Draggable
        onDrop={(overlappedElements) => {
          console.log(overlappedElements);
          onDrop({
            type: "table",
            w: "full",
            h: overlappedElements.length > 1 ? "full" : "1/2",
          });
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Table aria-label={"Table draggeable"}>
          <TableHeader>
            <TableColumn>key</TableColumn>
            <TableColumn>key</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>value</TableCell>
              <TableCell>value</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Draggable>
    </>
  );
}
