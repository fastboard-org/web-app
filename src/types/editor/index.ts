import { Layout, LayoutType } from "./layout-types";
import { Color } from "./style-types";
import { QueryData } from "@/types/connections";

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
  loginQueryData: QueryData | null = null;
  accessTokenField: string = "";
  userInputLabel: string = "username";
  passwordInputLabel: string = "password";
  userQueryParameter: string = "";
  passwordQueryParameter: string = "";
  previewAccessToken: string = "";
  title: string = "Welcome!";
  buttonText: string = "Login";
  buttonColor: Color = Color.primary();
  buttonTextColor: Color = new Color("#ffffff", "#ffffff");

  static default(): DashboardAuth {
    return new DashboardAuth();
  }
}

export class DashboardMetadata {
  components: Record<ComponentId, FastboardComponent> = {};
  header: { componentId: ComponentId | null; isVisible: boolean } = {
    componentId: null,
    isVisible: false,
  };
  sidebar: { id: ComponentId; visible: boolean } | null = null;
  modals: ModalFrame[] = [];
  pages: Record<string, Layout[]> = {
    home: [Layout.of(LayoutType.Full)],
  };
  auth: DashboardAuth = DashboardAuth.default();
  pageTitle: string = "";
  pageIcon: string = "";
  defaultTheme: "light" | "dark" = "light";

  static default(): DashboardMetadata {
    return new DashboardMetadata();
  }
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
