import {
  ComponentType,
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

export const propertiesDrawerState = atom<PropertiesDrawerState>({
  key: "propertiesDrawerState",
  default: {
    layoutIndex: 0,
    container: "component1",
    type: null,
    properties: {},
  },
});

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: DashboardMetadata, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const dashboardMetadataState = atom<DashboardMetadata>({
  key: "dashboardMetadata",
  default: {
    layouts: [
      {
        type: LayoutType.Row,
        component1: undefined,
        component2: undefined,
      },
    ],
  },
  effects: [localStorageEffect("dashboardMetadata")],
});
