import {
  DashboardMetadata,
  LayoutType,
  PropertiesDrawerState,
} from "@/types/editor";
import { atom } from "recoil";

export const isComponentsDrawerOpen = atom({
  key: "isComponentsDrawerOpen",
  default: false,
});
export const isPropertiesDrawerOpen = atom({
  key: "isPropertiesDrawerOpen",
  default: false,
});
export const isSettingsDrawerOpen = atom({
  key: "isSettingsDrawerOpen",
  default: false,
});

export const propertiesDrawerState = atom<PropertiesDrawerState>({
  key: "propertiesDrawerState",
  default: {
    layoutIndex: 0,
    container: "component1",
    type: null,
    properties: {},
  },
});

export const dashboardMetadataState = atom<DashboardMetadata>({
  key: "dashboardMetadata",
  default: {
    layouts: [
      {
        type: LayoutType.Row,
        component1: null,
        component2: null,
      },
    ],
  },
});
