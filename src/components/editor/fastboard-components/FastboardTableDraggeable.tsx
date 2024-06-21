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
import { motion } from "framer-motion";

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
    <div className="flex flex-col justify-center items-center p-5">
      <motion.div
        drag
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        dragSnapToOrigin
      >
        <Table
          aria-label={"Table draggeable"}
          isHeaderSticky
          classNames={{
            thead: "-z-10",
          }}
        >
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
      </motion.div>
      <h4 className={"text-md pt-2"}>Table</h4>
    </div>
  );
}
