import { QueryData } from "@/types/connections";

export class FastboardGroupChartProperties {
  sourceQueryData: QueryData | null = null;
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
