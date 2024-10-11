import { QueryData } from "../connections";

export class FastboardAICardsProperties {
  sourceQueryData: QueryData | null = null;
  parameters: any = [];
  title: string = "Title";
  searchLabel: string = "Enter your search";
  searchPlaceholder: string = "e.g. ...";
  emptyMessage: string = "No data to display";
  cardTitleField: string = "";
  cardSubtitleField: string = "";
  cardImageField: string = "";
  cardLinkField: string = "";
  cardLayout: "irregular" | "regular" = "irregular";
  cardsPerRow: number = 2;

  static default(): FastboardAICardsProperties {
    return new FastboardAICardsProperties();
  }
}
