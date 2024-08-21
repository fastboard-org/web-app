import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboards";
import { Dashboard } from "@/types/dashboards";
import { editorUtils } from "@/lib/editor.utils";
import { ComponentId, ComponentType, FastboardComponent } from "@/types/editor";
import { useParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { lastDashboardMetadata } from "@/atoms/editor";

const useDashboard = () => {
  const { id: dashboardId } = useParams();
  const setLastDashboard = useSetRecoilState(lastDashboardMetadata);

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
  };
};

export default useDashboard;
