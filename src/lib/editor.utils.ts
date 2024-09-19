import {
  ComponentId,
  ComponentType,
  DashboardMetadata,
  FastboardComponent,
  ModalFrame,
  Index,
} from "@/types/editor";
import { Layout, LayoutType } from "@/types/editor/layout-types";
import { SidebarProperties } from "@/types/editor/sidebar-types";
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
  const viewModalId = component.properties?.actions?.find(
    (action: TableActionProperty) => action.type === "view"
  )?.modalId;
  const editModalId = component.properties?.actions?.find(
    (action: TableActionProperty) => action.type === "edit"
  )?.modalId;
  const addRowModalId = component.properties?.addOns?.addRowForm?.modalId;
  if (viewModalId) {
    dashboardMetadata = removeModalFrame(viewModalId, dashboardMetadata);
  }
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
  const { [id]: removedComponent, ...newComponents } =
    dashboardMetadata.components;
  return {
    ...dashboardMetadata,
    components: newComponents,
  };
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
  index: Index,
  type: ComponentType,
  defaultProperties: Object,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  const {
    page: pageIndex,
    layout: layoutIndex,
    container: containerIndex,
  } = index;
  // If there is already a component in the container, delete it
  const layout = dashboardMetadata.pages[pageIndex][layoutIndex];
  const curretnComponentId: ComponentId | null =
    layout[containerIndex as keyof Layout];
  if (curretnComponentId) {
    dashboardMetadata = deleteComponentFromLayout(index, dashboardMetadata);
  }

  const [newMetadata, componentId] = createComponent(
    type,
    defaultProperties,
    dashboardMetadata
  );
  return {
    ...newMetadata,
    pages: {
      ...newMetadata.pages,
      [pageIndex]: newMetadata.pages[pageIndex].map((layout, index) => {
        if (index === layoutIndex) {
          return {
            ...layout,
            [containerIndex]: componentId,
          };
        }
        return layout;
      }),
    },
  };
}

export function deleteComponentFromLayout(
  index: Index,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  const { page, layout: layoutIndex, container } = index;
  const layout = dashboardMetadata.pages[page][layoutIndex];
  const componentId: ComponentId = layout[container as keyof Layout];
  if (!componentId) {
    return dashboardMetadata;
  }

  const newMetadata = deleteComponent(componentId, dashboardMetadata);
  return {
    ...newMetadata,
    pages: {
      ...newMetadata.pages,
      [page]: newMetadata.pages[page].map((layout, index) => {
        if (index === layoutIndex) {
          return {
            ...layout,
            [container]: null,
          };
        }
        return layout;
      }),
    },
  };
}

function changeLayout(
  pageIndex: string,
  layoutIndex: number,
  to_type: LayoutType,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  let to = Layout.of(to_type);
  const from = dashboardMetadata.pages[pageIndex][layoutIndex];

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
    pages: {
      ...dashboardMetadata.pages,
      [pageIndex]: dashboardMetadata.pages[pageIndex].map((layout, index) => {
        if (index === layoutIndex) {
          return convertLayout(from, to_type);
        }
        return layout;
      }),
    },
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

export function deleteHeader(
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  const headerId = dashboardMetadata.header.componentId;
  if (!headerId) {
    return dashboardMetadata;
  }
  return {
    ...deleteComponent(headerId, dashboardMetadata),
    header: { componentId: null, isVisible: false },
  };
}

function addSidebar(dashboardMetadata: DashboardMetadata): DashboardMetadata {
  const [newMetadata, sidebarId] = createComponent(
    ComponentType.Sidebar,
    SidebarProperties.default(),
    dashboardMetadata
  );
  return {
    ...newMetadata,
    sidebar: {
      id: sidebarId,
      visible: true,
    },
  };
}

function deleteSidebar(
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  if (!dashboardMetadata.sidebar) {
    return dashboardMetadata;
  }

  //Remove all pages and components in the sidebar except the home page
  const pages = Object.keys(dashboardMetadata.pages).filter(
    (page) => page !== "home"
  );
  pages.forEach((page) => {
    dashboardMetadata = deletePage(page, dashboardMetadata);
  });

  const newMetadata = deleteComponent(
    dashboardMetadata.sidebar.id,
    dashboardMetadata
  );
  return {
    ...newMetadata,
    sidebar: null,
  };
}

function addPage(
  dashboardMetadata: DashboardMetadata
): [DashboardMetadata, string] {
  const pageId = uuidv4();
  return [
    {
      ...dashboardMetadata,
      pages: {
        ...dashboardMetadata.pages,
        [pageId]: [Layout.of(LayoutType.Full)],
      },
    },
    pageId,
  ];
}

function deletePage(
  pageId: string,
  dashboardMetadata: DashboardMetadata
): DashboardMetadata {
  //Remove all components in the page
  const layouts = dashboardMetadata.pages[pageId];
  layouts.forEach((layout) => {
    Object.keys(layout).forEach((key) => {
      if (key === "type") {
        return;
      }
      const componentId: ComponentId = layout[key as keyof Layout];
      if (componentId) {
        dashboardMetadata = deleteComponent(componentId, dashboardMetadata);
      }
    });
  });

  //Remove the page
  const { [pageId]: removedPage, ...newPages } = dashboardMetadata.pages;
  return {
    ...dashboardMetadata,
    pages: newPages,
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
  deleteHeader,
  addSidebar,
  deleteSidebar,
  addPage,
  deletePage,
};
