import { Layout } from "./layout-types";
import { Query, RestQueryData } from "@/types/connections";
import { Color } from "./style-types";

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

export class DashboardAuth {
  enabled: boolean = false;
  loginQueryData: RestQueryData | null = null;
  accessTokenField: string = "";
  userInputLabel: string = "username";
  passwordInputLabel: string = "password";
  userQueryParameter: string = "";
  passwordQueryParameter: string = "";
  previewAccessToken: string = "";
  title: string = "Welcome!";
  buttonText: string = "Login";
  buttonColor: Color = {
    light: "#006FEE",
    dark: "#006FEE",
  };
  buttonTextColor: Color = {
    light: "#ffffff",
    dark: "#ffffff",
  };

  static default(): DashboardAuth {
    return new DashboardAuth();
  }
}

export interface DashboardMetadata {
  components: Record<ComponentId, FastboardComponent>;
  header: { componentId: ComponentId | null; isVisible: boolean };
  sidebar: { id: ComponentId; visible: boolean } | null;
  modals: ModalFrame[];
  pages: Record<string, Layout[]>;
  auth: DashboardAuth;
  defaultTheme: "light" | "dark";
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
