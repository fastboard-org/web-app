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
import { useRecoilState } from "recoil";
import { currentPageState } from "@/atoms/editor";
import { LayoutType } from "@/types/editor/layout-types";

const useDashboard = () => {
  const { id: dashboardId } = useParams();
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const {
    isPending: loading,
    isError,
    data: dashboard,
    error,
  } = useQuery({
    queryKey: ["dashboard", dashboardId],
    queryFn: () => dashboardService.getDashboard(dashboardId as string),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const queryClient = useQueryClient();

  const getComponent = (id: ComponentId): FastboardComponent | null => {
    if (!dashboard) return null;
    return editorUtils.getComponent(id, dashboard.metadata);
  };

  const updateComponentProperties = (id: ComponentId, properties: Object) => {
    updateDashboard((prev) => ({
      ...prev,
      metadata: editorUtils.updateComponent(id, properties, prev.metadata),
    }));
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

  const createModalFrame = (body: {
    type: ComponentType;
    properties: Object;
  }): string | null => {
    if (!dashboard) return null;

    const [newMetadata, modalId] = editorUtils.createModalFrame(
      body,
      dashboard.metadata
    );
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
    setCurrentPage("home");
  };

  const addPage = (): string | null => {
    if (!dashboard) return null;

    const [newMetadata, pageId] = editorUtils.addPage(dashboard.metadata);
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
    setCurrentPage("home");
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

  const updateDashboard = (updater: (previous: Dashboard) => Dashboard) => {
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

    dashboardService.updateDashboard(
      updatedDashboard.id,
      updatedDashboard.name,
      updatedDashboard.folder_id,
      updatedDashboard.metadata
    );
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
    changeLayout,
  };
};

export default useDashboard;
