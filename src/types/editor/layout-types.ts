import { FastboardComponent } from ".";

export enum LayoutType {
  Full = "full",
  Row = "row",
  Column = "column",
  RightSplit = "right-split",
  BottomSplit = "bottom-split",
}

export abstract class Layout {
  type: LayoutType;

  static of(type: LayoutType): Layout {
    switch (type) {
      case LayoutType.Full:
        return new FullLayout();
      case LayoutType.Row:
        return new RowLayout();
      case LayoutType.Column:
        return new ColumnLayout();
      case LayoutType.RightSplit:
        return new RightSplitLayout();
      case LayoutType.BottomSplit:
        return new BottomSplitLayout();
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

export class ColumnLayout extends Layout {
  component1: FastboardComponent | null;
  component2: FastboardComponent | null;

  constructor() {
    super(LayoutType.Column);
    this.component1 = null;
    this.component2 = null;
  }
}

export class RightSplitLayout extends Layout {
  component1: FastboardComponent | null;
  component2: FastboardComponent | null;
  component3: FastboardComponent | null;

  constructor() {
    super(LayoutType.RightSplit);
    this.component1 = null;
    this.component2 = null;
    this.component3 = null;
  }
}

export class BottomSplitLayout extends Layout {
  component1: FastboardComponent | null;
  component2: FastboardComponent | null;
  component3: FastboardComponent | null;

  constructor() {
    super(LayoutType.BottomSplit);
    this.component1 = null;
    this.component2 = null;
    this.component3 = null;
  }
}
