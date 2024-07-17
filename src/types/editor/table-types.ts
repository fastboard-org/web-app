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
  queryId: string;
  parameters: { key: string; value: string }[];
}

export class FastboardTableProperties {
  query: { id: string; url: string; field: string | null } = {
    id: "1",
    url: "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
    field: "results",
  };
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
