import {
  Column,
  FilterProperties,
  FilterType,
  StringFilterProperties,
  TableColumnProperties,
} from "@/types/editor/table-types";
import { getKeyValue } from "@nextui-org/react";
import { Row, SortingFn } from "@tanstack/react-table";

export function getFinalColumns(
  columns: TableColumnProperties[],
  actions: { key: string; label: string }[]
) {
  if (columns.length === 0) {
    return [{ key: "empty-data", label: "" }];
  }
  const finalColumns = columns.map((column) => column.column);

  if (actions.length > 0) {
    finalColumns.push({ key: "actions", label: "Actions" });
  }
  return finalColumns;
}

export const sortFunction: SortingFn<any> = (
  rowA: Row<any>,
  rowB: Row<any>,
  columnId: string
) => {
  const a = rowA.original[columnId];
  const b = rowB.original[columnId];

  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }
  if (typeof a === "boolean" && typeof b === "boolean") {
    return a === b ? 0 : a ? 1 : -1;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }
  return 0;
};

export function getExportData(
  fulldata: any[],
  columns: TableColumnProperties[]
) {
  return fulldata.map((row) => {
    return Object.keys(row).reduce((acc, key) => {
      if (columns.find((c) => c.column.key === key && c.visible)) {
        return { ...acc, [key]: row[key] };
      }
      return acc;
    }, {});
  });
}

export function fillParameters(
  parameters: { name: string; value: string }[],
  columns: TableColumnProperties[],
  item: any
) {
  //TODO: fix this in backend
  if (!parameters) {
    return {};
  }

  const filledParams = parameters.map((parameter) => {
    const regex = /^{{row\.(\w+)}}$/;
    const match = parameter.value.match(regex);
    if (!match) {
      return parameter;
    }

    //Get column key from column label
    const columnKey =
      columns.find(
        (column) => column.column.label.toLowerCase() === match[1].toLowerCase()
      )?.column.key ?? "";

    const value = getKeyValue(item, columnKey);
    return {
      ...parameter,
      value,
    };
  });
  return filledParams.reduce((acc, parameter) => {
    return { ...acc, [parameter.name]: parameter.value };
  }, {});
}

export function getFilterFunction(
  columnKey: string,
  filters: FilterProperties[]
) {
  const filter = filters.find((filter) => filter.columnKey === columnKey);
  if (!filter) {
    return (row: Row<any>, columnId: string, filterValue: any) => true;
  }
  switch (filter.type) {
    case FilterType.StringFilter:
      const stringFilter = filter as StringFilterProperties;
      if (stringFilter.exactMatch) {
        return stringFilter.caseSensitive
          ? equalsStringSensitive
          : equalsString;
      }
      return stringFilter.caseSensitive
        ? includesStringSensitive
        : includesString;
    case FilterType.NumberFilter:
      return inRange;
    default:
      return (row: Row<any>, columnId: string, filterValue: any) => true;
  }
}

function includesString(row: Row<any>, columnId: string, filterValue: string) {
  const value = row.original[columnId] as string;
  return value.toLowerCase().includes(filterValue.toLowerCase());
}

function includesStringSensitive(
  row: Row<any>,
  columnId: string,
  filterValue: string
) {
  const value = row.original[columnId] as string;
  return value.includes(filterValue);
}

function equalsString(row: Row<any>, columnId: string, filterValue: string) {
  const value = row.original[columnId] as string;
  return value.toLowerCase() === filterValue.toLowerCase();
}

function equalsStringSensitive(
  row: Row<any>,
  columnId: string,
  filterValue: any
) {
  return row.original[columnId] === filterValue;
}

function inRange(
  row: Row<any>,
  columnId: string,
  filterValue: [number | "" | undefined, number | "" | undefined]
) {
  const value = row.original[columnId] as number;
  const min =
    filterValue[0] !== undefined && filterValue[0] !== ""
      ? filterValue[0]
      : Number.MIN_VALUE;
  const max =
    filterValue[1] !== undefined && filterValue[1] !== ""
      ? filterValue[1]
      : Number.MAX_VALUE;

  return value >= min && value <= max;
}
