import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboards";
import { Dashboard } from "@/types/dashboards";

const useDashboard = (id: string) => {
  const {
    isPending: loading,
    isError,
    data: dashboard,
    error,
  } = useQuery({
    queryKey: ["dashboards", id],
    queryFn: () => dashboardService.getDashboard(id),
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const updateDashboard = (updater: (previous: Dashboard) => Dashboard) => {
    let updatedDashboard: Dashboard | undefined;

    queryClient.setQueryData(
      ["dashboards", id],
      (prevData: Dashboard | undefined) => {
        if (!prevData) {
          return prevData;
        }
        updatedDashboard = updater(prevData);
        return {
          ...prevData,
          ...updatedDashboard,
        };
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
    updateDashboard,
  };
};

export default useDashboard;
