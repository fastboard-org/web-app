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
  photo: { url: string; border: string; size: string } = {
    url: "",
    border: FastboardHeaderPhotoBorder.Round,
    size: FastboardHeaderPhotoSize.Medium,
  };

  position: FastboardHeaderPosition = FastboardHeaderPosition.Center;

  divider: boolean = false;

  static default(): FastboardHeaderProperties {
    return new FastboardHeaderProperties();
  }
}
