import { FastboardComponent } from ".";

export enum LayoutType {
  Full = "full",
  Row = "row",
}

export abstract class Layout {
  type: LayoutType;

  static of(type: LayoutType): Layout {
    switch (type) {
      case LayoutType.Full:
        return new FullLayout();
      case LayoutType.Row:
        return new RowLayout();
      default:
        throw new Error("Invalid layout type");
    }
  }

  constructor(type: LayoutType) {
    this.type = type;
  }
}

export class FullLayout extends Layout {
  component1: FastboardComponent | null;

  constructor() {
    super(LayoutType.Full);
    this.component1 = null;
  }
}
export class RowLayout extends Layout {
  component1: FastboardComponent | null;
  component2: FastboardComponent | null;

  constructor() {
    super(LayoutType.Row);
    this.component1 = null;
    this.component2 = null;
  }
}
