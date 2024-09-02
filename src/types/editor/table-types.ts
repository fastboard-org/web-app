import { Query, RestQueryData } from "../connections";
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
  modalId: string;
  buttonLabel: string;
  buttonColor: string;
}

export interface TableAddOnsProperties {
  addRowForm: AddRowFormProperties | null;
  downloadData: boolean;
}

export enum FilterType {
  StringFilter = "string-filter",
  NumberFilter = "number-filter",
}

interface BaseFilterProperties {
  type: FilterType;
  columnKey: string | null;
}

export interface StringFilterProperties extends BaseFilterProperties {
  label: string;
  placeholder: string;
  caseSensitive: boolean;
  exactMatch: boolean;
}
export interface NumberFilterProperties extends BaseFilterProperties {
  label: string;
}

export type FilterProperties = StringFilterProperties | NumberFilterProperties;

export class DefaultFilterProperties {
  static of(type: FilterType): FilterProperties {
    switch (type) {
      case FilterType.StringFilter:
        return {
          type: FilterType.StringFilter,
          columnKey: null,
          label: "Search",
          placeholder: "search ...",
          caseSensitive: false,
          exactMatch: false,
        };
      case FilterType.NumberFilter:
        return {
          type: FilterType.NumberFilter,
          columnKey: null,
          label: "Filter",
        };
      default:
        return {
          type: FilterType.StringFilter,
          columnKey: null,
          label: "Search",
          placeholder: "search ...",
          caseSensitive: false,
          exactMatch: false,
        };
    }
  }
}

export class FastboardTableProperties {
  sourceQueryData: RestQueryData | null = null;
  tableTitle: string = "Table Title";
  emptyMessage: string = "No rows to display.";
  columns: TableColumnProperties[] = [];
  actions: TableActionProperty[] = [];
  filters: FilterProperties[] = [];
  pinActions: boolean = false;
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
