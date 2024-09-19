import { Alignment } from "@/components/shared/AlignmentProperty";
import { RestQueryData } from "../connections";
import { Color } from "./style-types";

export enum CardComponentType {
  Text = "Text",
  Image = "Image",
}

interface BaseCardComponentProperties {
  type: CardComponentType;
  dataKey: string;
}

export interface TextComponentProperties extends BaseCardComponentProperties {
  label: string;
  defaultText: string;
  alignment: Alignment;
  fontSize: number;
  textColor: Color;
}

export interface ImageComponentProperties extends BaseCardComponentProperties {
  alignment: Alignment;
}

export type CardComponentProperties =
  | TextComponentProperties
  | ImageComponentProperties;

export class DefaultCardComponentProperties {
  static of(type: CardComponentType): CardComponentProperties {
    const baseProperties = {
      type,
      dataKey: "",
    };
    switch (type) {
      case CardComponentType.Text:
        return {
          ...baseProperties,
          label: "",
          defaultText: "Some text",
          alignment: Alignment.Left,
          fontSize: 20,
          textColor: new Color("#000000", "#ffffff"),
        };
      case CardComponentType.Image:
        return {
          ...baseProperties,
          alignment: Alignment.Left,
        };
      default:
        return {
          ...baseProperties,
          alignment: Alignment.Left,
        };
    }
  }
}

export class CardProperties {
  sourceQueryData: RestQueryData | null = null;
  queryParameters: Record<string, string> = {};
  components: CardComponentProperties[] = [];
  dataKeys: string[] = [];
  showShadow: boolean = true;

  static default(): CardProperties {
    return new CardProperties();
  }
}
