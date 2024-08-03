import { useMutation } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";
import { Query } from "@/types/connections";

export const useCreateQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (query: Query) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: createQuery, isPending } = useMutation({
    mutationFn: ({
      name,
      connectionId,
      metadata,
    }: {
      name: string;
      connectionId: string;
      metadata: any;
    }) => connectionsService.createQuery(name, connectionId, metadata),
    onSuccess,
    onError,
  });

  return {
    createQuery,
    loading: isPending,
  };
};
