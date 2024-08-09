import { Query } from "@/types/connections";

export class FastboardGroupChartProperties {
  sourceQuery: Query | null = null;
  title: string = "Title";
  subtitle: string = "";
  keys: string[] = [];
  groupBy: string = "";
  emptyMessage: string = "No data to display.";
  minimizedLabels: boolean = false;

  static default(): FastboardGroupChartProperties {
    return new FastboardGroupChartProperties();
  }
}
