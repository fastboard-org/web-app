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
  Rounded = "lg",
  Circle = "full",
}

export class FastboardHeaderProperties {
  title: { text: string; size: FastboardHeaderFontSize } = {
    text: "",
    size: FastboardHeaderFontSize.Medium,
  };
  photo: { url: string; border: string } = {
    url: "",
    border: FastboardHeaderPhotoBorder.Rounded,
  };

  position: FastboardHeaderPosition = FastboardHeaderPosition.Left;

  divider: boolean = false;

  static default(): FastboardHeaderProperties {
    return new FastboardHeaderProperties();
  }
}
