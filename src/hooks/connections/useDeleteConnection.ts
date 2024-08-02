import { useMutation } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";

export const useDeleteConnection = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: deleteConnection, isPending } = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      connectionsService.deleteConnection(id),
    onSuccess,
    onError,
  });

  return {
    deleteConnection,
    loading: isPending,
  };
};
