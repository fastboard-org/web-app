import { Query } from "../connections";
import { FormProperties } from "./form";

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
  modalId?: string;
}

export interface AddRowFormProperties {
  buttonLabel: string;
  modalId: string;
}

export interface TableAddOnsProperties {
  addRowForm: AddRowFormProperties | null;
}

export class FastboardTableProperties {
  sourceQuery: Query | null = null;
  rowsPerPage: number = 10;
  emptyMessage: string = "No rows to display.";
  columns: TableColumnProperties[] = [];
  actions: TableActionProperty[] = [];
  addOns: TableAddOnsProperties = {
    addRowForm: null,
  };
  hideHeader: boolean = false;
  isStriped: boolean = false;
  selectedRow: any = null;
  headerColor: string = "#000000";

  static default(): FastboardTableProperties {
    return new FastboardTableProperties();
  }
}
