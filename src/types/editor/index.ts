export default interface PublishOption {
  label: string;
  description: string;
}

export enum LayoutType {
  Full = "full",
  Row = "row",
}

interface Layout {
  type: LayoutType;
}

interface FullLayout extends Layout {
  component1: FastboardComponent;
}
interface RowLayout extends Layout {
  component1: FastboardComponent;
  component2: FastboardComponent;
}

interface FastboardComponent {
  type: string;
  properties: Record<string, any>;
}

export interface DashboardMetadata {
  layouts: Array<FullLayout | RowLayout>;
}
