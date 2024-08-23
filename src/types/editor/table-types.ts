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
  downloadData: boolean;
}

export class FastboardTableProperties {
  sourceQuery: Query | null = null;
  rowsPerPage: number = 10;
  emptyMessage: string = "No rows to display.";
  columns: TableColumnProperties[] = [];
  actions: TableActionProperty[] = [];
  addOns: TableAddOnsProperties = {
    addRowForm: null,
    downloadData: false,
  };
  selectedRow: any = null;

  hideHeader: boolean = false;
  headerSticky: boolean = false;
  isStriped: boolean = false;
  headerColor: { light: string; dark: string } = {
    light: "#f4f4f5",
    dark: "#27272a",
  };

  static default(): FastboardTableProperties {
    return new FastboardTableProperties();
  }
}
