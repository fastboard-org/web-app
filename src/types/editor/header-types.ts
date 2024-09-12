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
  backgroundColor: Color = {
    light: "#ffffff",
    dark: "#000000",
  };
  textColor: Color = {
    light: "#11181C",
    dark: "#ECEDEE",
  };
  themeSwitcherColor: Color = {
    light: "#006FEE",
    dark: "#006FEE",
  };

  static default(): FastboardHeaderProperties {
    return new FastboardHeaderProperties();
  }
}
