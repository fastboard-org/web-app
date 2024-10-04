import { QueryData } from "../connections";

export interface BodyFieldProperties {
  key: string;
  label: string;
  visible: boolean;
}
export class FastboardCardsProperties {
  sourceQuery: QueryData | null = null;
  emptyMessage: string = "No cards to display";
  header: string | null = null;
  footer: string | null = null;
  body: BodyFieldProperties[] = [];
  cardsPerRow: number = 3;

  static default(): FastboardCardsProperties {
    return new FastboardCardsProperties();
  }
}
