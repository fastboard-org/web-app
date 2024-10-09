import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboards";
import { Dashboard } from "@/types/dashboards";
import { editorUtils } from "@/lib/editor.utils";
import {
  ComponentId,
  ComponentType,
  FastboardComponent,
  Index,
} from "@/types/editor";
import { useParams } from "next/navigation";
import { LayoutType } from "@/types/editor/layout-types";
import useNavigation from "../useNavigation";
import { useSetRecoilState } from "recoil";
import { lastDashboardMetadata } from "@/atoms/editor";

const useDashboard = (mode: "editor" | "published" = "editor") => {
  const { id: dashboardId } = useParams();
  const { changePage } = useNavigation();
  const setLastDashboard = useSetRecoilState(lastDashboardMetadata);

  const {
    isPending: loading,
    isError,
    data: dashboard,
    error,
  } = useQuery({
    queryKey: ["dashboard", dashboardId],
    queryFn: () => {
      if (mode === "editor") {
        return dashboardService.getDashboard(dashboardId as string);
      } else {
        return dashboardService.getPublishedDashboard(dashboardId as string);
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const queryClient = useQueryClient();

  const getComponent = (id: ComponentId): FastboardComponent | null => {
    if (!dashboard) return null;
    return editorUtils.getComponent(id, dashboard.metadata);
  };

  const updateComponentProperties = (
    id: ComponentId,
    properties: Object,
    save: boolean = true
  ) => {
    updateDashboard(
      (prev) => ({
        ...prev,
        metadata: editorUtils.updateComponent(id, properties, prev.metadata),
      }),
      save
    );
  };

  const addComponentToLayout = (
    index: Index,
    type: ComponentType,
    defaultProperties: Object
  ) => {
    if (!dashboard) return;
    updateDashboard((prev) => ({
      ...prev,
      metadata: editorUtils.addComponentToLayout(
        index,
        type,
        defaultProperties,
        prev.metadata
      ),
    }));
  };

  const deleteComponentFromLayout = (index: Index) => {
    if (!dashboard) return;
    updateDashboard((prev) => ({
      ...prev,
      metadata: editorUtils.deleteComponentFromLayout(index, prev.metadata),
    }));
  };

  const addHeader = () => {
    if (!dashboard) return;
    updateDashboard((prev) => ({
      ...prev,
      metadata: editorUtils.addHeader(prev.metadata),
    }));
  };

  const deleteHeader = () => {
    if (!dashboard) return;
    updateDashboard((prev) => ({
      ...prev,
      metadata: editorUtils.deleteHeader(prev.metadata),
    }));
  };

  const createModalFrame = (body: {
    type: ComponentType;
    properties: Object;
  }): string => {
    if (!dashboard) {
      throw new Error("Dashboard not found");
    }

    const [newMetadata, modalId] = editorUtils.createModalFrame(
      body,
      dashboard.metadata
    );
    if (!modalId) {
      throw new Error("Error creating modal frame");
    }
    updateDashboard((prev) => ({
      ...prev,
      metadata: newMetadata,
    }));
    return modalId;
  };

  const deleteModalFrame = (modalId: string) => {
    if (!dashboard) return;
    updateDashboard((prev) => ({
      ...prev,
      metadata: editorUtils.removeModalFrame(modalId, prev.metadata),
    }));
  };

  const addSidebar = () => {
    if (!dashboard) return;
    updateDashboard((prev) => ({
      ...prev,
      metadata: editorUtils.addSidebar(prev.metadata),
    }));
  };

  const deleteSidebar = () => {
    if (!dashboard) return;
    updateDashboard((prev) => ({
      ...prev,
      metadata: editorUtils.deleteSidebar(prev.metadata),
    }));
    changePage("home");
  };

  const addPage = (returnPage?: string): string | null => {
    if (!dashboard) return null;

    const [newMetadata, pageId] = editorUtils.addPage(
      dashboard.metadata,
      returnPage
    );
    updateDashboard((prev) => ({
      ...prev,
      metadata: newMetadata,
    }));
    return pageId;
  };

  const deletePage = (pageId: string) => {
    if (!dashboard) return;
    updateDashboard((prev) => ({
      ...prev,
      metadata: editorUtils.deletePage(pageId, prev.metadata),
    }));
  };

  const getBaseLayout = (): LayoutType | null => {
    if (!dashboard) return null;
    return dashboard.metadata.pages["home"].layouts[0].type;
  };

  const changeLayout = (
    pageId: string,
    layoutIndex: number,
    layoutType: LayoutType
  ) => {
    if (!dashboard) return;
    updateDashboard((prev) => ({
      ...prev,
      metadata: editorUtils.changeLayout(
        pageId,
        layoutIndex,
        layoutType,
        prev.metadata
      ),
    }));
  };

  const changeDefaultTheme = (theme: "light" | "dark") => {
    if (!dashboard) return;
    updateDashboard((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        defaultTheme: theme,
      },
    }));
  };

  const updateDashboard = (
    updater: (previous: Dashboard) => Dashboard,
    save: boolean = true
  ) => {
    let updatedDashboard: Dashboard | undefined;

    queryClient.setQueryData(
      ["dashboard", dashboardId],
      (prevData: Dashboard | undefined) => {
        if (!prevData) {
          return prevData;
        }
        updatedDashboard = updater(prevData);
        return updatedDashboard;
      }
    );

    if (!updatedDashboard) return;
    if (!save) return;

    setLastDashboard(updatedDashboard);
  };

  return {
    dashboard,
    loading,
    isError,
    error,
    getComponent,
    updateComponentProperties,
    addComponentToLayout,
    deleteComponentFromLayout,
    createModalFrame,
    deleteModalFrame,
    updateDashboard,
    addSidebar,
    deleteSidebar,
    addPage,
    deletePage,
    getBaseLayout,
    changeLayout,
    addHeader,
    deleteHeader,
    changeDefaultTheme,
  };
};

export default useDashboard;
