import { QueryData } from "../connections";

export class FastboardCardsProperties {
  sourceQuery: QueryData | null = null;
  emptyMessage: string = "No cards to display";
  cardTitleField: string = "";
  cardSubtitleField: string = "";
  cardImageField: string = "";
  cardFooterField: string = "";
  cardLinkField: string = "";
  cardTooltipField: string = "";
  cardLayout: "irregular" | "regular" = "irregular";
  cardsPerRow: number = 3;
  cardsHeight: number = 200;
  queryFields: { key: string; label: string }[] = [];

  static default(): FastboardCardsProperties {
    return new FastboardCardsProperties();
  }
}
