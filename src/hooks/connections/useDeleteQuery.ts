import { useMutation } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";

export const useDeleteQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: deleteQuery, isPending } = useMutation({
    mutationFn: ({ id }: { id: string }) => connectionsService.deleteQuery(id),
    onSuccess,
    onError,
  });

  return {
    deleteQuery,
    loading: isPending,
  };
};
