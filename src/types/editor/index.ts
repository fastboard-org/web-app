import { ReactNode } from "react";
import { Layout } from "./layout-types";

export default interface PublishOption {
  label: string;
  description: string;
}

export enum ComponentType {
  Table = "table",
  Image = "image",
  Form = "form",
  Cards = "cards",
}

export interface FastboardComponent {
  type: ComponentType;
  properties: Record<string, any>;
}

export interface ModalFrame {
  id: string;
  body: FastboardComponent;
}

export interface DashboardMetadata {
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
  type: ComponentType | null;
  properties: Record<string, any>;
  context?: Context;
}

export interface EditorModalState {
  isOpen: boolean;
  modalId: string | null;
}
