import { useMutation } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboards";
import { Dashboard } from "@/types/dashboards";

export const useUpdateDashboard = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (dashboard: Dashboard) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: updateDashboard, isPending } = useMutation({
    mutationFn: ({
      id,
      name,
      folderId,
    }: {
      id: string;
      name: string;
      folderId: string | null;
    }) => dashboardService.updateDashboard(id, name, folderId),
    onSuccess,
    onError,
  });

  return {
    updateDashboard,
    loading: isPending,
  };
};
