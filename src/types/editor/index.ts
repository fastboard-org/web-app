import { Layout } from "./layout-types";

export default interface PublishOption {
  label: string;
  description: string;
}

export enum ComponentType {
  Table = "table",
  Image = "image",
  GroupChart = "group-chart",
  Form = "form",
  Cards = "cards",
  Sidebar = "sidebar",
  Header = "header",
}

export type ComponentId = string;

export interface FastboardComponent {
  id: ComponentId;
  type: ComponentType;
  properties: Record<string, any>;
}

export interface ModalFrame {
  id: string;
  body: ComponentId;
}

export interface DashboardMetadata {
  components: Record<ComponentId, FastboardComponent>;
  sidebar: { id: ComponentId; visible: boolean } | null;
  modals: ModalFrame[];
  pages: Record<string, Layout[]>;
  layouts: Array<Layout>;
  header: { componentId: ComponentId | null; isVisible: boolean };
}

export interface Index {
  page: string;
  layout: number;
  container: string;
}

export interface Context {
  type: "modal" | "header" | "sidebar" | "layout";
  modalContext?: {
    modalId: string;
  };
  layoutContext?: Index;
}

export interface PropertiesDrawerState {
  selectedComponentId: ComponentId | null;
  type: ComponentType | null;
  properties: Record<string, any>;
  context?: Context;
}

export interface EditorModalState {
  isOpen: boolean;
  modalId: string | null;
}
