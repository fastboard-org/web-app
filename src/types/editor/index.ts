export default interface PublishOption {
  label: string;
  description: string;
}

export enum LayoutType {
  Full = "full",
  Row = "row",
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

export enum ComponentType {
  Table = "table",
  Image = "image",
}

export interface FastboardComponent {
  type: ComponentType;
  properties: Record<string, any>;
}

export interface DashboardMetadata {
  layouts: Array<FullLayout | RowLayout>;
}

export interface PropertiesDrawerState {
  layoutIndex: number;
  container: string;
  type: ComponentType | null;
  properties: Record<string, any>;
}
