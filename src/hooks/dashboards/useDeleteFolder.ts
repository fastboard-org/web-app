import { useMutation } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboards";
import { Folder } from "@/types/dashboards";

export const useDeleteFolder = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: deleteFolder, isPending } = useMutation({
    mutationFn: ({ id }: { id: string }) => dashboardService.deleteFolder(id),
    onSuccess,
    onError,
  });

  return {
    deleteFolder,
    loading: isPending,
  };
};
