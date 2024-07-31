import { Layout } from "./layout-types";

export default interface PublishOption {
  label: string;
  description: string;
}

export enum ComponentType {
  Table = "table",
  Image = "image",
  Form = "form",
}

export interface FastboardComponent {
  type: ComponentType;
  properties: Record<string, any>;
}

export interface DashboardMetadata {
  layouts: Array<Layout>;
}

export interface PropertiesDrawerState {
  layoutIndex: number;
  container: string;
  type: ComponentType | null;
  properties: Record<string, any>;
}
