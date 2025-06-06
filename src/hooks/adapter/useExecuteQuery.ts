import { HTTP_METHOD, MONGO_METHOD, QueryData } from "@/types/connections";
import { InvalidateQueryFilters, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { adapterService } from "@/lib/services/adapter";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  previewAccessTokenState,
  previewRefreshTokenState,
} from "@/atoms/editor";
import { AxiosRequestConfig } from "axios";
import { DashboardAuth } from "@/types/editor";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { isPublishPage } from "@/lib/helpers";

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
  const previewRefreshToken = useRecoilValue(previewRefreshTokenState);

  const { dashboard } = useDashboard(isPublishPage() ? "published" : "editor");

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
      queryData: QueryData | null;
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
        config,
        previewRefreshToken,
        dashboard?.metadata?.auth as DashboardAuth | null,
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

  const refreshData = (queryData: QueryData | null) => {
    if (!queryData) return;
    const getMethods = [
      HTTP_METHOD.GET,
      MONGO_METHOD.FIND,
      MONGO_METHOD.FIND_ONE,
      MONGO_METHOD.AGGREGATE,
      MONGO_METHOD.COUNT,
    ];
    if (queryData && !getMethods.includes(queryData.method)) {
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
