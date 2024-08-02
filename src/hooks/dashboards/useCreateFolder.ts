import { useMutation } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboards";
import { Folder } from "@/types/dashboards";

export const useCreateFolder = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (folder: Folder) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: createFolder, isPending } = useMutation({
    mutationFn: ({ name }: { name: string }) =>
      dashboardService.createFolder(name),
    onSuccess,
    onError,
  });

  return {
    createFolder,
    loading: isPending,
  };
};
