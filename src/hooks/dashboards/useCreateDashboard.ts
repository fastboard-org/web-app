import { useMutation } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboards";
import { Dashboard } from "@/types/dashboards";

export const useCreateDashboard = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (dashboard: Dashboard) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: createDashboard, isPending } = useMutation({
    mutationFn: ({
      name,
      folderId,
    }: {
      name: string;
      folderId: string | null;
    }) => dashboardService.createDashboard(name, folderId),
    onSuccess,
    onError,
  });

  return {
    createDashboard,
    loading: isPending,
  };
};
