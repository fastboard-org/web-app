import { Query } from "@/types/connections";
import { Color } from "./style-types";

export class FastboardGroupChartProperties {
  sourceQuery: Query | null = null;
  title: string = "Title";
  subtitle: string = "";
  keys: string[] = [];
  groupBy: string = "";
  emptyMessage: string = "No data to display.";
  minimizedLabels: boolean = false;
  barsColor: Color = {
    light: "#006FEE",
    dark: "#006FEE",
  };

  static default(): FastboardGroupChartProperties {
    return new FastboardGroupChartProperties();
  }
}
