import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useDraggable } from "@dnd-kit/core";
import { FastboardTableProperties } from "./FastboardTable";
import { ComponentType } from "@/types/editor";

export default function FastboardTableDraggeable() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "table-draggable",
    data: {
      type: ComponentType.Table,
      defaultProperties: FastboardTableProperties.default(),
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <>
      <h4 className={"text-lg font-semibold p-5 pb-2 w-full"}>Table</h4>
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
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
      </div>
    </>
  );
}
