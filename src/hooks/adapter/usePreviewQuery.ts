import { useMutation } from "@tanstack/react-query";
import { adapterService } from "@/lib/services/adapter";
import { HTTP_METHOD } from "@/types/connections";

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
      method,
      path,
      headers,
      body,
      parameters,
    }: {
      connectionId: string;
      method: HTTP_METHOD;
      path: string;
      headers: any;
      body: any;
      parameters: any;
    }) =>
      adapterService.previewQuery(
        connectionId,
        method,
        path,
        headers,
        body,
        parameters,
      ),
    onSuccess,
    onError,
  });

  return {
    previewQuery,
    loading: isPending,
  };
};
