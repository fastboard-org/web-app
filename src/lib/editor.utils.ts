import {
  ComponentId,
  ComponentType,
  DashboardMetadata,
  FastboardComponent,
  Context,
  ModalFrame,
} from "@/types/editor";
import { Layout, LayoutType } from "@/types/editor/layout-types";
import { TableActionProperty } from "@/types/editor/table-types";
import { v4 as uuidv4 } from "uuid";
import { FastboardHeaderProperties } from "@/types/editor/header-types";

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

function deleteTableModalsFrame(
  component: FastboardComponent,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  const editModalId = component.properties?.actions?.find(
    (action: TableActionProperty) => action.type === "edit"
  )?.modalId;
  const addRowModalId = component.properties?.addOns?.addRowForm?.modalId;
  if (editModalId) {
    dashboardMetadata = removeModalFrame(editModalId, dashboardMetadata);
  }

  if (addRowModalId) {
    dashboardMetadata = removeModalFrame(addRowModalId, dashboardMetadata);
  }

  return dashboardMetadata;
}

export function deleteComponent(
  id: ComponentId,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  const component = dashboardMetadata.components[id];
  if (!component) {
    return dashboardMetadata;
  }
  if (component.type === ComponentType.Table) {
    //If the component is a table, then we need to remove the modal frame that is associated with it
    dashboardMetadata = deleteTableModalsFrame(component, dashboardMetadata);
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
  const layout = dashboardMetadata.layouts[layoutIndex];
  const curretnComponentId: ComponentId | null =
    layout[containerIndex as keyof Layout];
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
  const componentId: ComponentId = layout[containerIndex as keyof Layout];
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
  let to = Layout.of(to_type);
  const from = dashboardMetadata.layouts[layoutIndex];

  const keysFrom = Object.keys(from);
  const keysTo = Object.keys(to);

  keysFrom
    .filter((key) => !keysTo.includes(key))
    .forEach((key) => {
      const componentId: ComponentId = from[key as keyof Layout];
      dashboardMetadata = deleteComponent(componentId, dashboardMetadata);
    });

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
      to[key as keyof Layout] = from[key as keyof Layout] || null;
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

export function addHeader(
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  const [newMetadata, componentId] = createComponent(
    ComponentType.Header,
    FastboardHeaderProperties.default(),
    dashboardMetadata
  );
  return {
    ...newMetadata,
    header: { componentId: componentId, isVisible: true },
  };
}

export function switchHeaderState(
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  const headerId = dashboardMetadata.header.componentId;
  if (!headerId) {
    return dashboardMetadata;
  }
  const header = getComponent(headerId, dashboardMetadata);
  if (!header) {
    return dashboardMetadata;
  }
  return {
    ...dashboardMetadata,
    header: {
      componentId: headerId,
      isVisible: !dashboardMetadata.header.isVisible,
    },
  };
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
  addHeader,
  switchHeaderState,
};
