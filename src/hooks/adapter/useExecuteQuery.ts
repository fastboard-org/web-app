import { HTTP_METHOD, Query, RestQueryData } from "@/types/connections";
import { InvalidateQueryFilters, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { adapterService } from "@/lib/services/adapter";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { previewAccessTokenState } from "@/atoms/editor";
import { AxiosRequestConfig } from "axios";

const useExecuteQuery = ({
  onSuccess,
  onError,
  dashboardId,
}: {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  dashboardId: string;
}) => {
  const previewAccessToken = useRecoilValue(previewAccessTokenState);
  const [invalidateQueries, setInvalidateQueries] =
    useState<InvalidateQueryFilters>();
  const {
    mutate: execute,
    reset,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: ({
      queryData,
      parameters,
      invalidateQueries,
      config,
    }: {
      queryData: RestQueryData | null;
      parameters: Record<string, any>;
      invalidateQueries?: InvalidateQueryFilters;
      config?: AxiosRequestConfig;
    }) => {
      setInvalidateQueries(invalidateQueries);
      return adapterService.executeQuery(
        queryData?.queryId || null,
        dashboardId,
        parameters,
        previewAccessToken,
        config
      );
    },
    onSuccess: (data, variables) => {
      refreshData(variables.queryData);
      if (onSuccess) {
        onSuccess(data);
      }
      if (!invalidateQueries) return;
      queryClient.invalidateQueries(invalidateQueries);
    },
    onError,
  });

  const refreshData = (queryData: RestQueryData | null) => {
    if (!queryData) return;
    const updateMethods = [
      HTTP_METHOD.POST,
      HTTP_METHOD.PUT,
      HTTP_METHOD.PATCH,
      HTTP_METHOD.DELETE,
    ];
    if (queryData && updateMethods.includes(queryData.method)) {
      //Invalidate all querys that gets data from this connection
      queryClient.invalidateQueries({
        queryKey: ["get_data", queryData.connectionId],
      });
    }
  };

  return {
    execute,
    reset,
    data,
    isSuccess,
    isPending,
    isError,
    error,
  };
};

export default useExecuteQuery;
