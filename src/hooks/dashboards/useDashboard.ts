import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboards";
import { Dashboard } from "@/types/dashboards";
import { editorUtils } from "@/lib/editor.utils";
import { ComponentId, ComponentType, FastboardComponent } from "@/types/editor";
import { useParams } from "next/navigation";

const useDashboard = () => {
  const { id: dashboardId } = useParams();

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
    layoutIndex: number,
    containerIndex: string,
    type: ComponentType,
    defaultProperties: Object
  ) => {
    if (!dashboard) return;
    updateDashboard((prev) => ({
      ...prev,
      metadata: editorUtils.addComponentToLayout(
        layoutIndex,
        containerIndex,
        type,
        defaultProperties,
        prev.metadata
      ),
    }));
  };

  const deleteComponentFromLayout = (
    layoutIndex: number,
    containerIndex: string
  ) => {
    if (!dashboard) return;
    updateDashboard((prev) => ({
      ...prev,
      metadata: editorUtils.deleteComponentFromLayout(
        layoutIndex,
        containerIndex,
        prev.metadata
      ),
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
  };
};

export default useDashboard;
