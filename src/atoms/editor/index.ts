import {
  ComponentType,
  DashboardMetadata,
  LayoutType,
  PropertiesDrawerComponent,
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

export const propertiesDrawerComponentAtom = atom<PropertiesDrawerComponent>({
  key: "propertiesDrawerComponent",
  default: {
    layoutIndex: 0,
    container: "component1",
    properties: {},
  },
});

export const dashboardMetadataState = atom<DashboardMetadata>({
  key: "dashboardMetadata",
  default: {
    layouts: [
      {
        type: LayoutType.Full,
        component1: {
          type: ComponentType.Image,
          properties: {
            src: "https://source.unsplash.com/random/800x600",
          },
        },
      },
    ],
  },
});
