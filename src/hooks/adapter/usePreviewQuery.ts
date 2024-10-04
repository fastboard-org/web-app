import { useMutation } from "@tanstack/react-query";
import { adapterService } from "@/lib/services/adapter";
import { MongoQueryMetadata, RestQueryMetadata } from "@/types/connections";
import { AxiosRequestConfig } from "axios";

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
      config,
    }: {
      connectionId: string;
      queryMetadata: MongoQueryMetadata | RestQueryMetadata;
      parameters: any;
      config?: AxiosRequestConfig;
    }) =>
      adapterService.previewQuery(
        connectionId,
        queryMetadata,
        parameters,
        config
      ),
    onSuccess,
    onError,
  });

  return {
    previewQuery,
    loading: isPending,
  };
};
