import { QueryData } from "@/types/connections";
import { Color } from "./style-types";

export class FastboardGroupChartProperties {
  sourceQueryData: QueryData | null = null;
  title: string = "Title";
  subtitle: string = "";
  keys: string[] = [];
  groupBy: string = "";
  emptyMessage: string = "No data to display.";
  minimizedLabels: boolean = false;
  barsColor: Color = Color.primary();
  layout: "bar" | "pie" = "bar";

  static default(): FastboardGroupChartProperties {
    return new FastboardGroupChartProperties();
  }
}
