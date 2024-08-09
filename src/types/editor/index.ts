import { ReactNode } from "react";
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
}

export type ComponentId = string;

export interface FastboardComponent {
  id: ComponentId;
  type: ComponentType;
  properties: Record<string, any>;
}

export interface ModalFrame {
  id: string;
  body: FastboardComponent;
}

export interface DashboardMetadata {
  components: Record<ComponentId, FastboardComponent>;
  modals: ModalFrame[];
  layouts: Array<Layout>;
}

export interface Context {
  type: "modal" | "header" | "sidebar" | "layout";
  modalContext?: {
    modalId: string;
  };
  layoutContext?: {
    layoutIndex: number;
    containerIndex: string;
  };
}

export interface PropertiesDrawerState {
  layoutIndex: number;
  container: string;
  selectedComponentId: ComponentId | null;
  type: ComponentType | null;
  properties: Record<string, any>;
  context?: Context;
}

export interface EditorModalState {
  isOpen: boolean;
  modalId: string | null;
}
