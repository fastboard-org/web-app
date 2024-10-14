import { QueryData } from "../connections";
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
  query: QueryData | null;
  parameters: { name: string; columnKey: string; value: string }[];
  titleText?: string;
  questionText?: string;
  modalId?: string;
}

export interface AddRowFormProperties {
  modalId: string;
  buttonLabel: string;
  buttonColor: Color;
  buttonTextColor: Color;
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
  sourceQueryData: QueryData | null = null;
  tableTitle: string = "";
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
  headerColor: Color = new Color("#f4f4f5", "#27272a");
  headerTextColor: Color = new Color("#52525b", "#71717a");

  static default(): FastboardTableProperties {
    return new FastboardTableProperties();
  }
}
