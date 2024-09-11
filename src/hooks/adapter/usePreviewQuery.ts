import { useMutation } from "@tanstack/react-query";
import { adapterService } from "@/lib/services/adapter";
import { MongoQueryMetadata, RestQueryMetadata } from "@/types/connections";

export const usePreviewQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: previewQuery, isPending } = useMutation({
    mutationFn: ({
      connectionId,
      queryMetadata,
      parameters,
    }: {
      connectionId: string;
      queryMetadata: MongoQueryMetadata | RestQueryMetadata;
      parameters: any;
    }) => adapterService.previewQuery(connectionId, queryMetadata, parameters),
    onSuccess,
    onError,
  });

  return {
    previewQuery,
    loading: isPending,
  };
};
