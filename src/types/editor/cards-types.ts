import { Key } from "react";
import { Query } from "../connections";

export interface BodyFieldProperties {
  key: string;
  label: string;
  visible: boolean;
}
export class FastboardCardsProperties {
  sourceQuery: Query | null = null;
  emptyMessage: string = "No cards to display";
  header: string = "Header";
  footer: string = "Footer";
  body: BodyFieldProperties[] = [];
  // fields: { key: string; label: string }[] = [];

  static default(): FastboardCardsProperties {
    return new FastboardCardsProperties();
  }
}
