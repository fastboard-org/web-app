import { ComponentType, DashboardMetadata, LayoutType } from "@/types/editor";
import { atom } from "recoil";

export const isComponentsDrawerOpen = atom({
  key: "isComponentsDrawerOpen",
  default: false,
});
export const isPropertiesDrawerOpen = atom({
  key: "isPropertiesDrawerOpen",
  default: false,
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
