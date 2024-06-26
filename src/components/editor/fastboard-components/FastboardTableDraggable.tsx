import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FastboardTableProperties } from "./FastboardTable";
import { ComponentType } from "@/types/editor";
import Draggable from "./Draggable";

export default function FastboardTableDraggable() {
  return (
    <div className="flex flex-col justify-center">
      <h4 className={"text-md pb-2"}>Table</h4>
      <Draggable
        id="table-draggable"
        data={{
          type: ComponentType.Table,
          defaultProperties: FastboardTableProperties.default(),
        }}
        dragSnapToOrigin
      >
        <Table
          fullWidth
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
      </Draggable>
    </div>
  );
}
