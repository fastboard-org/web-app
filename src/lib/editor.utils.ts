import {
  ComponentType,
  Context,
  DashboardMetadata,
  FastboardComponent,
  ModalFrame,
} from "@/types/editor";
import { Layout, LayoutType } from "@/types/editor/layout-types";

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
  type: ComponentType,
  layoutIndex: number,
  containerIndex: string,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  //If the component is a table, then we need to remove the modal frame that is associated with it
  if (type === ComponentType.Table) {
    const layout = dashboardMetadata.layouts[layoutIndex];
    // @ts-ignore
    const tableProperties = layout[containerIndex]?.properties;
    if (tableProperties?.addOns?.addRowForm) {
      dashboardMetadata = removeModalFrame(
        tableProperties.addOns.addRowForm.modalId,
        dashboardMetadata
      );
    }
  }

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
  dashboardMetadata: DashboardMetadata,
  context?: Context
): DashboardMetadata {
  if (!componentType) {
    return dashboardMetadata;
  }

  if (context?.type === "modal") {
    if (!context.modalContext) {
      return dashboardMetadata;
    }

    return updateModalFrame(
      context.modalContext?.modalId,
      {
        type: componentType,
        properties: properties,
      },
      dashboardMetadata
    );
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

export function addModalFrame(
  modalId: string,
  body: FastboardComponent,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  return {
    ...dashboardMetadata,
    modals: [
      ...dashboardMetadata.modals,
      {
        id: modalId,
        body,
      },
    ],
  };
}

export function removeModalFrame(
  modalId: string,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  return {
    ...dashboardMetadata,
    modals: dashboardMetadata.modals.filter((modal) => modal.id !== modalId),
  };
}

export function updateModalFrame(
  modalId: string,
  body: FastboardComponent,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  return {
    ...dashboardMetadata,
    modals: dashboardMetadata.modals.map((modal) => {
      if (modal.id === modalId) {
        return {
          ...modal,
          body,
        };
      }
      return modal;
    }),
  };
}

export function getModalFrame(
  modalId: string,
  dashboardMetadata: DashboardMetadata
): ModalFrame | null {
  const modal = dashboardMetadata.modals.find((modal) => modal.id === modalId);
  return modal || null;
}
