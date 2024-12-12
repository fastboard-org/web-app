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
  cardTooltipField: string = "";
  cardLayout: "irregular" | "regular" = "regular";
  cardsPerRow: number = 2;
  cardsHeight: number = 200;
  keys: string[] = [];

  static default(): FastboardAICardsProperties {
    return new FastboardAICardsProperties();
  }
}
