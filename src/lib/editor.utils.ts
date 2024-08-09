import {
  ComponentId,
  ComponentType,
  DashboardMetadata,
  FastboardComponent,
  Context,
  ModalFrame,
} from "@/types/editor";
import { Layout, LayoutType } from "@/types/editor/layout-types";
import { v4 as uuidv4 } from "uuid";

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
  dashboardMetadata = {
    ...dashboardMetadata,
    components: {
      ...dashboardMetadata.components,
      [id]: {
        id: id,
        type: type,
        properties: defaultProperties,
      },
    },
  };
  return [dashboardMetadata, id];
}

export function deleteComponent(
  id: ComponentId,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  //TODO: If the component is a table, then we need to remove the modal frame that is associated with it
  const component = dashboardMetadata.components[id];
  if (component.type === ComponentType.Table) {
    const modalId = component.properties?.addOns?.addRowForm?.modalId;
    if (modalId) {
      dashboardMetadata = removeModalFrame(modalId, dashboardMetadata);
    }
  }
  delete dashboardMetadata.components[id];
  return dashboardMetadata;
}

export function updateComponent(
  id: ComponentId,
  properties: Object,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  const component = dashboardMetadata.components[id];
  if (!component) {
    return dashboardMetadata;
  }
  return {
    ...dashboardMetadata,
    components: {
      ...dashboardMetadata.components,
      [id]: {
        ...component,
        properties: properties,
      },
    },
  };
}

export function addComponentToLayout(
  layoutIndex: number,
  containerIndex: string,
  type: ComponentType,
  defaultProperties: Object,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  // If there is already a component in the container, delete it
  const curretnComponentId: ComponentId | null =
    // @ts-ignore
    dashboardMetadata.layouts[layoutIndex][containerIndex];
  if (curretnComponentId) {
    dashboardMetadata = deleteComponentFromLayout(
      layoutIndex,
      containerIndex,
      dashboardMetadata
    );
  }

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

export function deleteComponentFromLayout(
  layoutIndex: number,
  containerIndex: string,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  const layout = dashboardMetadata.layouts[layoutIndex];
  // @ts-ignore
  const componentId: ComponentId = layout[containerIndex];
  if (!componentId) {
    return dashboardMetadata;
  }

  const newMetadata = deleteComponent(componentId, dashboardMetadata);
  return {
    ...newMetadata,
    layouts: newMetadata.layouts.map((layout, index) => {
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

export function createModalFrame(
  body: {
    type: ComponentType;
    properties: Object;
  },
  dashboardMetadata: DashboardMetadata
): [DashboardMetadata, string] {
  const [newMetadata, componentId] = createComponent(
    body.type,
    body.properties,
    dashboardMetadata
  );

  const modalId = uuidv4();
  dashboardMetadata = {
    ...newMetadata,
    modals: [
      ...newMetadata.modals,
      {
        id: modalId,
        body: componentId,
      },
    ],
  };
  return [dashboardMetadata, modalId];
}

function removeModalFrame(
  modalId: string,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  const modalFrame = getModalFrame(modalId, dashboardMetadata);
  if (!modalFrame) {
    return dashboardMetadata;
  }

  const newMetadata = deleteComponent(modalFrame.body, dashboardMetadata);

  return {
    ...newMetadata,
    modals: newMetadata.modals.filter((modal) => modal.id !== modalId),
  };
}

export function getModalFrame(
  modalId: string,
  dashboardMetadata: DashboardMetadata
): ModalFrame | null {
  const modal = dashboardMetadata.modals.find((modal) => modal.id === modalId);
  return modal || null;
}

export const editorUtils = {
  getComponent,
  createComponent,
  deleteComponent,
  updateComponent,
  addComponentToLayout,
  deleteComponentFromLayout,
  changeLayout,
  createModalFrame,
  removeModalFrame,
};
