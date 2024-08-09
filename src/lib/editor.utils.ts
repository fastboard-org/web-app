import {
  ComponentId,
  ComponentType,
  DashboardMetadata,
  FastboardComponent,
} from "@/types/editor";
import { Layout, LayoutType } from "@/types/editor/layout-types";

export function getComponent(
  id: ComponentId,
  dashboardMetadata: DashboardMetadata
): FastboardComponent | null {
  return dashboardMetadata.components[id];
}

export function createComponent(
  type: ComponentType,
  defaultProperties: Object,
  dashboardMetadata: DashboardMetadata
): [DashboardMetadata, ComponentId] {
  const id = Math.random().toString(36).substring(7);
  dashboardMetadata.components[id] = {
    id: id,
    type: type,
    properties: defaultProperties,
  };
  return [dashboardMetadata, id];
}

export function addComponentToLayout(
  layoutIndex: number,
  containerIndex: string,
  type: ComponentType,
  defaultProperties: Object,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  const [newMetadata, componentId] = createComponent(
    type,
    defaultProperties,
    dashboardMetadata
  );
  return {
    ...newMetadata,
    layouts: newMetadata.layouts.map((layout, index) => {
      if (index === layoutIndex) {
        return {
          ...layout,
          [containerIndex]: componentId,
        };
      }
      return layout;
    }),
  };
}

export const editorUtils = {
  getComponent,
  createComponent,
  addComponentToLayout,
};

export function addComponent(
  layoutIndex: number,
  containerIndex: string,
  componentType: ComponentType,
  defaultProperties: Record<string, any>,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  return {
    ...dashboardMetadata,
    layouts: dashboardMetadata.layouts.map((layout, index) => {
      if (index === layoutIndex) {
        return {
          ...layout,
          [containerIndex]: {
            type: componentType,
            properties: defaultProperties,
          },
        };
      }
      return layout;
    }),
  };
}

export function deleteComponent(
  layoutIndex: number,
  containerIndex: string,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  return {
    ...dashboardMetadata,
    layouts: dashboardMetadata.layouts.map((layout, index) => {
      if (index === layoutIndex) {
        return {
          ...layout,
          [containerIndex]: null,
        };
      }
      return layout;
    }),
  };
}

export function updateComponentProperties(
  layoutIndex: number,
  containerIndex: string,
  componentType: ComponentType | null,
  properties: Record<string, any>,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  if (!componentType) {
    return dashboardMetadata;
  }
  return {
    ...dashboardMetadata,
    layouts: dashboardMetadata.layouts.map((layout, index) => {
      if (index === layoutIndex) {
        return {
          ...layout,
          [containerIndex]: {
            type: componentType,
            properties: properties,
          },
        };
      }
      return layout;
    }),
  };
}

export function changeLayout(
  layoutIndex: number,
  to_type: LayoutType,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  return {
    ...dashboardMetadata,
    layouts: dashboardMetadata.layouts.map((layout, index) => {
      if (index === layoutIndex) {
        return convertLayout(layout, to_type);
      }
      return layout;
    }),
  };
}

function convertLayout(from: Layout, to_type: LayoutType): Layout {
  let to = Layout.of(to_type);

  Object.keys(to).forEach((key) => {
    if (key !== "type") {
      // @ts-ignore
      to[key] = from[key] || null;
    }
  });
  return to;
}
