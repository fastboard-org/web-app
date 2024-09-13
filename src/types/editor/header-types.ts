import { Color } from "./style-types";

export enum FastboardHeaderPosition {
  Left = "start",
  Center = "center",
  Right = "end",
}

export enum FastboardHeaderFontSize {
  Small = "x-large",
  Medium = "xx-large",
  Large = "xxx-large",
}

export enum FastboardHeaderPhotoBorder {
  None = "none",
  Round = "lg",
  Circle = "full",
}

export enum FastboardHeaderPhotoSize {
  Small = "50%",
  Medium = "75%",
  Large = "100%",
}

export class FastboardHeaderProperties {
  title: { text: string; size: FastboardHeaderFontSize } = {
    text: "Header Title",
    size: FastboardHeaderFontSize.Medium,
  };
  photo: {
    url: string;
    border: FastboardHeaderPhotoBorder;
    size: FastboardHeaderPhotoSize;
  } = {
    url: "",
    border: FastboardHeaderPhotoBorder.Round,
    size: FastboardHeaderPhotoSize.Medium,
  };
  showThemeSwitcher: boolean = false;
  position: FastboardHeaderPosition = FastboardHeaderPosition.Center;
  divider: boolean = false;
  backgroundColor: Color = new Color("#ffffff", "#000000");
  textColor: Color = new Color("#11181C", "#ECEDEE");
  themeSwitcherColor: Color = Color.primary();

  static default(): FastboardHeaderProperties {
    return new FastboardHeaderProperties();
  }
}
