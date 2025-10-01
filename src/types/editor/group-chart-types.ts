import { QueryData } from "@/types/connections";
import { Color } from "./style-types";

export interface DisplayKey {
  key: string;
  label: string;
  color?: Color;
}

export class FastboardGroupChartProperties {
  sourceQueryData: QueryData | null = null;
  title: string = "Title";
  subtitle: string = "";
  keys: string[] = [];
  groupBy: string = "";
  customDisplayKey: string | null = null;
  customDisplayKeyLabel: string | null = null;
  displayKeys: DisplayKey[] = []; // Nueva propiedad para múltiples barras
  emptyMessage: string = "No data to display.";
  minimizedLabels: boolean = false;
  barsColor: Color = Color.primary();
  layout: "bar" | "pie" = "bar";
  showBarYAxis: boolean = false;
  pollable: boolean = false;
  pollInterval: number = 1; // en minutos

  static default(): FastboardGroupChartProperties {
    return new FastboardGroupChartProperties();
  }
}
