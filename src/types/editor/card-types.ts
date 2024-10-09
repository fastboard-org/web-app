import { Alignment } from "@/components/shared/AlignmentProperty";
import { Color } from "./style-types";
import { FontType } from "@/components/shared/FontTypeProperty";
import { ImageBorder } from "@/components/shared/ImageBorderProperty";
import { IconType } from "./icon-types";
import { QueryData } from "../connections";
import { FastboardHeaderPhotoSize } from "./header-types";

export enum CardComponentType {
  Text = "Text",
  Image = "Image",
  Link = "Link",
  Video = "Video",
  Spacer = "Spacer",
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
  fontTypes: FontType[];
  textColor: Color;
  labelColor: Color;
}

export interface ImageComponentProperties extends BaseCardComponentProperties {
  alignment: Alignment;
  border: ImageBorder;
  size: FastboardHeaderPhotoSize;
}

export interface LinkComponentProperties extends BaseCardComponentProperties {
  label: string;
  defaultText: string;
  isExternal: boolean;
  externalIcon: IconType;
  showExternalIcon: boolean;
  alignment: Alignment;
  fontSize: number;
  textColor: Color;
  labelColor: Color;
}

export interface VideoComponentProperties extends BaseCardComponentProperties {}

export interface SpacerComponentProperties extends BaseCardComponentProperties {
  height: number;
}

export type CardComponentProperties =
  | TextComponentProperties
  | ImageComponentProperties
  | LinkComponentProperties
  | VideoComponentProperties
  | SpacerComponentProperties;

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
          fontSize: 18,
          fontTypes: [],
          textColor: new Color("#000000", "#ffffff"),
          labelColor: new Color("#000000", "#ffffff"),
        };
      case CardComponentType.Image:
        return {
          ...baseProperties,
          alignment: Alignment.Left,
          border: ImageBorder.Round,
          size: FastboardHeaderPhotoSize.Medium,
        };
      case CardComponentType.Link:
        return {
          ...baseProperties,
          label: "",
          defaultText: "https://fastboard-xgski.ondigitalocean.app/",
          isExternal: true,
          externalIcon: IconType.Link,
          showExternalIcon: false,
          alignment: Alignment.Left,
          fontSize: 18,
          textColor: Color.primary(),
          labelColor: new Color("#000000", "#ffffff"),
        };
      case CardComponentType.Video:
        return {
          ...baseProperties,
        };
      case CardComponentType.Spacer:
        return {
          ...baseProperties,
          height: 5,
        };
      default:
        return {
          ...baseProperties,
          alignment: Alignment.Left,
          border: ImageBorder.Round,
        };
    }
  }
}

export class CardProperties {
  sourceQueryData: QueryData | null = null;
  queryParameters: Record<string, string> = {};
  components: CardComponentProperties[] = [];
  dataKeys: string[] = [];

  spacing: number = 2;
  backgroundColor: Color = new Color("#ffffff", "#18181b");
  showShadow: boolean = true;

  static default(): CardProperties {
    return new CardProperties();
  }
}
