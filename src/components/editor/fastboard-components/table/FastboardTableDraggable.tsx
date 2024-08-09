import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ComponentType } from "@/types/editor";
import { FastboardTableProperties } from "@/types/editor/table-types";
import Draggable from "../Draggable";

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
            <TableColumn key={1}>key</TableColumn>
            <TableColumn key={2}>key</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell key={1}>value</TableCell>
              <TableCell key={2}>value</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Draggable>
    </div>
  );
}
