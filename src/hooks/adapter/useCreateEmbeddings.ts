import { useMutation } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";
import { Query } from "@/types/connections";
import { adapterService } from "@/lib/services/adapter";

export const useCreateEmbeddings = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (query: Query) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: createEmbeddings, isPending } = useMutation({
    mutationFn: ({
      queryId,
      index_field,
    }: {
      queryId: string;
      index_field: string;
    }) => adapterService.createEmbeddings(queryId, index_field),
    onSuccess,
    onError,
  });

  return {
    createEmbeddings,
    loading: isPending,
  };
};
