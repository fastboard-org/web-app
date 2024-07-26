import { Query } from "../connections";

export interface Column {
  key: string;
  label: string;
}

export interface TableColumnProperties {
  column: Column;
  visible: boolean;
}

export interface TableActionProperty {
  key: string;
  label: string;
  type: "view" | "edit" | "delete";
  query: Query | null;
  parameters: { name: string; value: string }[];
}

export class FastboardTableProperties {
  sourceQuery: Query | null = null;
  rowsPerPage: number = 10;
  emptyMessage: string = "No rows to display.";
  columns: TableColumnProperties[] = [
    { column: { key: "name", label: "Name" }, visible: true },
    { column: { key: "url", label: "URL" }, visible: true },
  ];
  actions: TableActionProperty[] = [];
  hideHeader: boolean = false;
  isStriped: boolean = false;

  static default(): FastboardTableProperties {
    return new FastboardTableProperties();
  }
}
