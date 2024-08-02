import { useMutation } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboards";

export const useDeleteDashboard = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: deleteDashboard, isPending } = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      dashboardService.deleteDashboard(id),
    onSuccess,
    onError,
  });

  return {
    deleteDashboard,
    loading: isPending,
  };
};
