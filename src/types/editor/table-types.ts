import { Query, RestQueryData } from "../connections";
import { FormProperties } from "./form";
import { Color } from "./style-types";

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
  modalId: string;
  buttonLabel: string;
  buttonColor: string;
}

export interface TableAddOnsProperties {
  addRowForm: AddRowFormProperties | null;
  downloadData: boolean;
}

export class FastboardTableProperties {
  sourceQueryData: RestQueryData | null = null;
  rowsPerPage: number = 10;
  emptyMessage: string = "No rows to display.";
  columns: TableColumnProperties[] = [];
  actions: TableActionProperty[] = [];
  pinActions: boolean = false;
  addOns: TableAddOnsProperties = {
    addRowForm: null,
    downloadData: false,
  };
  selectedRow: any = null;

  hideHeader: boolean = false;
  headerSticky: boolean = false;
  isStriped: boolean = false;
  headerColor: Color = {
    light: "#f4f4f5",
    dark: "#27272a",
  };

  static default(): FastboardTableProperties {
    return new FastboardTableProperties();
  }
}
