import { ComponentType, DashboardMetadata } from "@/types/editor";

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
