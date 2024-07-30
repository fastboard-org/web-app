export default interface PublishOption {
  label: string;
  description: string;
}

export enum LayoutType {
  Full = "full",
  Row = "row",
  Column = "column",
  RightSplit = "right-split",
  BottomSplit = "bottom-split",
}

export interface Layout {
  type: LayoutType;
}

export interface FullLayout extends Layout {
  component1: FastboardComponent | null;
}
export interface RowLayout extends Layout {
  component1: FastboardComponent | null;
  component2: FastboardComponent | null;
}
export interface ColumnLayout extends Layout {
  component1: FastboardComponent | null;
  component2: FastboardComponent | null;
}
export interface RightSplitLayout extends Layout {
  component1: FastboardComponent | null;
  component2: FastboardComponent | null;
  component3: FastboardComponent | null;
}
export interface BottomSplitLayout extends Layout {
  component1: FastboardComponent | null;
  component2: FastboardComponent | null;
  component3: FastboardComponent | null;
}

export enum ComponentType {
  Table = "table",
  Image = "image",
}

export interface FastboardComponent {
  type: ComponentType;
  properties: Record<string, any>;
}

export interface DashboardMetadata {
  layouts: Array<FullLayout | RowLayout | ColumnLayout | RightSplitLayout | BottomSplitLayout>;
}

export interface PropertiesDrawerState {
  layoutIndex: number;
  container: string;
  type: ComponentType | null;
  properties: Record<string, any>;
}
