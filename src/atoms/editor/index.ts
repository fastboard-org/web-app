import { EditorModalState, PropertiesDrawerState } from "@/types/editor";
import { atom } from "recoil";

export const editorCanvasRefState = atom<HTMLDivElement | null>({
  key: "editorCanvasRefState",
  default: null,
});

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
    selectedComponentId: null,
    type: null,
    properties: {},
  },
});

export const editorModalState = atom<EditorModalState>({
  key: "editorModalState",
  default: {
    isOpen: false,
    modalId: null,
  },
});
