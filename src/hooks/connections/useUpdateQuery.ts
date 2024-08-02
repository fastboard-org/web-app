import { useMutation } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";
import { Query } from "@/types/connections";

export const useUpdateQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (query: Query) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: updateQuery, isPending } = useMutation({
    mutationFn: ({
      id,
      name,
      metadata,
    }: {
      id: string;
      name: string;
      metadata: any;
    }) => connectionsService.updateQuery(id, name, metadata),
    onSuccess,
    onError,
  });

  return {
    updateQuery,
    loading: isPending,
  };
};
