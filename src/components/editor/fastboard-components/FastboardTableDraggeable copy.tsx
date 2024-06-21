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
import { ComponentType } from "@/types/editor";

export default function FastboardTableDraggeable2() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "table2-draggable",
    data: {
      type: ComponentType.Table,
      defaultProperties: { hideHeader: true, isStripped: false },
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div className="flex flex-col justify-center items-center">
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <Table hideHeader aria-label={"Table draggeable"}>
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
      <h4 className={"text-md pt-2"}>Table</h4>
    </div>
  );
}
