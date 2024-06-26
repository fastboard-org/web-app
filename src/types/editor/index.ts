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

interface FullLayout extends Layout {
  component1: FastboardComponent;
}
interface RowLayout extends Layout {
  component1: FastboardComponent;
  component2: FastboardComponent;
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
  container: "component1" | "component2";
  type: ComponentType | null;
  properties: Record<string, any>;
}
