import {
  HTTP_METHOD,
  MONGO_METHOD,
  Query,
  QueryData,
} from "@/types/connections";
import { InvalidateQueryFilters, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { adapterService } from "@/lib/services/adapter";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { previewAccessTokenState } from "@/atoms/editor";

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
    }: {
      queryData: QueryData | null;
      parameters: Record<string, any>;
      invalidateQueries?: InvalidateQueryFilters;
    }) => {
      setInvalidateQueries(invalidateQueries);
      return adapterService.executeQuery(
        queryData?.queryId || null,
        dashboardId,
        parameters,
        previewAccessToken,
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
