import { useMutation } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboards";
import { Folder } from "@/types/dashboards";

export const useUpdateFolder = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (folder: Folder) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: updateFolder, isPending } = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      dashboardService.updateFolder(id, name),
    onSuccess,
    onError,
  });

  return {
    updateFolder,
    loading: isPending,
  };
};
